const { FieldValue } = require("firebase-admin/firestore");
const { Buyers, Business, Payments, Shops, Products, Listings, Orders, Orderitems } = require("../firebase.js");


//Product_table
const getProducts = async (req,res) => {
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

//Order table
const getOrder = async (req,res) => {
    try{
        const order = await Orders.get();
        res.status(200).json(order);
    }catch(err){
        res.status(500).send(err.message);
    }
}

const getOrderByID = async (order_id) => {
    const order = await Orders.doc(order_id).get();
    if(order.exists){
        return order;
    }else{
        throw new Error("Order does not exist");
    }
};

const checkOrderID = async (order_id) => {
    try{
        const order = await Orders.doc(order_id).get();
        if(order.exists){
            throw new Error("Order with order id already exists");
        }
    }catch(err){
        throw new Error("Order with order id already exists");
    }
};

const addOrder = async (order_id, buyer_id, total_price, date, status) => {
    const order = Orders.doc(order_id);
    try{
        await order.set({
            buyer_id: buyer_id, 
            total_price: total_price, 
            date: date, 
            status: status});
    }catch(err){
        throw new Error("Unable to create new order");
    }
};

const removeOrder = async (order_id) => {
    try{
        await Orders.doc(order_id).delete();
    }catch(err){
        throw new Error("Unable to delete order");
    }
};

const getOrderByBuyerId = async(buyer_id) => {
    const order = await Orders.where('buyer_id', '==', buyer_id).get();
    if(order.size>0){
        return order;
    }else{
        throw new Error("No order with stated buyer ID");
    }
}

//Orderitem_table
const getOrderItems = async (req,res) => {
    try{
        const order_item = await Orderitems.get();
        res.status(200).json(order_item.data());
    }catch(err){
        res.status(500).send(err.message);
    }
}

const getOrderItemByID = async (orderitem_id) => {
    const order_item = await Orderitems.doc(orderitem_id).get();
    if(order_item.exists){
        return order_item.data();
    }else{
        throw new Error("Order Item does not exist");
    }
};

const addOrderItem = async (orderitem_id, order_id, product_id, quantity) => {
    const order_item = Orderitems.doc(orderitem_id);
    try{
        await order_item.set(order_id, product_id, quantity);
    }catch(err){
        throw new Error("Unable to create new order item");
    }
};

const removeOrderItem = async (orderitem_id) => {
    try{
        await Orderitems.doc(orderitem_id).delete();
    }catch(err){
        throw new Error("Unable to delete order item");
    }
};

const getOrderItemByOrderId = async(order_id) => {
    const order_item = await Orderitems.where('order_id', '==', order_id).get();
    if(order_item.exists){
        return order_item.data();
    }else{
        throw new Error("No order item with stated Order item ID");
    }
}

const removeOrderItemByOrderID = async (order_id) => {
    try{
        await Orderitems.where("order_id", "==", order_id).delete();
    }catch(err){
        throw new Error("Unable to delete order item with specified order_id")
    }
}

module.exports = {
    getProducts,
    getProductByID,
    addProduct,
    removeProduct,
    getProductByListingName,
    removeProductByListingName,
    getProductByBusinessID,
    removeProductByBusinessID,
    getProductByProductType,
    getOrder,
    getOrderByID,
    checkOrderID,
    addOrder,
    removeOrder,
    getOrderByBuyerId,
    getOrderItems,
    getOrderItemByID,
    addOrderItem,
    removeOrderItem,
    getOrderItemByOrderId,
    removeOrderItemByOrderID,
}