import { FieldValue } from "firebase-admin/firestore";
import { Buyers, Business, Payments, Shops, Products, Listings, Orders, Orderitems } from "../firebase.js";

//Product_table
const getproducts = async (req,res) => {
    try{
        const product = await Products.get();
        res.status(200).json(product.data());
    }catch(err){
        res.status(500).send(err.message);
    }
};

const getProductByID = async (product_id) => {
    const product = await Products.doc(product_id).get();
    if(product.exists){
        return product.data();
    }else{
        throw new Error("Product does not exist");
    }
};

const addProduct = async (product_id, listing_id, product_image, product_description, product_brand, product_size) => {
    const product = Products.doc(product_id);
    try{
        await product.set(listing_id, product_image, product_description, product_brand, product_size);
    }catch(err){
        throw new Error("Unable to create new product");
    }
};

const removeProduct = async (product_id) => {
    try{
        await Products.doc(product_id).delete();
    }catch(err){
        throw new Error("Unable to delete product");
    }
};

const getProductByListingID = async(listing_id)


// const getProductByListingID = (req,res) => {
//     const listing_id = parseInt(req.params.listing_id);
//     DB.query(queries.getProductByListingID, [listing_id], (err,result) => {
//         if(err){
//             return res.staus(404).send(err.message);
//         }
//         res.status(200).json(result.rows);
//     });
// };

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