const express = require('Express');
const router = express.Router();
const controller = require('../Controllers/RaymondC');

//Products
router.get('/payment', controller.getPayments);
router.get('/payment/:payment_id', async (req,res) => {
    const payment_id = req.params.payment_id;
    try{
        const payment = await controller.getPaymentsByID(payment_id);
        res.status(200).json(payment);
    }catch(err){
        res.status(404).send("Payment not found");
    }
});

router.post('/payment', async(req,res) => {
    const { payment_id, buyer_id, card_number, name_on_card, exp_date, cvc } = req.body;
    try{
        await controller.checkPaymentID(payment_id);
    }catch(err){
        res.status(500).send("Payment already exists");
    }

    try{
        await controller.Payment(payment_id, buyer_id, card_number, name_on_card, exp_date, cvc);
        res.status(201).send("Payment has been added to database");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/payment/:payment_id', async(req,res) => {
    const payment_id = req.params.payment_id;
    try{
        await controller.getPaymentByID(payment_id);
    }catch(err){
        res.status(500).send("No such payment exists");
    }

    try{
        await controller.removePayment(payment_id);
        res.status(200).send("Payment has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
}); 


//Orders
router.get('/shop', controller.getShops);
router.get('/shop/:shop_id', async(req,res) => {
    const shop_id = req.params.shop_id;
    try{
        const shop = await controller.getShopByID(shop_id);
        res.status(200).json(shop);
    }catch(err){
        res.status(404).send("Shop not found");
    }
});

router.post('/shop', async(req,res) => {
    const { shop_id, business_id, shop_name, UEN_number, Shop_description, Shop_address, Donation
    } = req.body;
    try{
        await controller.checkShopID(shop_id);
    }catch(err){
        res.status(500).send("Shop already exists");
    }

    try{
        await controller.addShop(shop_id, business_id, shop_name, UEN_number, Shop_description, Shop_address, Donation);
        res.status(201).send('Shop has been added to database');
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.delete('/shop/:shop_id', async(req,res) => {
    const shop_id = req.params.shop_id;    
    try{
        await controller.getShopByID(shop_id);
    }catch(err){
        res.status(500).send("No such shop exists");
    }

    try{
        await controller.removeShop(shop_id);
        res.status(200).send("Shop has been removed");
    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get('/shop/:shop_name/', async(req,res) => {
    const shop_name = req.params.shop_name;
    try{
        const order = await controller.getShopByName(shop_name);
        res.status(200).json(shop);
    }catch(err){
        res.status(404).send(err.message);
    }
});

router.get('/shop/:UEN_number/', async(req,res) => {
    const UEN_number = req.params.UEN_number;
    try{
        const order = await controller.getShopByUEN(UEN_number);
        res.status(200).json(shop);
    }catch(err){
        res.status(404).send(err.message);
    }
});




module.exports = router;