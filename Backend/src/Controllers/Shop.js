const { FieldValue } = require("firebase-admin/firestore");
const { Shops } = require("../firebase.js");

const getShops = async (req,res) => { 
    try{
        const shops = await Shops.get();
        res.status(200).json(shops.data());
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getShopByID = async (shop_id) => { 
    const shop = await Shops.doc(shop_id).get();
    if(shop.exists){
        return shop;
    }
    else{
        throw new Error("This shop does not exist!")
    }
};

const getShopByName = async (shop_name) => { 
    const shop = await Shops.doc(shop_name).get();
    if(shop.exists){
        return shop;
    }
    else{
        throw new Error("This shop does not exist! ")
    }
    
};

const getShopByUEN = async (UEN_number) => { 
    const shop = await Shops.doc(UEN_number).get();
    if(shop.exists){
        return shop;
    }
    else{
        throw new Error("This shop does not exist! ")
    }
    
};

const checkShopID = async (shop_id) => {
    try{
        const payment = await Shops.doc(shop_id).get();
        if(shop.exists){
            throw new Error("Shop with shop id already exists");
        }
    }
    catch(err){
        throw new Error("Shop with shop id already exists")
    }
};



const addShop = async (shop_id, business_id, shop_name, UEN_number, Shop_description, Shop_address, Donation) => {
    const shop = Shops.doc(shop_id);
    try{
        await shop.set({
            business_id: business_id,
            shop_name: shop_name,
            UEN_number: UEN_number,
            Shop_description: Shop_description,
            Shop_address: Shop_address,
            Donation: Donation});
    }catch(err){
        throw new Error("Unable to create new shop method");
    } 
};

const removeShop = async (shop_id) => {
    try{
        await Shops.doc(shop_id).delete();
    }catch(err){
        throw new Error("Unable to delete shop");
    }
};

module.exports = {
    getShops,
    getShopByID,
    getShopByName,
    getShopByUEN,
    checkShopID,
    addShop,
    removeShop,
}