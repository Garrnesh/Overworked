import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PortalNavbar from "./Buyer/Navbar";

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