const express = require('Express');
const router = express.Router();
const controller = require('../Controllers/GaneshC');

//Products
router.get('/product', controller.getProducts);
router.get('/product/:product_id', async (req,res) => {
    const product_id = req.params.product_id;
    try{
        const product = await controller.getProductByID(product_id);
        res.status(200).json(product.data());
    }catch(err){
        res.status(404).send("Product not found");
    }
});

router.post('/product', async(req,res) => {
    const { product_id, product_image, product_description, product_brand, product_size, business_id, listing_name } = req.body;
    try{
        await controller.checkProductID(product_id);
    }catch(err){
        res.status(500).send("Product already exists");
    }

    try{
        await controller.addProduct(product_id, product_image, product_description, product_brand, product_size, business_id, listing_name);
        res.status(201).send("Product has been added to database");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/product/:product_id', async(req,res) => {
    const product_id = req.params.product_id;
    try{
        await controller.getProductByID(product_id);
    }catch(err){
        res.status(500).send("No such product exists");
    }

    try{
        await controller.removeProduct(product_id);
        res.status(200).send("Product has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
}); 

router.get('/product/Listing/:listing_name', async(req,res) => {
    const listing_name = req.params.listing_name;
    try{
        const product = await controller.getProductByListingName(listing_name);
        res.status(200).json(product.data());
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.delete('/product/Listing/:listing_name', async(req,res) => {
    const listing_name = req.params.listing_name;
    try{
        await controller.getProductByListingName(listing_name);
    }catch(err){
        res.status(500).send("No such product exists with given listing name");
    }

    try{
        await controller.removeProductByListingName(listing_name);
        res.status(200).send("Product has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/product/Listing/:business_id', async(req,res) => {
    const business_id = req.params.business_id;
    try{
        const product = await controller.getProductByBusinessID(business_id);
        res.status(200).json(product.data());
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.delete('/product/Listing/:business_id', async(req,res) => {
    const business_id = req.params.business_id;
    try{
        await controller.getProductByBusinessID(business_id);
    }catch(err){
        res.status(500).send("No such product exists with given business ID");
    }

    try{
        await controller.removeProductByBusinessID(business_id);
        res.status(200).send("Product has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/product/listing_id/:product_type', async(req,res) => {
    const { product_type } = req.params.product_type;
    try{
        const product = await controller.getProductByProductType(product_type);
        res.status(200).json(product.data());
    }catch(err){
        res.status(404).send(err.message);
    }
});

//Orders

router.get('/order', controller.getOrder);
router.get('/order/:order_id', async(req,res) => {
    const order_id = req.params.order_id;
    try{
        const order = await controller.getOrderByID(order_id);
        res.status(200).json(order.data());
    }catch(err){
        res.status(404).send("Order not found");
    }
});

router.post('/order', async(req,res) => {
    const { order_id, buyer_id, total_price, date, status } = req.body;
    try{
        await controller.checkOrderID(order_id);
    }catch(err){
        res.status(500).send("Order already exists");
    }

    try{
        await controller.addOrder(order_id, buyer_id, total_price, date, status);
        res.status(201).send('Order has been added to database');
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/order/:order_id', async(req,res) => {
    const order_id = req.params.order_id;    
    try{
        await controller.getOrderByID(order_id);
    }catch(err){
        res.status(500).send("No such order exists");
    }

    try{
        await controller.removeOrder(order_id);
        res.status(200).send("Order has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/order/buyer_id/:buyer_id', async(req,res) => {
    const buyer_id = req.params.buyer_id;
    try{
        const order = await controller.getOrderByBuyerId(buyer_id);
        res.status(200).json(order.data());
    }catch(err){
        res.status(404).send(err.message);
    }
});

//Order items

router.get('/orderitem', controller.getOrderItems);
router.get('/orderitem/:orderitem_id', async(req,res) => {
    const orderitem_id = req.params.orderitem_id;
    try{
        const orderitem = await controller.getOrderItemByID(orderitem_id);
        res.status(200).json(orderitem.data());
    }catch(err){
        res.status(404).send("Order item not found");
    }
});

router.post('/orderitem', async(req,res) => {
    const { orderitem_id, order_id, product_id, quantity } = req.body;
    try{
        await controller.checkOrderItemID(orderitem_id);
    }catch(err){
        res.status(500).send("Order item already exists");
    }

    try{
        await controller.addOrderItem(orderitem_id, order_id, product_id, quantity);
        res.status(201).send("Order item has been added to database");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/orderitem/:orderitem_id', async(req,res) => {
    const orderitem_id = req.params.orderitem_id;
    try{
        await controller.getOrderItemByID(orderitem_id);
    }catch(err){
        res.status(500).send("No such order item exists");
    }
    
    try{
        await controller.removeOrderItem(orderitem_id);
        res.status(200).send("Order item has been removed")
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/orderitem/order_id/:order_id', async(req,res) => {
    const order_id = req.params.order_id;
    try{
        const orderitem = await controller.getOrderItemByOrderId(order_id);
        res.status(200).json(orderitem.data());
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.delete('/orderitem/order_id/:order_id', async(req,res) => {
    const order_id = parseInt(req.params.order_id);
    try{
        await controller.getOrderItemByOrderId(order_id);
    }catch(err){
        res.status(500).send("No such order item exists");
    }

    try{
        await controller.removeOrderItemByOrderID(order_id);
        res.status(200).send("Order item has been removed")
    }catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = router;