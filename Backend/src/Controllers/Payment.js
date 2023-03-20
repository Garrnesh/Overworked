const { FieldValue } = require("firebase-admin/firestore");
const { Payments } = require("../firebase.js");

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
};

module.exports = {
    getPayments,
    getPaymentByID,
    checkPaymentID,
    addPayment,
    removePayment,
    getPaymentsByBuyerId,
}

