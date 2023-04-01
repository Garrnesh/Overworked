const express = require('Express');
const router = express.Router();
const cartC = require('../Controllers/Cart_controller');
const locationC = require('../Controllers/Location_controller');
const orderC = require('../Controllers/Order_controller');
const paymentC = require('../Controllers/Payment_controller');
const productC = require('../Controllers/Product_controller');
const shopC = require('../Controllers/Shop_controller');
const buyerC = require('../Controllers/BuyerProfile_controller');

//Products
router.get('/products', productC.getProducts);
router.get('/products/:product_id', async (req,res) => {
    const product_id = req.params.product_id;
    try{
        const product = await productC.getProductByID(product_id);
        res.status(200).json(product.data());
    }catch(err){
        res.status(404).send("Product not found");
    }
});

router.post('/products', async(req,res) => {
    const { product_id, product_image, product_description, product_brand, product_size, business_id, listing_name } = req.body;
    try{
        await productC.checkProductID(product_id);
    }catch(err){
        res.status(500).send("Product already exists");
    }

    try{
        await productC.addProduct(product_id, product_image, product_description, product_brand, product_size, business_id, listing_name);
        res.status(201).send("Product has been added to database");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/products/:product_id', async(req,res) => {
    const product_id = req.params.product_id;
    try{
        await productC.getProductByID(product_id);
    }catch(err){
        res.status(500).send("No such product exists");
    }

    try{
        await productC.removeProduct(product_id);
        res.status(200).send("Product has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
}); 

router.get('/products/Listing/:listing_name', async(req,res) => {
    const listing_name = req.params.listing_name;
    try{
        const product = await productC.getProductByListingName(listing_name);
        res.status(200).json(product.data());
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.delete('/products/Listing/:listing_name', async(req,res) => {
    const listing_name = req.params.listing_name;
    try{
        await productC.getProductByListingName(listing_name);
    }catch(err){
        res.status(500).send("No such product exists with given listing name");
    }

    try{
        await productC.removeProductByListingName(listing_name);
        res.status(200).send("Product has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/products/Listing/:business_id', async(req,res) => {
    const business_id = req.params.business_id;
    try{
        const product = await productC.getProductByBusinessID(business_id);
        res.status(200).json(product.data());
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.delete('/products/Listing/:business_id', async(req,res) => {
    const business_id = req.params.business_id;
    try{
        await productC.getProductByBusinessID(business_id);
    }catch(err){
        res.status(500).send("No such product exists with given business ID");
    }

    try{
        await productC.removeProductByBusinessID(business_id);
        res.status(200).send("Product has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/products/listing_id/:product_type', async(req,res) => {
    const { product_type } = req.params.product_type;
    try{
        const product = await productC.getProductByProductType(product_type);
        res.status(200).json(product.data());
    }catch(err){
        res.status(404).send(err.message);
    }
});



router.get('/order', orderC.getOrder);
router.get('/order/:order_id', async(req,res) => {
    const order_id = req.params.order_id;
    try{
        const order = await orderC.getOrderByID(order_id);
        res.status(200).json(order.data());
    }catch(err){
        res.status(404).send("Order not found");
    }
});

router.post('/order', async(req,res) => {
    const { order_id, buyer_id, total_price, date, status } = req.body;
    try{
        await orderC.checkOrderID(order_id);
    }catch(err){
        res.status(500).send("Order already exists");
    }

    try{
        await orderC.addOrder(order_id, buyer_id, total_price, date, status);
        res.status(201).send('Order has been added to database');
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/order/:order_id', async(req,res) => {
    const order_id = req.params.order_id;    
    try{
        await orderC.getOrderByID(order_id);
    }catch(err){
        res.status(500).send("No such order exists");
    }

    try{
        await orderC.removeOrder(order_id);
        res.status(200).send("Order has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/order/buyer_id/:buyer_id', async(req,res) => {
    const buyer_id = req.params.buyer_id;
    try{
        const order = await orderC.getOrderByBuyerId(buyer_id);
        res.status(200).json(order);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.get('/orderitem', orderC.getOrderItems);
router.get('/orderitem/:orderitem_id', async(req,res) => {
    const orderitem_id = req.params.orderitem_id;
    try{
        const orderitem = await orderC.getOrderItemByID(orderitem_id);
        res.status(200).json(orderitem.data());
    }catch(err){
        res.status(404).send("Order item not found");
    }
});

router.post('/orderitem', async(req,res) => {
    const { orderitem_id, order_id, product_id, quantity } = req.body;
    try{
        await orderC.checkOrderItemID(orderitem_id);
    }catch(err){
        res.status(500).send("Order item already exists");
    }

    try{
        await orderC.addOrderItem(orderitem_id, order_id, product_id, quantity);
        res.status(201).send("Order item has been added to database");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/orderitem/:orderitem_id', async(req,res) => {
    const orderitem_id = req.params.orderitem_id;
    try{
        await orderC.getOrderItemByID(orderitem_id);
    }catch(err){
        res.status(500).send("No such order item exists");
    }
    
    try{
        await orderC.removeOrderItem(orderitem_id);
        res.status(200).send("Order item has been removed")
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/orderitem/order_id/:order_id', async(req,res) => {
    const order_id = req.params.order_id;
    try{
        const orderitem = await orderC.getOrderItemByOrderId(order_id);
        res.status(200).json(orderitem.data());
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.delete('/orderitem/order_id/:order_id', async(req,res) => {
    const order_id = parseInt(req.params.order_id);
    try{
        await orderC.getOrderItemByOrderId(order_id);
    }catch(err){
        res.status(500).send("No such order item exists");
    }

    try{
        await orderC.removeOrderItemByOrderID(order_id);
        res.status(200).send("Order item has been removed")
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/payment', paymentC.getPayments);
router.get('/payment/:payment_id', async (req,res) => {
    const payment_id = req.params.payment_id;
    try{
        const payment = await paymentC.getPaymentByID(payment_id);
        res.status(200).json(payment);
    }catch(err){
        res.status(404).send("Payment not found");
    }
});

router.post('/payment', async(req,res) => {
    const { payment_id, buyer_id, card_number, name_on_card, exp_date, cvc } = req.body;
    try{
        await paymentC.checkPaymentID(payment_id);
    }catch(err){
        res.status(500).send("Payment already exists");
    }

    try{
        await paymentC.Payment(payment_id, buyer_id, card_number, name_on_card, exp_date, cvc);
        res.status(201).send("Payment has been added to database");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/payment/:payment_id', async(req,res) => {
    const payment_id = req.params.payment_id;
    try{
        await paymentC.getPaymentByID(payment_id);
    }catch(err){
        res.status(500).send("No such payment exists");
    }

    try{
        await paymentC.removePayment(payment_id);
        res.status(200).send("Payment has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
}); 

router.get('/shop', shopC.getShops);
router.get('/shop/:shop_id', async(req,res) => {
    const shop_id = req.params.shop_id;
    try{
        const shop = await shopC.getShopByID(shop_id);
        res.status(200).json(shop);
    }catch(err){
        res.status(404).send("Shop not found");
    }
});

router.post('/shop', async(req,res) => {
    const { shop_id, business_id, shop_name, UEN_number, Shop_description, Shop_address, Donation
    } = req.body;
    try{
        await shopC.checkShopID(shop_id);
    }catch(err){
        res.status(500).send("Shop already exists");
    }

    try{
        await shopC.addShop(shop_id, business_id, shop_name, UEN_number, Shop_description, Shop_address, Donation);
        res.status(201).send('Shop has been added to database');
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/shop/:shop_id', async(req,res) => {
    const shop_id = req.params.shop_id;    
    try{
        await shopC.getShopByID(shop_id);
    }catch(err){
        res.status(500).send("No such shop exists");
    }

    try{
        await shopC.removeShop(shop_id);
        res.status(200).send("Shop has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/shop/:shop_name/', async(req,res) => {
    const shop_name = req.params.shop_name;
    try{
        const order = await shopC.getShopByName(shop_name);
        res.status(200).json(shop);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.get('/shop/:UEN_number/', async(req,res) => {
    const UEN_number = req.params.UEN_number;
    try{
        const order = await shopC.getShopByUEN(UEN_number);
        res.status(200).json(shop);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.get('/buyer/isusernameunique/:username', async(req,res) => {
    const username = req.params.username;
    try{
        if (await buyerC.isUserNameUnique(username)) {
            res.status(200).send("Username is unique");
        }
        else {
            res.status(409).send("Username is not unique");
        }
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/buyer', async(req,res) => {
    try {
        const idToken = req.headers.idtoken;
        const response = await buyerC.getBuyerProfile(idToken);
        res.status(response.statusCode).send(response.body);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/buyer', async(req,res) => {
    const idToken = req.headers.idtoken;
    const { userName, phoneNumber } = req.body;
    try {
        const response = await buyerC.setBuyerProfile(idToken, userName, phoneNumber);
        res.status(response.statusCode).send(response.body);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/buyer', async(req,res) => {
    try {
        const idToken = req.headers.idtoken;
        const response = await buyerC.deleteBuyerProfile(idToken);
        res.status(response.statusCode).send(response.body);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;


// module.exports = router;

// //Nghia's route
// const express = require('express');
// const app = express();
// import { getBuyer, addBuyer, updateBuyer, deleteBuyer } from "./BuyerDBInterface.js";

// const port = 3000;

// /**
//  * Get a buyer by username
//  */
// app.get('/buyers/:username', async (req, res) =>{
//     const username = req.params.username;
//     try {
//         const buyer = await getBuyer(null, username, null);
//         res.status(200).json(buyer);
//     }
//     catch (err) {
//         res.status(404).send(err.message);
//     }
// });

// /**
//  * Add a new buyer
// */
// app.post('/buyers', async (req, res) => {
//     const { username, password, display_name, email, phone, address } = req.body;
//     try {
//         await addBuyer(username, password, display_name, email, phone, address);
//         res.status(200).send("/buyers/" + username);
//     }
//     catch (err) {
//         if (err.message == "Invalid username") {
//             res.status(400).send(err.message);
//         }
//         else if (err.message == "Invalid email") {
//             res.status(400).send(err.message);
//         }
//         else if (err.message == "Buyer already exists") {
//             res.status(409).send(err.message);
//         }
//         else {
//             res.status(500).send(err.message);
//         }
//     }
// });

// /**
//  * Update a buyer, given buyer_id, if a field is null, use old value
// */
// app.put('/buyers/:buyer_id', async (req, res) => {

//     // Get buyer_id from request
//     const buyer_id = req.params.buyer_id;

//     // Get updated buyer info from request
//     const { username, password, display_name, email, phone, address } = req.body;

//     try {

//         // Get old buyer info; if a field in request is null, use old value
//         const buyer_old = await getBuyer(buyer_id, null, null);
//         if (username == null) {
//             username = buyer_old.username;
//         }
//         if (password == null) {
//             password = buyer_old.password;
//         }
//         if (display_name == null) {
//             display_name = buyer_old.display_name;
//         }
//         if (email == null) {
//             email = buyer_old.email;
//         }
//         if (phone == null) {
//             phone = buyer_old.phone;
//         }
//         if (address == null) {
//             address = buyer_old.address;
//         }

//         // Update buyer
//         await updateBuyer(buyer_id, username, password, display_name, email, phone, address);
//         res.status(200).send("Buyer updated");
//     }
//     catch (err) {
//         if (err.message == "Invalid username") {
//             res.status(400).send(err.message);
//         }
//         else if (err.message == "Invalid email") {
//             res.status(400).send(err.message);
//         }
//         else if (err.message == "Buyer does not exist") {
//             res.status(404).send(err.message);
//         }
//         else {
//             res.status(500).send(err.message);
//         }
//     }
// });

// /**
//  * Delete a buyer
// */
// app.delete('/buyers/:buyer_id', async (req, res) => {
//     const buyer_id = req.params.buyer_id;
//     try {
//         await deleteBuyer(buyer_id);
//         res.status(200).send("Buyer deleted");
//     }
//     catch (err) {
//         if (err.message == "Buyer does not exist") {
//             res.status(404).send(err.message);
//         }
//         else {
//             res.status(500).send(err.message);
//         }
//     }
// });