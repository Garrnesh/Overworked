//Product_table
const getProducts  = "SELECT * FROM product_table";
const getProductByID = "SELECT * FROM product_table WHERE product_id = $1";
const addProduct = "INSERT INTO product_table (product_id, listing_id, product_image, product_description, product_brand, product_size) VALUES (DEFAULT, $1, $2, $3, $4, $5)";
const removeProduct = "DELETE FROM product_table WHERE product_id = $1";
const getProductByListingID = "SELECT * FROM product_table WHERE listing_id = $1";
const removeProductByListingID = "DELETE FROM product_table WHERE listing_id = $1";
const getProductByProductType = "SELECT * FROM product_table WHERE product_type = $1";

//Listing_table
const getListings = "SELECT * FROM listing_table";
const getListingByID = "SELECT * FROM listing_table where listing_id = $1";
const removeListing = "DELETE FROM listing_table WHERE listing_id = $1";
const addListing = "INSERT INTO listing_table (listing_id, business_id, listing_name) VALUES (DEFAULT, $1, $2)";
const getListingByListingName = "SELECT * FROM listing_table WHERE listing_name = $1";
const getListingByBusinessID = "SELECT * FROM listing_table WHERE business_id = $1";
const removeListingByBusinessID = "DELECT FROM listing_table WHERE business_id = $1";

//Order_table
const getOrders = "SELECT * FROM order_table";
const getOrderByID = "SELECT * FROM order_table WHERE order_id = $1";
const addOrder = "INSERT INTO order_table (order_id, buyer_id, total_price, date, status) VALUES (DEFAULT, $1, $2, $3, $4)";
const removeOrder = "DELETE FROM order_table WHERE order_id = $1";
const getOrderByBuyerID = "SELECT * FROM order_table WHERE buyer_id = $1";

//OrderItem_table

const getOrderItems = "SELECT * FROM orderitem_table";
const getOrderItemByID = "SELECT * FROM orderitem_table WHERE orderitem_id = $1";
const addOrderItem = "INSERT INTO orderitem_table (orderitem_id, order_id, product_id, quantity) VALUES (DEFAULT, $1, $2, $3)";
const getOrderItemByOrderID = "SELECT * FROM orderitem_table WHERE order_id = $1";
const removeOrderItem = "DELETE FROM orderitem_table WHERE orderitem_id = $1";
const removeOrderItemByOrderID = "DELETE FROM orderitem_table WHERE order_id = $1";

module.exports = {
    getProducts,
    getProductByID,
    addProduct,
    removeProduct,
    getProductByListingID,
    removeProductByListingID,
    getProductByProductType,
    getListings,
    getListingByID,
    removeListing,
    addListing,
    getListingByListingName,
    getListingByBusinessID,
    removeListingByBusinessID,
    getOrders,
    getOrderByID,
    addOrder,
    removeOrder,
    getOrderByBuyerID,
    getOrderItems,
    getOrderItemByID,
    addOrderItem,
    getOrderItemByOrderID,
    removeOrderItem,
    removeOrderItemByOrderID,
};