// const admin = require("firebase-admin");
var admin = require("firebase-admin");

var serviceAccount = require("./key/service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();
const db = admin.firestore();
// const db = getFirestore();

const Buyers = db.collection('Buyers');
const Business = db.collection('Business');
const Payments = db.collection('Payments');
const Shops = db.collection('Shops');
const Products = db.collection('Products');
const Orders = db.collection('Orders');
const Orderitems = db.collection('OrderItems');
const Carts = db.collection('Carts');
const Cartitems = db.collection('Cartitems');
const Locations = db.collection('Locations');
const Address = db.collection('Address');

module.exports = {
    auth,
    db,
    Buyers,
    Business,
    Payments,
    Shops,
    Products,
    Orders,
    Orderitems,
    Carts,
    Cartitems,
    Locations,
    Address,
};
