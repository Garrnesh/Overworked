const DB = require('../../db');
const queries = require('../Queries/GaneshQ');

//Product_table
const getProducts = (req, res) => {
    DB.query(queries.getProducts, (err, result) => {
        if(err){
            return res.status(500).send(err.message);
        };
        res.status(200).json(result.rows);
    });
};

const getProductByID = (req,res) => {
    const product_id = parseInt(req.params.product_id);
    DB.query(queries.getProductByID, [product_id], (err, result) => {
        if(err){
            return res.status(404).send(err.message);
        };
        res.status(200).send(result.rows);
    });
};

const addProduct = (req,res) => {
    

};