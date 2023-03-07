import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA8l0fmTYLAF5siKdax5-TPPo6Dq1Jx3T8",
    authDomain: "thriftit-e5d7a.firebaseapp.com",
    projectId: "thriftit-e5d7a",
    storageBucket: "thriftit-e5d7a.appspot.com",
    messagingSenderId: "953372158135",
    appId: "1:953372158135:web:b1c49b272c5f865b808532",
    measurementId: "G-FJMMCJQTQ0"
  };

initializeApp(firebaseConfig);
const db = getFirestore();

const products = collection(db, 'Products');
const listings = collection(db, 'Listings');
const orders = collection(db, 'Orders');
const orderitems = collection(db, 'OrderItems');

module.exports = {
    db,
    products,
    listings,
    orders,
    orderitems,
};



