
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {

    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") === "true");

    useEffect(() => {
        setAuthenticated(localStorage.getItem("authenticated") === "true");
    }, []);

    console.log("ProtectedRoute.js - authenticated: ", authenticated);

    return (
        <React.Fragment>
            {
                authenticated ? props.children : <Navigate to="/login" />
            }
        </React.Fragment>
    );
}

export default ProtectedRoute;