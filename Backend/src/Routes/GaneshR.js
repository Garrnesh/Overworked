const DB = require('../../db');
const queries = require('../Queries/GaneshQ');

//Product_table
const getProducts = (req, res) => {
    DB.query(queries.getProducts, (err, result) => {
        if(err){
            return res.status(500).send(err.message);
        }
        res.status(200).json(result.rows);
    });
};

const getProductByID = (req,res) => {
    const product_id = parseInt(req.params.product_id);
    DB.query(queries.getProductByID, [product_id], (err, result) => {
        if(err){
            return res.status(404).send(err.message);
        }
        res.status(200).json(result.rows);
    });
};

const addProduct = (req,res) => {
    const {listing_id, product_image, product_description, product_brand, product_size} = req.body;
    
    DB.query(queries.checkIfProductExist, [listing_id, product_description, product_brand, product_size], (err, result) =>{
        if (result.rows && result.rows.length){
            res.status(409).send('Product already exists'); //Not sure if I should have a status here
        }
        DB.query(queries.addProduct, [listing_id, product_image, product_description, product_brand, product_size], (req,res) => {
            if(err){
                return res.status(500).send(err.message);
            }
            res.status(201).send('Product has been added to database');
        });
    });
};

const removeProduct = (req, res) => {
    const product_id = parseInt(req.params.product_id);
    DB.query(queries.getProductByID, [product_id], (err,result) => {
        if(!(result.rows && result.rows.length)){
            return res.status(404).send('Product not found');
        }
        DB.query(queries.removeProduct, [product_id], (err,result) => {
            if(err){
                return res.status(500).send(err.message);
            }
            res.status(200).send('Product has been removed from database');
        });
    });
};

const getProductByListingID = (req,res) => {
    const listing_id = parseInt(req.params.listing_id);
    DB.query(queries.getProductByListingID, [listing_id], (err,result) => {
        if(err){
            return res.staus(404).send(err.message);
        }
        res.status(200).json(result.rows);
    });
};

const removeProductByListingID = (req,res) => {
    const listing_id = parseInt(req.params.listing_id);
    DB.query(queries.getProductByListingID, [listing_id], (err,result) => {
        if(!(result.rows && result.rows.length)){
            res.status(404).send('Product not found');
        }
        DB.query(queries.removeProductByListingID, [listing_id], (err,response) => {
            if(err){
                res.status(500).send(err.message);
            }
            res.status(200).send('Product removed from database');
        });
    });
};

const getProductByProductType = (req,res) => {
    const product_type = req.params.product_type;
    DB.query(queries.getProductByProductType, [product_type], (err,result) => {
        if(err){
            res.status(404).send('Product not found');
        }
        res.status(200).json(result.rows);
    });
};

//Listing_table
