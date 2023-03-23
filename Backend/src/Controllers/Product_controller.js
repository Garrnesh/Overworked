const { FieldValue } = require("firebase-admin/firestore");
const { Products } = require("../firebase.js");

const getProducts = async (req,res) => {
    try{
        const product_coll = await Products.get();
        const product = product_coll.docs.map((doc) => doc.data());
        res.status(200).json(product);
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getProductByID = async (product_id) => {
    const product = await Products.doc(product_id).get();
    if(product.exists){
        return product;
    }else{
        throw new Error("Product does not exist");
    }
};

const checkProductID = async (product_id) => {
    try{
        const product = await Products.doc(product_id).get();
        if(product.exists){
            throw new Error("Product with product ID already exists");
        }
    }catch(err){
        throw new Error("Product with product ID already exists");
    }
};

const addProduct = async (product_id, product_image, product_description, product_brand, product_size) => {
    const product = Products.doc(product_id);
    try{
        await product.set({
            product_image: product_image, 
            product_description: product_description, 
            product_brand: product_brand, 
            product_size: product_size});
        // await product.collection('Listing').doc.set({
        //     business_id: business_id, 
        //     listing_name: listing_name});
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
    if(product.size>0){
        return product;
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
    if(product.size>0){
        return product;
    }else{
        throw new Error("No products with stated Business ID");
    }
}

const removeProductByBusinessID = async(business_id) => {
    try{
        await Products.collection('Listing').where('business_id', '==', business_id).delete();
    }catch(err){
        throw new Error("Unable to delete product");
    }
}

const getProductByProductType = async(product_type) => {
    const product = await Products.where('product_type', '==', product_type).get();
    if(product.size>0){
        return product;
    }else{
        throw new Error("No products with stated Product Type");
    }
}

module.exports = {
    getProducts,
    getProductByID,
    checkProductID,
    addProduct,
    removeProduct,
    getProductByListingName,
    removeProductByListingName,
    getProductByBusinessID,
    removeProductByBusinessID,
    getProductByProductType,
}