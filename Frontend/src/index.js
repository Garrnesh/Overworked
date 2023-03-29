// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import LoginForm from './Components/LoginForm';
// import Dashboard from './Buyer/pages/Home/Dashboard';
// import Home from './Buyer/pages/Home/Home';
// import ProductDetails from './Buyer/pages/Home/ProductDetails2';
// import BrowseThriftShops from './Buyer/pages/ThriftShop/BrowseThriftShops';
// import SearchBarSection from './Buyer/pages/SearchClothes/SearchBarSection';
// import SearchBar from './Buyer/pages/SearchClothes/SearchClothes';
// import TSDetails from './Buyer/pages/ThriftShop/ThriftShopDetails';
// import Settings from './Buyer/pages/Settings/Settings';
// import Profile from './Buyer/pages/Settings/Profile';
// import SavAddress from './Buyer/pages/Settings/SavedAddress';
// import SavPayment from './Buyer/pages/Settings/SavedPayment';
// import AddNewPayment from './Buyer/pages/Settings/AddNewPayment';
// import AddNewAddress from './Buyer/pages/Settings/AddAddress';
// import SignUp from './Components/SignUp';
// import Cart from './Buyer/pages/Cart/Cart';
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route index element={<App />} />
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="dashboard" element={<Dashboard />} />
//         {/* Home Page that displays random clothes  */}
//         <Route path="/home" element={<Home />} />
//         {/* When click on PRODUCTS CARD -> Direct to Product Info */}
//         <Route path="products/:id" element={<ProductDetails />} />

//         {/* Browse Thrift Shops */}
//         <Route path="/thriftshops" element={<BrowseThriftShops />} />
//         {/* When click on TS CARD -> Direct to TS Info */}
//         <Route path="thriftshops/:id" element={<TSDetails />} />

//         <Route path="/search" element={<SearchBar />} />

//         <Route path="/settings" element={<Settings />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/address" element={<SavAddress />} />
//         <Route path="/payment" element={<SavPayment />} />
//         <Route path="/addnewpayment" element={<AddNewPayment />} />
//         <Route path="/addnewaddress" element={<AddNewAddress />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/signup" element={<SignUp />} />

//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// Firebase config file, in
import './Config/Firebase';

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthStateObserver from './Global/AuthStateObserver';
import Redirector from './Global/Redirector';

import LoginForm from './Components/LoginForm';
import App from './App';
import ProtectedRoute from './Components/ProtectedRoute';
// import Home from './Buyer/pages/Products/BrowseProducts';
import Home from './Buyer/pages/Home';
import BrowseThriftShops from './Buyer/pages/ThriftShop/BrowseThriftShops';
import BrowseProducts from './Buyer/pages/Products/BrowseProducts';
import TSDetails from './Buyer/pages/ThriftShop/ThriftShopDetails';
import SearchBar from './Buyer/pages/SearchClothes/SearchClothes';
import Cart from './Buyer/pages/Cart/Cart';
import Settings from './Buyer/pages/Settings/Settings';
import SavAddress from './Buyer/pages/Settings/SavedAddress';
import SavPayment from './Buyer/pages/Settings/SavedPayment';
import AddNewPayment from './Buyer/pages/Settings/AddNewPayment';
import AddNewAddress from './Buyer/pages/Settings/AddAddress';
import Profile from './Buyer/pages/Settings/Profile';
import ProductDetails from './Buyer/pages/Products/Product_Details';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <AuthStateObserver />
    <BrowserRouter basename={'/'}>
      
      <Routes>

        <Route path='*' element={<Redirector />} />

        <Route path='/login' element={<LoginForm />} />

        <Route path="/" element={<App />}>
          <Route path='/home' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/thriftshops' element={
            <ProtectedRoute>
              <BrowseThriftShops />
            </ProtectedRoute>
          } />

          <Route path='/thriftshops/:id' element={
            <ProtectedRoute>
              <TSDetails />
            </ProtectedRoute>
          } />

          <Route path='/cart' element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />

          <Route path='/settings' element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />

          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />

          <Route path='/address' element={
            <ProtectedRoute>
              <SavAddress />
            </ProtectedRoute>
          } />

          <Route path='/payment' element={
            <ProtectedRoute>
              <SavPayment />
            </ProtectedRoute>
          } />

          <Route path='/addnewpayment' element={
            <ProtectedRoute>
              <AddNewPayment />
            </ProtectedRoute>
          } />

          <Route path='/addnewaddress' element={
            <ProtectedRoute>
              <AddNewAddress />
            </ProtectedRoute>
          } />

          <Route path='/products' element={
            <ProtectedRoute>
              <BrowseProducts />
            </ProtectedRoute>
          } />

          <Route path='/products/:id' element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          } />

          <Route path='/search' element={
            <ProtectedRoute>
              <SearchBar />
            </ProtectedRoute>
          } />


        </Route>



      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
