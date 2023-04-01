const { FieldValue } = require("firebase-admin/firestore");
const { Address } = require("../firebase.js");

const getAddress = async (req,res) => { 
    try{
        const address_coll = await Address.get();
        const address = address_coll.docs.map((doc) => doc.data());
        res.status(200).json(address);
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getAddressByID = async (address_id) => { 
    const address = await Address.doc(address_id).get();
    if(address.exists){
        return address;
    }
    else{
        throw new Error("Address does not exists")
    }
    
};

const checkAddressID = async (address_id) => {
    try{
        const address = await Address.doc(address_id).get();
        if(address.exists){
            throw new Error("Address with address id already exists");
        }
    }
    catch(err){
        throw new Error("Address with address id already exists")
    }
};

const addAddress = async (address_id, buyer_username, address_str, postal_code) => {
    const address = Address.doc(address_id);
    try{
        await address.set({
            buyer_username: buyer_username,
            address_str: address_str,
            postal_code: postal_code,
            });
    }catch(err){
        throw new Error("Unable to add new address");
    }
};

const removeAddress = async (address_id) => {
    try{
        await Address.doc(address_id).delete();
    }catch(err){
        throw new Error("Unable to delete address");
    }
};

const getAddressByBuyerUsername = async(buyer_username) => {
    const address_coll = await Address.where('buyer_username', '==', buyer_username).get();
    const address = address_coll.docs.map((doc) => doc.data());
    if(address.length >0){
        return address;
    }
    else{
        throw new Error("Buyer does not have any addresses")
    }
};

module.exports = {
    getAddress,
    getAddressByID,
    checkAddressID,
    addAddress,
    removeAddress,
    getAddressByBuyerUsername,
}

