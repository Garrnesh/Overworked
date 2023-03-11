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
    const { product_id, listing_id, product_image, product_description, product_brand, product_size, business_id, listing_name } = req.body;
    if((controller.getProductByID(product_id)).exists){
        throw new Error("Product already exists");
    }else{
        try{
            await controller.addProduct(product_id, listing_id, product_image, product_description, product_brand, product_size, business_id, listing_name);
        }catch(err){
            res.status(201).send('Product has been added to database');
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

router.get('/api/product/Listing/:listing_name', async(req,res) => {
    const listing_name = req.body;
    try{
        const product = await controller.getProductByListingName(listing_name);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message); //Come back to check if error is correct
    }
});

router.delete('/api/product/Listing/:listing_name', async(req,res) => {
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

router.get('/api/product/Listing/:business_id', async(req,res) => {
    const business_id = parseInt(req.params.business_id);
    try{
        const product = await controller.getProductByBusinessID(business_id);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message); //Come back to check if error is correct
    }
});

router.delete('/api/product/Listing/:business_id', async(req,res) => {
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

router.get('/api/product/listing_id/:product_type', async(req,res) => {
    const { product_type } = req.body;
    try{
        const product = await controller.getProductByProductType(product_type);
        res.status(200).json(product);
    }catch(err){
        res.status(404).send(err.message); //Come back to check if error is correct
    }
});

//Listings




