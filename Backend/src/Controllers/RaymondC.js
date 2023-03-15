import { FieldValue } from "firebase-admin/firestore";
import { Buyers, Business, Payments, Shops, Products, Listings, Orders, Orderitems } from "../firebase.js";

//Yoo okok do u think u can do the payment and shop tables?


//Payment Table
const getpayments = async (req,res) => { //proc
    try{
        const payment = await Payments.get();
        res.status(200).json(payment.data());
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getPaymentByID = async (prodcut_id) => { //difference is that will payment be searched by the payment id?
    const payment = await Payments.doc(payment_id).get();
    if(payment.exists){
        return payment.data();
    }
    else{
        throw new Error("Payment method does not exists ")
    }
    
}

const addPayment = async (payment_id, buyer_id, card_number, name_on_card, exp_date, cvc) => {
    const payment = Payments.doc(payment_id);
    try{
        await payment.set(payment_id, buyer_id, card_number, name_on_card, exp_date, cvc));
    }catch(err){
        throw new Error("Unable to set new payment method");
    }
};

const removeProduct = async (payment_id) => {
    try{
        await Payments.doc(payment_id).delete();
    }catch(err){
        throw new Error("Unable to delete payment method");
    }
};





const getProductByListingID = async(listing_id)


// const getProductByListingID = (req,res) => {
//     const listing_id = parseInt(req.params.listing_id);
//     DB.query(queries.getProductByListingID, [listing_id], (err,result) => {
//         if(err){
//             return res.staus(404).send(err.message);
//         }
//         res.status(200).json(result.rows);
//     });
// };

const removeProductByListingID = (req,res) => {
    const listing_id = parseInt(req.params.listing_id);
    DB.query(queries.getProductByListingID, [listing_id], (err,result) => {
        if(!(result.rows && result.rows.length)){
            res.status(404).send('Product not found');
        }
        DB.query(queries.removeProductByListingID, [listing_id], (err,response) => {
            if(err){
                return res.status(500).send(err.message);
            }
            res.status(200).send('Product removed from database');
        });
    });
};

const getProductByProductType = (req,res) => {
    const product_type = req.params.product_type;
    DB.query(queries.getProductByProductType, [product_type], (err,result) => {
        if(err){
            return res.status(404).send('Product not found');
        }
        res.status(200).json(result.rows);
    });
};