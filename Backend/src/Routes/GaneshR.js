const express = require('Express');
const router = express.Router();
const controller = require('../Routes/GaneshC');

//Products
router.get('/product', controller,getProducts);
router.get('/product/:product_id', async (req,res) => {
    const product_id = parseInt(req.params.product_id);
    try{
        const product = await controller.getProductByID(product_id);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.post('/product/', async(req,res) => {
    const { product_id, product_image, product_description, product_brand, product_size, business_id, listing_name } = req.body;
    if((controller.getProductByID(product_id)).exists){
        throw new Error("Product already exists");
    }else{
        try{
            await controller.addProduct(product_id, product_image, product_description, product_brand, product_size, business_id, listing_name);
            res.status(201).send('Product has been added to database');
        }catch(err){
            res.status(500).send(err.message);
        }
    }
});

router.delete('/product/:product_id', async(req,res) => {
    const product_id = parseInt(req.params.product_id);
    if((controller.getProductByID(product_id)).exists){
        try{
            await controller.removeProduct(product_id);
            res.status(200).send("Product has been removed");
        }catch(err){
            res.status(500).send(err.message);
        }
    }else{
        res.status(404).send("Product not found");
    }
}); 

router.get('/product/Listing/:listing_name', async(req,res) => {
    const listing_name = req.body;
    try{
        const product = await controller.getProductByListingName(listing_name);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message); //Come back to check if error is correct
    }
});

router.delete('/product/Listing/:listing_name', async(req,res) => {
    const listing_name = req.body;
    if((controller.getProductByListingName(listing_name)).exists){
        try{
            await controller.removeProductByListingName(listing_name);
            res.status(200).send("Product has been removed");
        }catch(err){
            res.status(500).send(err.message);
        }
    }else{
        res.status(404).send("Product not found");
    }
});

router.get('/product/Listing/:business_id', async(req,res) => {
    const business_id = parseInt(req.params.business_id);
    try{
        const product = await controller.getProductByBusinessID(business_id);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message); //Come back to check if error is correct
    }
});

router.delete('/product/Listing/:business_id', async(req,res) => {
    const business_id = parseInt(req.params.business_id);
    if((controller.getProductByBusinessID(business_id)).exists){
        try{
            await controller.removeProductByBusinessID(business_id);
            res.status(200).send("Product has been removed");
        }catch(err){
            res.status(500).send(err.message);
        }
    }else{
        res.status(404).send("Product not found");
    }
});

router.get('/product/listing_id/:product_type', async(req,res) => {
    const { product_type } = req.body;
    try{
        const product = await controller.getProductByProductType(product_type);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message); //Come back to check if error is correct
    }
});

//Orders

router.get('/order', controller.getOrder);
router.get('/order/:order_id', async(req,res) => {
    const order_id = parseInt(req.params.order_id);
    try{
        const order = await controller.getOrderByID(order_id);
        res.status(200).json(order);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.post('/order', async(req,res) => {
    const { order_id, buyer_id, total_price, date, status } = req.body;
    if((controller.getOrderByID(order_id)).exists){
        throw new Error("Order already exists");
    }else{
        try{
            await controller.addOrder(order_id, buyer_id, total_price, date, status);
            res.status(201).send('Order has been added to database');
        }catch(err){
            res.status(500).send(err.message);
        }
    }
});

router.delete('/order/:order_id', async(req,res) => {
    const order_id = parseInt(req.params.order_id);
    if((controller.getOrderByID(order_id)).exists){
        try{
            await controller.removeOrder(order_id);
            res.status(200).send("Order has been removed");
        }catch(err){
            res.status(500).send(err.message);
        }
    }else{
        res.status(404).send("Order not found");
    }
});

router.get('/order/buyer_id/:buyer_id', async(req,res) => {
    const buyer_id = parseInt(req.params.buyer_id);
    try{
        const order = await controller.getOrderByBuyerId(buyer_id);
        res.status(200).json(order);
    }catch(err){
        res.status(404).send(err.message); //Come back to check if error is correct
    }
});

//Order items

router.get('/orderitem', controller.getOrderItems);
router.get('/orderitem/:orderitem_id', async(req,res) => {
    const orderitem_id = parseInt(req.params.orderitem_id);
    try{
        const orderitem = await controller.getOrderItemByID(orderitem_id);
        res.status(200).json(orderitem);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.post('/orderitem', async(req,res) => {
    const { orderitem_id, order_id, product_id, quantity } = req.body;
    if((controller.getOrderItemByID(orderitem_id)).exists){
        throw new Error("Order item already exists");
    }else{
        try{
            await controller.addOrderItem(orderitem_id, order_id, product_id, quantity);
            res.status(201).send('Order item has been added to database');
        }catch(err){
            res.status(500).send(err.message);
        }
    }
});

router.delete('/orderitem/:orderitem_id', async(req,res) => {
    const orderitem_id = parseInt(req.params.orderitem_id);
    if((controller.getOrderItemByID(orderitem_id)).exists){
        try{
            await controller.removeOrderItem(orderitem_id);
            res.status(200).send("Order item has been removed");
        }catch(err){
            res.status(500).send(err.message);
        }
    }else{
        res.status(404).send("Order item not found");
    }
});

router.get('/orderitem/order_id/:order_id', async(req,res) => {
    const order_id = parseInt(req.params.order_id);
    try{
        const orderitem = await controller.getOrderItemByOrderId(order_id);
        res.status(200).json(orderitem);
    }catch(err){
        res.status(404).send(err.message); //Come back to check if error is correct
    }
});

router.remove('/orderitem/order_id/:order_id', async(req,res) => {
    const order_id = parseInt(req.params.order_id);
    if((controller.getOrderItemByOrderId(order_id)).exists){
        try{
            await controller.removeOrderItemByOrderID(order_id);
            res.status(200).send("Order item has been removed");
        }catch(err){
            res.status(500).send(err.message);
        }
    }else{
        res.status(404).send("Order item not found");
    }
});

module.exports = router;