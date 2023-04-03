const express = require('Express');
const router = express.Router();
const cartC = require('../Controllers/Cart_controller');
const locationC = require('../Controllers/Location_controller');
const orderC = require('../Controllers/Order_controller');
const paymentC = require('../Controllers/Payment_controller');
const productC = require('../Controllers/Product_controller');
const shopC = require('../Controllers/Shop_controller');
const buyerC = require('../Controllers/BuyerProfile_controller');
const addressC = require('../Controllers/Address_controller');
//Generate random id

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


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
    const { product_image, product_description, product_brand, listing_name, product_price, product_size, business_username, category, tags, product_quantity} = req.body;
    const product_id = "product" + generateRandomString(20);
    
    try{
        await productC.checkProductID(product_id);
    }catch(err){
        res.status(500).send("Product already exists");
    }

    try{
        await productC.addProduct(product_id, product_image, product_description, product_brand, listing_name, product_price, product_size, business_username, category, tags, product_quantity);
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

router.get('/products/category/:category', async(req,res) => {
    const { category } = req.params;
    try{
        const product = await productC.getProductByProductType(category);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.put('/products/:product_id', async(req,res) => {
    const { product_id, quantity } = req.body;
    try{
        await productC.getProductByID(product_id);
    }catch(err){
        res.status(500).send("Product does not exists");
    }

    try{
        await productC.updateProductQuantity(product_id, quantity);
        res.status(201).send('Product has been updated');
    }catch(err){
        res.status(500).send(err.message);
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
    const { buyer_username, total_price, date, status } = req.body;
    const order_id = "order" + generateRandomString(20);
    
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
    const { order_id, product_id, quantity } = req.body;
    const orderitem_id = "orderitem" + generateRandomString(20);
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
    const { buyer_username, card_number, name_on_card, exp_date, cvc } = req.body;
    const payment_id = "pay" + generateRandomString(20);

    try{
        await paymentC.checkPaymentID(payment_id);
    }catch(err){
        res.status(500).send("Payment already exists");
    }

    try{
        await paymentC.addPayment(payment_id, buyer_username, card_number, name_on_card, exp_date, cvc);
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

//Address routes
router.get('/address', addressC.getAddress);
router.get('/address/:address_id', async (req,res) => {
    const address_id = req.params.address_id;
    try{
        const address = await addressC.getAddressByID(address_id);
        res.status(200).json(address.data());
    }catch(err){
        res.status(404).send("Address not found");
    }
});

router.post('/address', async(req,res) => {
    const { buyer_username, address_str, postal_code } = req.body;
    const address_id = "address" + generateRandomString(20);
    try{
        await addressC.checkAddressID(address_id);
    }catch(err){
        res.status(500).send("Address already exists");
    }

    try{
        await addressC.addAddress(address_id, buyer_username, address_str, postal_code);
        res.status(201).send("Address has been added to database");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/address/:address_id', async(req,res) => {
    const address_id = req.params.address_id;
    try{
        await addressC.getAddressByID(address_id);
    }catch(err){
        res.status(500).send("No such address exists");
    }

    try{
        await addressC.removeAddress(address_id);
        res.status(200).send("Address has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/address/buyer_username/:buyer_username', async(req,res) => {
    const buyer_username = req.params.buyer_username;
    try{
        const address = await addressC.getAddressByBuyerUsername(buyer_username);
        res.status(200).json(address);
    }catch(err){
        res.status(404).send(err.message);
    }
}); 


//Shop routes
router.get('/shops', shopC.getShops);
router.get('/shops/:business_username', async(req,res) => {
    const business_username = req.params.business_username;
    try{
        const shop = await shopC.getShopByBusinessUsername(business_username);
        res.status(200).json(shop.data());
    }catch(err){ 
        res.status(404).send("Shop not found");
    }
});

router.post('/shops', async(req,res) => {
    const { business_username, shop_name, UEN_number, shop_description, Shop_address, donation
    } = req.body;
    try{
        await shopC.checkShopID(business_username);
    }catch(err){
        res.status(500).send("Shop already exists");
    }

    try{
        await shopC.addShop( business_username, shop_name, UEN_number, shop_description, Shop_address, donation);
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

//Cart routes
router.get('carts', cartC.getCart);

router.get('/carts/:cart_id', async(req,res) => {
    const cart_id = req.params.cart_id;
    try{
        const cart = await cartC.getCartByID(cart_id);
        res.status(200).json(cart.cart());
    }catch(err){ 
        res.status(404).send("Cart not found");
    }
})

router.post('/carts', async(req,res) => {
    const { cart_id, buyer_username } = req.body;
    try{
        await cartC.checkCartID(cart_id);
    }catch(err){
        res.status(500).send("Location already exists");
    }

    try{
        await cartC.addCart(cart_id, buyer_username);
        res.status(201).send('Cart has been added to database');
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/carts/:cart_id', async(req,res) => {
    const cart_id = req.params.cart_id;    
    try{
        await cartC.getCartByID(cart_id);
    }catch(err){
        res.status(500).send("No such cart exists");
    }

    try{
        await cartC.removeCart(cart_id);
        res.status(200).send("Cart has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/carts/buyer_username/:buyer_username', async(req,res) => {
    const business_username = req.params.business_username;
    try{
        const cart = await cartC.getCartByBuyerUsername(business_username);
        res.status(200).json(cart.data());
    }catch(err){ 
        res.status(404).send("Cart not found");
    }
})

router.delete('/carts/buyer_username/:buyer_username', async(req,res) => {
    const buyer_username = req.params.buyer_username;    
    try{
        await cartC.getCartByBuyerUsername(buyer_username);
    }catch(err){
        res.status(500).send("No such cart exists");
    }

    try{
        await cartC.removeCartByBuyerUsername(buyer_username);
        res.status(200).send("Cart has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/cartitems', cartC.getCartItems);

router.get('/cartitems/:cartitem_id', async(req,res) => {
    const cartitem_id = req.params.cartitem_id;
    try{
        const cartitem = await cartC.getCartItemByID(cartitem_id);
        res.status(200).json(cartitem.data());
    }catch(err){ 
        res.status(404).send("Cart item not found");
    }
})

router.post('/cartitems', async(req,res) => {
    const { cart_id, product_id, quantity } = req.body;
    const cartitem_id = "cartitem" + generateRandomString(20);
    
    try{
        await cartC.checkCartItemID(cartitem_id);
    }catch(err){
        res.status(500).send("Cart item already exists");
    }

    try{
        await cartC.addCartItem(cartitem_id, cart_id, product_id, quantity);
        res.status(201).send('Cart item has been added to database');
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.put('/cartitems/:cartitem_id', async(req,res) => {
    const { cartitem_id, quantity } = req.body;
    try{
        await cartC.getCartItemByID(cartitem_id);
    }catch(err){
        res.status(500).send("Cart item does not exists");
    }

    try{
        await cartC.updateCartItem(cartitem_id, quantity);
        res.status(201).send('Cart itemhas been updated');
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/cartitems/:cartitem_id', async(req,res) => {
    const cartitem_id = req.params.cartitem_id;    
    try{
        await cartC.getCartItemByID(cartitem_id);
    }catch(err){
        res.status(500).send("No such cart item exists");
    }

    try{
        await cartC.removeCartItem(cartitem_id);
        res.status(200).send("Cart item has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/cartitems/cart_id/:cart_id', async(req,res) => {
    const cart_id = req.params.cart_id;
    try{
        const cartitem = await cartC.getCartItemByCartId(cart_id);
        res.status(200).json(cartitem);
    }catch(err){ 
        res.status(404).send("Cart item not found");
    }
})

router.delete('/cartitems/cart_id/:cart_id', async(req,res) => {
    const cart_id = req.params.cart_id;    
    try{
        await cartC.getCartItemByCartId(cart_id);
    }catch(err){
        res.status(500).send("No such cart item exists");
    }

    try{
        await cartC.removeCartItemByCartID(cart_id);
        res.status(200).send("Cart item has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});



// -----------------------------------
// Buyer routes start
// -----------------------------------

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

// ----------------------------------
// Buyer routes end
// ----------------------------------

// ----------------------------------
// Business routes start
// ----------------------------------

router.get('/business/isusernameunique/:username', async(req,res) => {
    const username = req.params.username;
    try{
        if (await businessC.isUserNameUnique(username)) {
            res.status(200).send("Username is unique");
        }
        else {
            res.status(409).send("Username is not unique");
        }
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/business', async(req,res) => {
    try {
        const idToken = req.headers.idtoken;
        const response = await businessC.getBusinessProfile(idToken);
        res.status(response.statusCode).send(response.body);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/business', async(req,res) => {
    const idToken = req.headers.idtoken;
    const { userName, shopDesc, shopAddr, postalCode, uen, phoneNumber, donation } = req.body;
    try {
        const response = await businessC.createNewBusiness(idToken, userName, phoneNumber, uen, donation, 
            shopDesc, shopAddr, postalCode, userName);
        res.status(response.statusCode).send(response.body);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/business', async(req,res) => {
    try {
        const idToken = req.headers.idtoken;
        const response = await businessC.deleteBusinessProfile(idToken);
        res.status(response.statusCode).send(response.body);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// ----------------------------------
// Business routes end
// ----------------------------------


// ----------------------------------
// Location routes start
// ----------------------------------
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

// ----------------------------------
// Location routes end
// ----------------------------------
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


// const [filteredProducts, setFilteredProducts] = useState([]);

// const FilterResult = async (categoryname) => {
//   const category = categoryname.toUpperCase();
//   console.log('test1');
//   try {
//     const response = await fetch("http://localhost:8000/products/category/" + category, {
//       method: 'GET',
//     });
//     const response_Data = await response.json(); 
//     console.log(response_Data);
//     setFilteredProducts(response_Data);
//     setIsfilteredEffect(isFilterEffect => !isFilterEffect);
//   } catch (err) {
//     console.log(err);
//   }
//   console.log(filteredProducts);
// };

// import React, { useState } from "react";
// const [mapSrc, setMapSrc] = useState("");
// const returnMap = async(business_username) => {
//     try{
//         const response = await fetch("http://localhost:8000/locations/" + business_username, {
//             method: 'GET',
//         });
//         const response_json = await response.json()
//         const latitude = response_json["latitude"]
//         const longitude = response_json["longitude"]
//         const postal_code = response_json["postal_code"]
//         const url = `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&postal${postal_code}&zoom=17&height=512&width=512&points=[${latitude}, ${longitude},"255,255,178","A"]`
//         return url
//     }catch(err){
//         console.log(err);
//     }
// }




// fetch(`https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&postal${postal_code}&zoom=17&height=512&width=512&points=[${latitude}, ${longitude},"255,255,178","A"]`)



// async function fetchMap() {
//     try {
//     const response = await fetch("http://localhost:8000/locations/" + id, {
//         method: 'GET',
//     });
//     const response_json = await response.json(); // await is needed here
//     const latitude = response_json["latitude"];
//     const longitude = response_json["longitude"];
//     const postal_code = response_json["postal_code"];
//     console.log(latitude, longitude, postal_code);
//     const url = `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&postal=${postal_code}&zoom=17&height=512&width=512&points=[${latitude},${longitude},"255,255,178","A"]`;
//     // const mapResponse = await fetch(https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&postal=636960&zoom=17&height=512&width=512&points=[1.35381999263169,%20103.688242893188,%22255,255,178%22,%22A%22]);
//     return url
//     }catch(err) {
//         console.log(err);
//     }
// }

  
