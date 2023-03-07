import admin from "firebase-admin"
var admin = require("firebase-admin");

var serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const authorisation = admin.auth();
const db = getFirestore();

const buyers = collection(db, 'Buyers');
const business = collection(db, 'Business');
const payments = collection(db, 'Payments');
const shops = collection(db, 'Shops');
const products = collection(db, 'Products');
const listings = collection(db, 'Listings');
const orders = collection(db, 'Orders');
const orderitems = collection(db, 'OrderItems');

module.exports = {
    authorisation,
    db,
    buyers,
    business,
    payments,
    shops,
    products,
    listings,
    orders,
    orderitems,
};



