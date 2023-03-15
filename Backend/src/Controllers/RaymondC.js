import { FieldValue } from "firebase-admin/firestore";
import { Buyers, Business, Payments, Shops, Products, Listings, Orders, Orderitems } from "../firebase.js";

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
        return payment.data();
    }
    else{
        throw new Error("Payment method does not exists ")
    }
    
};

//function to get all the payments for a single buyer
// necessary? or should we just use the buyer to call the payment ids under it?


// prev
const addPayment = async (payment_id, buyer_id, card_number, name_on_card, exp_date, cvc) => {
    const payment = Payments.doc(payment_id);
    try{
        await payment.set(payment_id, buyer_id, card_number, name_on_card, exp_date, cvc));
    }catch(err){
        throw new Error("Unable to set new payment method");
    }
    // new
    const addpayment = (req,res) => {
        const {payment_id, buyer_id, card_number, name_on_card, exp_date, cvc} = req.body;
        DB.query(queries.checkifPaymentExists, [payment_id, buyer_id, card_number, name_on_card, exp_date, cvc], (err, result) =>{
            if (result.rows && result.rows.length){ //rows && rows.length = true? means the length of every variable compare ah?
                return res.status(409).send('Payment method already exists'); 
            }
            DB.query(queries.addPayment, [payment_id, buyer_id, card_number, name_on_card, exp_date, cvc], (req,res) => {
                if(err){
                    return res.status(500).send(err.message);
                }
                res.status(201).send('Payment has been added to database');
            });
        });
    };
}



};

const removePayment = async (payment_id) => {
    try{
        await Payments.doc(payment_id).delete();
    }catch(err){
        throw new Error("Unable to delete payment method");
    }
};

//Shop Table
//shop_id, business_id, shop_name, UEN_number, Shop_description, Shop_address, Donation

const getShops = async (req,res) => { 
    try{
        const shops = await Shops.get();
        res.status(200).json(shop.data());
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getShopByID = async (shop_id) => { 
    const shop = await Shops.doc(shop_id).get();
    if(shop.exists){
        return shop.data();
    }
    else{
        throw new Error("This shop does not exist! ")
    }
    
};

const getShopByName = async (shop_name) => { 
    const shop = await Shops.doc(shop_id).get();
    if(shop.exists){
        return shop.data();
    }
    else{
        throw new Error("This shop does not exist! ")
    }
    
};

const getShopByUEN = async (UEN_number) => { 
    const shop = await Shops.doc(shop_id).get();
    if(shop.exists){
        return shop.data();
    }
    else{
        throw new Error("This shop does not exist! ")
    }
    
};


const addShop = async (shop_id, business_id, shop_name, UEN_number, Shop_description, Shop_address, Donation) => {
    //prev
    const shop = Shops.doc(shop_id);
    try{
        await shop.set(shop_id, business_id, shop_name, UEN_number, Shop_description, Shop_address, Donation));
    }catch(err){
        throw new Error("Unable to create new shop method");
    }
    // new, tbc
    /*
    const addpayment = (req,res) => {
        const {payment_id, buyer_id, card_number, name_on_card, exp_date, cvc} = req.body;
        DB.query(queries.checkifPaymentExists, [payment_id, buyer_id, card_number, name_on_card, exp_date, cvc], (err, result) =>{
            if (result.rows && result.rows.length){ //rows && rows.length = true? means the length of every variable compare ah?
                return res.status(409).send('Payment method already exists'); 
            }
            DB.query(queries.addPayment, [payment_id, buyer_id, card_number, name_on_card, exp_date, cvc], (req,res) => {
                if(err){
                    return res.status(500).send(err.message);
                }
                res.status(201).send('Payment has been added to database');
            });
        });
    };
}
*/

};

const removeShop = async (shop_id) => {
    try{
        await Shops.doc(shop_id).delete();
    }catch(err){
        throw new Error("Unable to delete shop");
    }
};