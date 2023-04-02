import './Config/Firebase';

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthStateObserver from './Global/AuthStateObserver';
import Redirector from './Global/Redirector';

import LoginForm from './Components/LoginForm';
import SignUp from './Components/SignUp';
import App from './App';
import ProtectedRoute from './Components/ProtectedRoute';

import Home from './Buyer/pages/Home';

import BrowseThriftShops from './Buyer/pages/ThriftShop/BrowseThriftShops';
import BrowseProducts from './Buyer/pages/Products/BrowseProducts';
import TSDetails from './Buyer/pages/ThriftShop/ThriftShopDetails';
// import Cart from './Buyer/pages/Cart/Cart';
import Cart from './Buyer/pages/Cart/Cart2';
import Settings from './Buyer/pages/Settings/Settings';
import SavAddress from './Buyer/pages/Settings/SavedAddress';
import SavPayment from './Buyer/pages/Settings/SavedPayment';

import AddNewPayment from './Buyer/pages/Settings/AddNewPayment';
import AddNewAddress from './Buyer/pages/Settings/AddAddress';

import Profile from './Buyer/pages/Settings/Profile'
import ProductDetails from './Buyer/pages/Products/Product_Details';
// import ProductDetails from './Buyer/pages/Products/ProductDetails2';
import CheckoutPage from './Buyer/pages/Cart/Checkout_Details';

import ConfirmationPage from './Buyer/pages/Cart/ConfirmationPage';
// import SavAddress from './Buyer/pages/Settings/SavedAddress';
import PayAddress from './Buyer/pages/Settings/PayAddress';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <AuthStateObserver />
    <BrowserRouter basename={'/'}>
      
      <Routes>

        <Route path='*' element={<Redirector />} />

        <Route path='/' element={<Redirector />} />

        <Route path='/login' element={<LoginForm />} />

        <Route path='/signup' element={<SignUp />} />

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

          <Route path='/checkout' element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } />

          <Route path='/confirmationpage' element={
            <ProtectedRoute>
              <ConfirmationPage />
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

          <Route path='/payaddress' element={
            <ProtectedRoute>
              <PayAddress />
            </ProtectedRoute>
          } />
          
          {/*<Route path='/search' element={
            <ProtectedRoute>
              <SearchBar />
            </ProtectedRoute>
          } />*/}


        </Route>



      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
