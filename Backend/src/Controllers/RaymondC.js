const { FieldValue } = require("firebase-admin/firestore");
const { Buyers, Business, Payments, Shops, Products, Listings, Orders, Orderitems } = require("../firebase.js");
 
//payment and shop tables?
//payment_id, buyer_id, card_number, name_on_card, exp_date, cvc

//Payment Table
const getPayments = async (req,res) => { 
    try{
        const payment = await Payments.get();
        res.status(200).json(payment.data());
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getPaymentByID = async (payment_id) => { 
    const payment = await Payments.doc(payment_id).get();
    if(payment.exists){
        return payment;
    }
    else{
        throw new Error("Payment method does not exists ")
    }
    
};

const checkPaymentID = async (payment_id) => {
    try{
        const payment = await Payments.doc(payment_id).get();
        if(payment.exists){
            throw new Error("Payment with payment id already exists");
        }
    }
    catch(err){
        throw new Error("Payment with payment id already exists")
    }
};

//function to get all the payments for a single buyer?


const addPayment = async (payment_id, buyer_id, card_number, name_on_card, exp_date, cvc) => {
    const payment = Payments.doc(payment_id);
    try{
        await payment.set({
            buyer_id: buyer_id,
            card_number: card_number,
            name_on_card: name_on_card,
            exp_date: exp_date,
            cvc: cvc});
    }catch(err){
        throw new Error("Unable to add new payment method");
    }
};

const removePayment = async (payment_id) => {
    try{
        await Payments.doc(payment_id).delete();
    }catch(err){
        throw new Error("Unable to delete payment method");
    }
};

//function to get all the payments for a single buyer?
const getPaymentsByBuyerId = async(buyer_id) => {
    const payment = await Payments.where('buyer_id', '==', buyer_id).get();
    if(payment.size >0){
        return payment
    }
    else{
        throw new Error("Buyer does not have any payment methods")
    }
}

//Shop Table
//shop_id, business_id, shop_name, UEN_number, Shop_description, Shop_address, Donation


//returns all shops with no filter
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
getPayments,
getPaymentByID,
checkPaymentID,
addPayment,
removePayment,
getPaymentsByBuyerId,
getShops,
getShopByID,
getShopByName,
getShopByUEN,
addShop,
removeShop
}