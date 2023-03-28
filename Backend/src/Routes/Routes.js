const express = require('Express');
const router = express.Router();
const cartC = require('../Controllers/Cart_controller');
const locationC = require('../Controllers/Location_controller');
const orderC = require('../Controllers/Order_controller');
const paymentC = require('../Controllers/Payment_controller');
const productC = require('../Controllers/Product_controller');
const shopC = require('../Controllers/Shop_controller');

//Products routes
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
    const { product_id, business_username, listing_name, product_image, product_description, product_brand, product_size} = req.body;
    try{
        await productC.checkProductID(product_id);
    }catch(err){
        res.status(500).send("Product already exists");
    }

    try{
        await productC.addProduct(product_id, business_username, listing_name, product_image, product_description, product_brand, product_size);
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

router.get('/products/listing_name/:listing_name', async(req,res) => {
    const listing_name = req.params.listing_name;
    try{
        const product = await productC.getProductByListingName(listing_name);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.delete('/products/listing_name/:listing_name', async(req,res) => {
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

router.get('/products/business_username/:business_username', async(req,res) => {
    const business_username = req.params.business_username;
    try{
        const product = await productC.getProductByBusinessUsername(business_username);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.delete('/products/business_username/:business_username', async(req,res) => {
    const business_username = req.params.business_username;
    try{
        await productC.getProductByBusinessUsername(business_username);
    }catch(err){
        res.status(500).send("No such product exists with given business ID");
    }

    try{
        await productC.removeProductByBusinessUsername(business_username);
        res.status(200).send("Product has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/products/listing_id/:product_type', async(req,res) => {
    const { product_type } = req.params.product_type;
    try{
        const product = await productC.getProductByProductType(product_type);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message);
    }
});


//Orders routes
router.get('/orders', orderC.getOrder);
router.get('/orders/:order_id', async(req,res) => {
    const order_id = req.params.order_id;
    try{
        const order = await orderC.getOrderByID(order_id);
        res.status(200).json(order.data());
    }catch(err){
        res.status(404).send("Order not found");
    }
});

router.post('/orders', async(req,res) => {
    const { order_id, buyer_username, total_price, date, status } = req.body;
    try{
        await orderC.checkOrderID(order_id);
    }catch(err){
        res.status(500).send("Order already exists");
    }

    try{
        await orderC.addOrder(order_id, buyer_username, total_price, date, status);
        res.status(201).send('Order has been added to database');
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/orders/:order_id', async(req,res) => {
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

router.get('/orders/buyer_username/:buyer_username', async(req,res) => {
    const buyer_username = req.params.buyer_username;
    try{
        const order = await orderC.getOrderByBuyerUsername(buyer_username);
        res.status(200).json(order);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.get('/orderitems', orderC.getOrderItems);
router.get('/orderitems/:orderitem_id', async(req,res) => {
    const orderitem_id = req.params.orderitem_id;
    try{
        const orderitem = await orderC.getOrderItemByID(orderitem_id);
        res.status(200).json(orderitem.data());
    }catch(err){
        res.status(404).send("Order item not found");
    }
});

router.post('/orderitems', async(req,res) => {
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

router.delete('/orderitems/:orderitem_id', async(req,res) => {
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

router.get('/orderitems/order_id/:order_id', async(req,res) => {
    const order_id = req.params.order_id;
    try{
        const orderitem = await orderC.getOrderItemByOrderId(order_id);
        res.status(200).json(orderitem);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.delete('/orderitems/order_id/:order_id', async(req,res) => {
    const order_id = req.params.order_id;
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


//Payment routes
router.get('/payments', paymentC.getPayments);
router.get('/payments/:payment_id', async (req,res) => {
    const payment_id = req.params.payment_id;
    try{
        const payment = await paymentC.getPaymentByID(payment_id);
        res.status(200).json(payment.data());
    }catch(err){
        res.status(404).send("Payment not found");
    }
});

router.post('/payments', async(req,res) => {
    const { payment_id, buyer_username, card_number, name_on_card, exp_date, cvc } = req.body;
    try{
        await paymentC.checkPaymentID(payment_id);
    }catch(err){
        res.status(500).send("Payment already exists");
    }

    try{
        await paymentC.Payment(payment_id, buyer_username, card_number, name_on_card, exp_date, cvc);
        res.status(201).send("Payment has been added to database");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/payments/:payment_id', async(req,res) => {
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

router.get('/payments/buyer_username/:buyer_username', async(req,res) => {
    const buyer_username = req.params.buyer_username;
    try{
        const payment = await paymentC.getPaymentsByBuyerUsername(buyer_username);
        res.status(200).json(payment);
    }catch(err){
        res.status(404).send(err.message);
    }
}); 


//Shop routes
router.get('/shops', shopC.getShops);
router.get('/shop/:business_username', async(req,res) => {
    const business_username = req.params.business_username;
    try{
        const shop = await shopC.getShopByBusinessUsername(business_username);
        res.status(200).json(shop.data());
    }catch(err){ 
        res.status(404).send("Shop not found");
    }
});

router.post('/shops', async(req,res) => {
    const { business_username, shop_name, UEN_number, Shop_description, Shop_address, Donation
    } = req.body;
    try{
        await shopC.checkShopID(business_username);
    }catch(err){
        res.status(500).send("Shop already exists");
    }

    try{
        await shopC.addShop( business_username, shop_name, UEN_number, Shop_description, Shop_address, Donation);
        res.status(201).send('Shop has been added to database');
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/shops/:business_username', async(req,res) => {
    const business_username = req.params.business_username;    
    try{
        await shopC.getShopByBusinessUsername(business_username);
    }catch(err){
        res.status(500).send("No such shop exists");
    }

    try{
        await shopC.removeShop(business_username);
        res.status(200).send("Shop has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/shops/shop_name/:shop_name', async(req,res) => {
    const shop_name = req.params.shop_name;
    try{
        const shop = await shopC.getShopByName(shop_name);
        res.status(200).json(shop);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.get('/shops/:UEN_number', async(req,res) => {
    const UEN = req.params.UEN_number;
    try{
        const shop = await shopC.getShopByUEN(UEN);
        res.status(200).json(shop);
    }catch(err){
        res.status(404).send(err.message);
    }
});

//Location routes
router.get('/locations', locationC.getLocation);

router.get('/locations/:business_username', async(req,res) => {
    const business_username = req.params.business_username;
    try{
        const location = await locationC.getLocationByBusinessUsername(business_username);
        res.status(200).json(location.data());
    }catch(err){ 
        res.status(404).send("Location not found");
    }
});

router.post('/locations', async(req,res) => {
    const { business_username, postal_code } = req.body;
    try{
        await locationC.checkLocation(business_username);
    }catch(err){
        res.status(500).send("Location already exists");
    }

    try{
        await locationC.addLocation( business_username, postal_code);
        res.status(201).send('Location has been added to database');
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/locations/:business_username', async(req,res) => {
    const business_username = req.params.business_username;    
    try{
        await locationC.getLocationByBusinessUsername(business_username);
    }catch(err){
        res.status(500).send("No such location exists");
    }

    try{
        await locationC.removeLocation(business_username);
        res.status(200).send("Location has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/locations/postal_code/:postal_code', async(req,res) => {
    const postal_code  = JSON.stringify(req.params.postal_code);
    try{
        const location = await locationC.identifyLocation(postal_code);
        console.log(location);
        res.status(200).json(location);
    }catch(err){
        res.status(404).send("Location not found");
    }
});

router.post('/locations/routes', async(req,res) => {
    const { latitude_person, longitude_person, business_username, route_type } = req.body;
    try{
        await locationC.getLocationByBusinessUsername(business_username);
    }catch(err){
        res.status(404).send("Business not found")
    }

    try{
        const business_data = await locationC.getLocationByBusinessUsername(business_username);
        const business = business_data.data();
        const latitude_business = business["latitude"];
        const longitude_business = business["longitude"];
        const route = await locationC.getRoute(latitude_person, longitude_person, latitude_business, longitude_business, route_type);
        res.status(200).json(route);
    }catch(err){
        res.status(500).send("Route cannot be provided")
    }
})

module.exports = router;




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