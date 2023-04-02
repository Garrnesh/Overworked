// import LoggedIn from "./Components/LoggedIn";
// import LoginForm from "./Components/LoginForm";
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./Buyer/pages/Home/Home";
// import PortalNavbar from "./Buyer/Navbar";
// import { Outlet } from "react-router-dom";
// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <>
//       {isLoggedIn ? (
//         <LoggedIn setIsLoggedIn={setIsLoggedIn} />
//       ) : (
//         <LoginForm setIsLoggedIn={setIsLoggedIn} />
//       )}
//     </>

//   );
// }

// export default App;

import { Outlet } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Buyer/pages/Products/BrowseProducts";
import ProductDetails from "./Buyer/pages/Products/Product_Details";
import BrowseThriftShops from "./Buyer/pages/ThriftShop/BrowseThriftShops";
import SearchBarSection from "./Buyer/pages/SearchClothes/SearchBarSection";
import SearchBar from "./Buyer/pages/SearchClothes/SearchClothes";
import TSDetails from "./Buyer/pages/ThriftShop/ThriftShopDetails";
import Settings from "./Buyer/pages/Settings/Settings";
import Profile from "./Buyer/pages/Settings/Profile";
import SavAddress from "./Buyer/pages/Settings/SavedAddress";
import SavPayment from "./Buyer/pages/Settings/SavedPayment";
import AddNewPayment from "./Buyer/pages/Settings/AddNewPayment";
import AddNewAddress from "./Buyer/pages/Settings/AddAddress";
import SignUp from "./Components/SignUp";
import Cart from "./Buyer/pages/Cart/Cart";
import PortalNavbar from "./Buyer/Navbar";
import { Navigate } from "react-router-dom";

function App() {
  const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") === "true");
  // May need to change this to useEffect, idk lemme test first
  // I want authenticated to change every time the localStorage["authenticated"] changes
  useEffect(() => {
    setAuthenticated(localStorage.getItem("authenticated") === "true");
  }, []);

  console.log("App.js - authenticated: ", authenticated);

  return(
    <React.Fragment>
      {authenticated && <PortalNavbar />}
      <Outlet />
    </React.Fragment>
  )


}

export default App;
