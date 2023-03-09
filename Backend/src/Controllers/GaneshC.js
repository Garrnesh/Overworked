import { FieldValue } from "firebase-admin/firestore";
import { buyers, business, payments, shops, products, listings, orders, orderitems } from "../firebase.js";

//Product_table
const getproducts = async (req,res) => {
    try{
        const product = await products.get();
        res.status(200).json(product.data());
    }catch(err){
        res.status(500).send(err.message);
    }
};

// const getProducts = (req, res) => {
//     DB.query(queries.getProducts, (err, result) => {
//         if(err){
//             return res.status(500).send(err.message);
//         }
//         res.status(200).json(result.rows);
//     });
// };

const getProductByID = async (req,res) => {
    const product_id = parseInt(req.params.product_id);
    try{
        const product = await products.doc(product_id).get();
        res.status(200).json(product.data());
    }catch(err){
        res.status(404).send(err.message);
    }
};

// const getProductByID = (req,res) => {
//     const product_id = parseInt(req.params.product_id);
//     DB.query(queries.getProductByID, [product_id], (err, result) => {
//         if(err){
//             return res.status(404).send(err.message);
//         }
//         res.status(200).json(result.rows);
//     });
// };

const addProduct = (req,res) => {
    const {listing_id, product_image, product_description, product_brand, product_size} = req.body;
    
    DB.query(queries.checkIfProductExist, [listing_id, product_description, product_brand, product_size], (err, result) =>{
        if (result.rows && result.rows.length){
            return res.status(409).send('Product already exists'); //Not sure if I should have a status here
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
                return res.status(500).send(err.message);
            }
            res.status(200).send('Product removed from database');
        });
    });
};

const getProductByProductType = (req,res) => {
    const product_type = req.params.product_type;
    DB.query(queries.getProductByProductType, [product_type], (err,result) => {
        if(err){
            return res.status(404).send('Product not found');
        }
        res.status(200).json(result.rows);
    });
};

//Listing_table
const getListings = (req,res) => {
    DB.query(queries.getListings, (err,result) => {
        if(err){
            return res.status(500).send(err.message);
        }
        res.status(200).json(result.rows);
    });
};

const getListingByID = (req,res) => {
    const listing_id = parseInt(req.params.listing_id);
    DB.query(queries.getListingByID, [listing_id], (err,result) => {
        if(err){
             return res.status(404).send(err.message);
        }
        res.status(200).json(result.rows);
    });
};

const removeListing = (req,res) => {
    const listing_id = parseInt(req.params.listing_id);
    DB.query(queries.getListingByID, [listing_id], (err,request) => {
        if(!(result.rows && result.rows.length)){
            res.status(404).send('Listing not found');
        }
        DB.query(queries.removeListing, [listing_id], (err,result) => {
            if(err){
                return res.status(500).send(err.message);
            }
            res.status(200).send('Listing removed from database');
        })
    });
};

const addListing = (req,res) => {
    const {business_id, listing_name} = req.body;
    DB.query(queries.checkifListingExists, [business_id, listing_name], (err,result) => {
        if (result.rows && result.rows.length){
            res.status(409).send('Listing already exists'); //Not sure if I should have a status here
        }
        DB.query(queries.addListing, [business_id, listing_name], (err,response) => {
            if(err){
                return res.status(500).send(err.message);
            }
            res.status(201).send('Listing added to database');
        });
    });
};

const getListingByListingName = (req,res) => {
    const listing_name = req.params.listing_name;
    DB.query(queries.getListingByListingName, [listing_name], (err,response) => {
        if(err){
            res.status(404).send('Listing not found');
        }
        res.status(200).json(result.rows)
    });
};

const getListingByBusinessID = (req,res) => {
    const business_id = parseInt(req.params.business_id);
    DB.query(queries.getListingByBusinessID, [business_id], (err,response) => {
        if(err){
            return res.status(404).send('Listing not found');
        }
        res.status(200).json(result.rows)
    });
};

const removeListingByBusinessID = (req,res) => {
    const business_id = parseInt(req.params.business_id);
    DB.query(queries.getListingByBusinessID, [business_id], (err,result) => {
        if(!(result.rows && result.rows.length)){
            res.status(404).send('Listing not found');
        }
        DB.query(queries.removeListingByBusinessID, [business.id], (err,result) => {
            if(err){
                return res.status(500).send(err.message);
            }
            res.status(200).send('Listing removed from database');
        });
    });
};

//Order_table
const getOrders = (req,res) => {
    DB.query(queries.getOrders, (err,result) => {
        if(err){
            res.status(500).send(err.message);
        }
        res.status(200).json(result.rows);
    });
};

const getOrderByID = (req,res) => {
    const order_id = parseInt(req.params.order_id);
    DB.query(queries.getOrderByID, [order_id], (err,result) => {
        if(err){
            return res.status(404).send(err.message);
        }
        res.status(200).json(result.rows);       
    });
};

const addOrder = (req,res) => {
    const {buyer_id, total_price, date, status} = req.body;
    DB.query(queries.checkifOrderExists, [buyer_id, total_price, date, status], (err, result) =>{
        if (result.rows && result.rows.length){
            return res.status(409).send('Order already exists'); //Not sure if I should have a status here
        }
        DB.query(queries.addOrder, [buyer_id, total_price, date, status], (req,res) => {
            if(err){
                return res.status(500).send(err.message);
            }
            res.status(201).send('Order has been added to database');
        });
    });
};

const removeOrder = (req,res) => {
    const order_id = parseInt(req.params.order_id);
    DB.query(queries.getOrderByID, [order_id], (err,request) => {
        if(!(result.rows && result.rows.length)){
            res.status(404).send('Order not found');
        }
        DB.query(queries.removeOrder, [order_id], (err,result) => {
            if(err){
                return res.status(500).send(err.message);
            }
            res.status(200).send('Order removed from database');
        })
    });
};

const getOrderByBuyerID = (req,res) => {
    
}