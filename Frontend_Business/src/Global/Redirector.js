import React, {useEffect, useState} from "react";

import { Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Redirector = () => {
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") === "true");
    useEffect(() => {
        setAuthenticated(localStorage.getItem("authenticated") === "true");
    }, []);

    const navigate = useNavigate();

    if (authenticated) {
        return <Navigate to="/home" />;
    }
    else {
        return <Navigate to="/login" />;
    }
}

export default Redirector;