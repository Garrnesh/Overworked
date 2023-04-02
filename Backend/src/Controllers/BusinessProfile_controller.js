const { FieldValue } = require("firebase-admin/firestore");
const { Business } = require("../firebase.js");
const { auth } = require("../firebase.js");
const ShopC = require("./Shop_controller.js");
const LocC = require("./Location_controller.js");
const UenC = require("./UEN_controller.js");

const authenicateBusiness = async (idToken) => {
    try {
        const decodedToken = await auth.verifyIdToken(idToken);
        const uid = decodedToken.uid;
        return uid;
    }
    catch (error) {
        //throw new Error(error.message + "\nReceived token: " + idToken + "\n");
        return null;
    }
};

const isUserNameUnique = async (userName) => {
    const business = await Business.where("userName", "==", userName).get();
    if (business.empty) {
        return true;
    }
    else {
        return false;
    }
};

const getBusinessProfile = async (idToken) => {
    let response = {};
    try {
        const uid = await authenicateBusiness(idToken);
        if (uid === null) {
            throw new Error("Authenticaton failed");
        }

        const business = await Business.doc(uid).get();
        if (business.exists) {
            response.statusCode = 200;
            response.body = JSON.stringify(business.data());
        }
        else {
            response.statusCode = 404;
            response.body = "Business profile not found, uid: " + uid + "\n";
        }
    }
    catch (err) {
        if (err.message === "Authenticaton failed") {
            response.statusCode = 401;
        }
        response.statusCode = 500;

        response.body = err.message;
    }
    return response;
};

const setBusinessProfile = async (idToken, userName, phoneNumber) => {

    let response = {};

    try {
        const uid = await authenicateBusiness(idToken);
        if (uid === null) {
            throw new Error("Authenticaton failed");
        }

        if (userName !== undefined) {
            if (userName === "") {
                throw new Error("Username is undefined");
            }

            const isUnique = await isUserNameUnique(userName);  // Username is unique?
            const business = await Business.doc(uid).get();
            const isNewBusiness = !business.exists;  // Is this a new business?
            if ((!isUnique) && (isNewBusiness)) {
                throw new Error("Username already exists");
            }
        }
        else {
            throw new Error("Username is undefined");
        }

        const business = await Business.doc(uid).set({
            userName: userName,
            phoneNumber: phoneNumber
        });
        response.statusCode = 200;
        response.body = "Business profile updated";
    }

    catch (err) {
        switch (err.message) {
            case "Authenticaton failed":
                response.statusCode = 401;
                break;
            case "Username already exists":
                response.statusCode = 409;
                break;
            case "Username is undefined":
                response.statusCode = 400;
                break;
            default:
                response.statusCode = 500;
        }

        response.body = err.message;
    }
    
    return response;
};

const deleteBusinessProfile = async (idToken) => {
    let response = {};
    try {
        const uid = await authenicateBusiness(idToken);
        if (uid === null) {
            throw new Error("Authenticaton failed");
        }

        const business = await Business.doc(uid).delete();
        response.statusCode = 200;
        response.body = "Business profile deleted";
    }
    catch (err) {
        if (err.message == "Authenticaton failed") {
            response.statusCode = 401;
        }
        response.statusCode = 500;
        response.body = err.message;
    }
    return response;
}

const createNewBusiness = async (idToken, userName, phoneNumber, uen, donation, shopDesc, shopAddr, postalCode, shopName) => {
    let response = {};
    try {
        // Check UEN number is valid
        const isUenValid = await UenC.checkUen(uen);
        if (!isUenValid) {
            throw new Error("UEN number is invalid");
        }

        const res_busprof = await setBusinessProfile(idToken, userName, phoneNumber);
        if (res_busprof.statusCode !== 200) {
            throw new Error(res_busprof.body);
        }
        else {
            await ShopC.checkShopID(userName)
            await LocC.checkLocation(userName);
            await ShopC.addShop(userName, shopName, uen, shopDesc, shopAddr, donation);
            await LocC.addLocation( userName, postalCode);
        }
        response.statusCode = 200;
    }
    catch (err) {
        switch (err.message) {
            case "UEN number is invalid":
                response.statusCode = 400;
                break;
            case "Authenticaton failed":
                response.statusCode = 401;
                break;
            case "Username already exists":
                response.statusCode = 409;
                break;
            case "Username is undefined":
                response.statusCode = 400;
                break;
            case "Shop with shop id already exists":
                response.statusCode = 409;
                break;
            case "Unable to create new shop method":
                response.statusCode = 500;
                break;
            case "Order with order id already exists":
                response.statusCode = 409;
                break;
            case "Unable to add location":
                response.statusCode = 500;
                break;
            default:
                response.statusCode = 500;
        }
        
        // Remove user from authentication
        await (auth.deleteUser(await authenicateBusiness(idToken))
            .catch((err) => {
                // Do nothing
            }));
        try {
            await (LocC.removeLocation(userName).catch((err) => {}));
        } catch (err) {}
        try {
            await (ShopC.removeShop(userName).catch((err) => {}));
        } catch (err) {}
        await deleteBusinessProfile(idToken);
        response.body = err.message;
    }
    return response;
}

module.exports = {
    isUserNameUnique,
    getBusinessProfile,
    setBusinessProfile,
    deleteBusinessProfile,
    createNewBusiness
}