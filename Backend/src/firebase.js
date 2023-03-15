const admin = require("firebase-admin");
// var admin = require("firebase-admin");

var serviceAccount = require("./key/service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const authorisation = admin.auth();
const db = admin.firestore();
// const db = getFirestore();

const Buyers = db.collection('Buyers');
const Business = db.collection('Business');
const Payments = db.collection('Payments');
const Shops = db.collection('Shops');
const Products = db.collection('Products');
const Orders = db.collection('Orders');
const Orderitems = db.collection('OrderItems');

module.exports = {
    authorisation,
    db,
    Buyers,
    Business,
    Payments,
    Shops,
    Products,
    Orders,
    Orderitems,
};
