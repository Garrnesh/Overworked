const { FieldValue } = require("firebase-admin/firestore");
const { Shops } = require("../firebase.js");

const getShops = async (req,res) => { 
    try{
        const shop_coll = await Shops.get();
        const shop = shop_coll.docs.map((doc) => doc.data()); //Come back and edit this
        res.status(200).json(shop);
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getShopByBusinessUsername = async (busines_username) => { 
    const shop = await Shops.doc(busines_username).get();
    if(shop.exists){
        return shop;
    }
    else{
        throw new Error("This shop does not exist!")
    }
};

const checkShopID = async (busines_username) => {
    try{
        const shop = await Shops.doc(busines_username).get();
        if(shop.exists){
            throw new Error("Shop with shop id already exists");
        }
    }
    catch(err){
        throw new Error("Shop with shop id already exists")
    }
};

const addShop = async (business_username, shop_name, UEN_number, shop_description, Shop_address, donation) => {
    const shop = Shops.doc(business_username);
    try{
        await shop.set({
            shop_name: shop_name,
            UEN_number: UEN_number,
            shop_description: shop_description,
            Shop_address: Shop_address,
            donation: donation});
    }catch(err){
        throw new Error("Unable to create new shop method");
    } 
};

const removeShop = async (busines_username) => {
    try{
        await Shops.doc(busines_username).delete();
    }catch(err){
        throw new Error("Unable to delete shop");
    }
};

const getShopByName = async (shop_name) => { 
    const shop_coll = await Shops.where('shop_name', '==', shop_name).get();
    const shop = shop_coll.map((doc) => doc.sata());
    if(shop.length>0){
        return shop;
    }
    else{
        throw new Error("This shop does not exist! ")
    }
};

const getShopByUEN = async (UEN_number) => { 
    const shop = await Shops.where('UEN_number', '==', UEN_number).get();
    if(shop.length>0){
        return shop;
    }
    else{
        throw new Error("This shop does not exist! ")
    }
    
};

module.exports = {
    getShops,
    getShopByBusinessUsername,
    getShopByName,
    getShopByUEN,
    checkShopID,
    addShop,
    removeShop,
}