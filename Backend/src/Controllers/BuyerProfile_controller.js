const { FieldValue } = require("firebase-admin/firestore");
const { Buyers } = require("../firebase.js");
const { auth } = require("../firebase.js");

const authenicateBuyer = async (idToken) => {
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
    const buyer = await Buyers.where("userName", "==", userName).get();
    if (buyer.empty) {
        return true;
    }
    else {
        return false;
    }
};

const getBuyerProfile = async (idToken) => {
    let response = {};
    try {
        const uid = await authenicateBuyer(idToken);
        if (uid === null) {
            throw new Error("Authenticaton failed");
        }

        const buyer = await Buyers.doc(uid).get();
        if (buyer.exists) {
            response.statusCode = 200;
            response.body = JSON.stringify(buyer.data());
        }
        else {
            response.statusCode = 404;
            response.body = "Buyer profile not found, uid: " + uid + "\n";
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

const setBuyerProfile = async (idToken, userName, phoneNumber) => {

    let response = {};

    try {
        const uid = await authenicateBuyer(idToken);
        if (uid === null) {
            throw new Error("Authenticaton failed");
        }

        if (userName !== undefined) {
            if (userName === "") {
                throw new Error("Username is undefined");
            }

            const isUnique = await isUserNameUnique(userName);  // Username is unique?
            const buyer = await Buyers.doc(uid).get();
            const isNewBuyer = !buyer.exists;  // Is this a new buyer?
            if ((!isUnique) && (isNewBuyer)) {
                throw new Error("Username already exists");
            }
        }
        else {
            throw new Error("Username is undefined");
        }

        const buyer = await Buyers.doc(uid).set({
            userName: userName,
            phoneNumber: phoneNumber
        });
        response.statusCode = 200;
        response.body = "Buyer profile updated";
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

const deleteBuyerProfile = async (idToken) => {
    let response = {};
    try {
        const uid = await authenicateBuyer(idToken);
        if (uid === null) {
            throw new Error("Authenticaton failed");
        }

        const buyer = await Buyers.doc(uid).delete();
        response.statusCode = 200;
        response.body = "Buyer profile deleted";
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

module.exports = {
    isUserNameUnique,
    getBuyerProfile,
    setBuyerProfile,
    deleteBuyerProfile
}