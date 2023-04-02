// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8l0fmTYLAF5siKdax5-TPPo6Dq1Jx3T8",
  authDomain: "thriftit-e5d7a.firebaseapp.com",
  projectId: "thriftit-e5d7a",
  storageBucket: "thriftit-e5d7a.appspot.com",
  messagingSenderId: "953372158135",
  appId: "1:953372158135:web:b1c49b272c5f865b808532",
  measurementId: "G-FJMMCJQTQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default app;
export { auth };