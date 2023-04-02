const { FieldValue } = require("firebase-admin/firestore");
const { Orders, Orderitems } = require("../firebase.js");

const getOrder = async (req,res) => {
    try{
        const order_coll = await Orders.get();
        const order = order_coll.docs.map((doc) => doc.data());
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

const addOrder = async (order_id, buyer_username, total_price, date, status) => {
    const order = Orders.doc(order_id);
    try{
        await order.set({
            buyer_username: buyer_username, 
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

const getOrderByBuyerUsername = async(buyer_username) => {
    const order_coll = await Orders.where('buyer_username', '==', buyer_username).get();
    const order = order_coll.docs.map((doc) => doc.data());
    if(order.length>0){
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
        return order_item;
    }else{
        throw new Error("Order Item does not exist");
    }
};

const checkOrderItemID = async (orderitem_id) => {
    try{
        const orderitem = await Orderitems.doc(orderitem_id).get();
        if(orderitem.exists){
            throw new Error("Order item with order ID already exists");
        }
    }catch(err){
        throw new Error("Order item with order ID already exists")
    }
}

const addOrderItem = async (orderitem_id, order_id, product_id, quantity) => {
    const order_item = Orderitems.doc(orderitem_id);
    try{
        await order_item.set({
            order_id: order_id, 
            product_id: product_id, 
            quantity: quantity});
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
    if(order_item.length>0){
        return order_item;
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
    getOrder,
    getOrderByID,
    checkOrderID,
    addOrder,
    removeOrder,
    getOrderByBuyerUsername,
    getOrderItems,
    getOrderItemByID,
    checkOrderItemID,
    addOrderItem,
    removeOrderItem,
    getOrderItemByOrderId,
    removeOrderItemByOrderID,
}