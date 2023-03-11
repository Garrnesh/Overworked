import admin from "firebase-admin"
var admin = require("firebase-admin");

var serviceAccount = require("./key/service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const authorisation = admin.auth();
const db = getFirestore();

const Buyers = collection(db, 'Buyers');
const Business = collection(db, 'Business');
const Payments = collection(db, 'Payments');
const Shops = collection(db, 'Shops');
const Products = collection(db, 'Products');
const Listings = collection(db, 'Listings');
const Orders = collection(db, 'Orders');
const Orderitems = collection(db, 'OrderItems');

module.exports = {
    authorisation,
    db,
    Buyers,
    Business,
    Payments,
    Shops,
    Products,
    Listings,
    Orders,
    Orderitems,
};
