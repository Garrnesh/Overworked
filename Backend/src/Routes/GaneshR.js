const express = require('Express');
const router = express.Router();
const controller = require('../Routes/GaneshR');

//Products
router.get('/product', controller,getProducts);
router.get('/product/:product_id', controller.getProductByID);




