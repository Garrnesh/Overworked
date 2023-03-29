//Remember to include this in routes later
const { FieldValue } = require("firebase-admin/firestore");
const { Carts, Cartitems } = require("../firebase.js");

//Cart table
const getCart = async (req,res) => {
    try{
        const cart = await Carts.get();
        res.status(200).json(cart.data());
    }catch(err){
        res.status(500).send(err.message);
    }
}

const getCartByID = async (cart_id) => {
    const cart = await Carts.doc(cart_id).get();
    if(cart.exists){
        return cart;
    }else{
        throw new Error("Cart does not exist");
    }
};

const checkCartID = async (cart_id) => {
    try{
        const cart = await Carts.doc(cart_id).get();
        if(cart.exists){
            throw new Error("Cart with cart id already exists");
        }
    }catch(err){
        throw new Error("Cart with cart id already exists");
    }
};

const addCart = async (cart_id, buyer_username) => {
    const cart = Carts.doc(cart_id);
    try{
        await cart.set({
            buyer_username: buyer_username,
        });
    }catch(err){
        throw new Error("Unable to create new cart");
    }
};

const removeCart = async (cart_id) => {
    try{
        await Carts.doc(cart_id).delete();
    }catch(err){
        throw new Error("Unable to delete order");
    }
};

const getCartByBuyerUsername = async(buyer_username) => {
    const cart = await Carts.where('buyer_Id', '==', buyer_username).get();
    if(cart.length>0){
        return cart;
    }else{
        throw new Error("No cart with stated buyer ID");
    }
}

const removeCartByBuyerUsername = async(buyer_username) => {
    try{
        await Orders.where("buyer_username", "==", buyer_username).delete();
    }catch(err){
        throw new Error("Unable to delete cart");
    }
}

//Cartitem table
const getCartItems = async (req,res) => {
    try{
        const cartitem = await Cartitems.get();
        res.status(200).json(cartitem.data());
    }catch(err){
        res.status(500).send(err.message);
    }
}

const getCartItemByID = async (cartitem_id) => {
    const cartitem = await Cartitems.doc(cartitem_id).get();
    if(cartitem.exists){
        return cartitem;
    }else{
        throw new Error("Cart Item does not exist");
    }
};

const checkCartItemID = async (cartitem_id) => {
    try{
        const cartitem = await Cartitems.doc(cartitem_id).get();
        if(cartitem.exists){
            throw new Error("Cart item with Cart Item ID already exists");
        }
    }catch(err){
        throw new Error("Cart item with Cart Item ID already exists")
    }
}

const addCartItem = async (cartitem_id, cart_id, product_id, quantity) => {
    const cartitem = Cartitems.doc(cartitem_id);
    try{
        await cartitem.set({
            cart_id: cart_id, 
            product_id: product_id,
            quantity: quantity
        });
    }catch(err){
        throw new Error("Unable to create new Cart item");
    }
};

const removeCartItem = async (cartitem_id) => {
    try{
        await Cartitems.doc(cartitem_id).delete();
    }catch(err){
        throw new Error("Unable to delete cart item");
    }
};

const getCartItemByCartId = async(cart_id) => {
    const cartitem = await Cartitems.where('cart_id', '==', cart_id).get();
    if(cartitem.length>0){
        return cartitem;
    }else{
        throw new Error("No order item with stated Cart item ID");
    }
}

const removeCartItemByCartID = async (cart_id) => {
    try{
        await Cartitems.where("cart_id", "==", cart_id).delete();
    }catch(err){
        throw new Error("Unable to delete cart item with specified cart ID")
    }
}

module.exports = {
    getCart,
    getCartByID,
    checkCartID,
    addCart,
    removeCart,
    getCartByBuyerUsername,
    removeCartByBuyerUsername,
    getCartItems,
    getCartItemByID,
    checkCartItemID,
    addCartItem,
    removeCartItem,
    getCartItemByCartId,
    removeCartItemByCartID,
}