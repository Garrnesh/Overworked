import { FieldValue } from "firebase-admin/firestore";
import { Buyers, Business, Payments, Shops, Products, Listings, Orders, Orderitems } from "../firebase.js";

//Product_table
const getproducts = async (req,res) => {
    try{
        const product = await Products.get();
        res.status(200).json(product.data());
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getProductByID = async (product_id) => {
    const product = await Products.doc(product_id).get();
    if(product.exists){
        return product.data();
    }else{
        throw new Error("Product does not exist");
    }
};

const addProduct = async (product_id, product_image, product_description, product_brand, product_size, business_id, listing_name) => {
    const product = Products.doc(product_id);
    try{
        await product.set(product_image, product_description, product_brand, product_size);
        await product.collection('Listing').doc.set(business_id, listing_name);
    }catch(err){
        throw new Error("Unable to create new product");
    }
};

const removeProduct = async (product_id) => {
    try{
        await Products.doc(product_id).delete();
    }catch(err){
        throw new Error("Unable to delete product");
    }
};

const getProductByListingName = async(listing_name) => {
    const product = await Products.collection('Listing').where('listing_name', '==', listing_name).get();
    if(product.exists){
        return product.data();
    }else{
        throw new Error("No products with stated Listing name");
    }
}

const removeProductByListingName = async(listing_name) => {
    try{
        await Products.collection('Listing').where('listing_name', '==', listing_name).delete();
    }catch(err){
        throw new Error("Unable to detele product");
    }
}

const getProductByBusinessID = async(business_id) => {
    const product = await Products.collection('Listing').where('business_id', '==', business_id).get();
    if(product.exists){
        return product.data();
    }else{
        throw new Error("No products with stated Business ID");
    }
}

const removeProductByBusinessID = async(business_id) => {
    try{
        await Products.collection('Listing').where('business_id', '==', business_id).delete();
    }catch(err){
        throw new Error("Unable to detele product");
    }
}

const getProductByProductType = async(product_type) => {
    const product = await Products.where('product_type', '==', product_type).get();
    if(product.exists){
        return product.data();
    }else{
        throw new Error("No products with stated Product Type");
    }
}

//Order_table
const getOrder = async (req,res) => {
    try{
        const order = await Orders.get();
        res.status(200).json(order.data());
    }catch(err){
        res.status(500).send(err.message);
    }
}

const getOrderByID = async (order_id) => {
    const order = await Orders.doc(order_id).get();
    if(order.exists){
        return order.data();
    }else{
        throw new Error("Order does not exist");
    }
};

const addOrder = async (product_id, product_image, product_description, product_brand, product_size, business_id, listing_name) => {
    const product = Products.doc(product_id);
    try{
        await product.set(product_image, product_description, product_brand, product_size);
        await product.collection('Listing').doc.set(business_id, listing_name);
    }catch(err){
        throw new Error("Unable to create new product");
    }
};


module.exports = {
    getproducts,
    getProductByID,
    addProduct,
    removeProduct,
    getProductByListingName,
    removeProductByListingName,
    getProductByBusinessID,
    removeProductByBusinessID,
    getProductByProductType,
}