import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/Firebase";
import axios from "axios";
//import { useNavigate, Navigate } from "react-router-dom";

const AuthStateObserver = () => {

    onAuthStateChanged(auth, (user) => {

    if (user) {
        // Set authenticated state
        localStorage.setItem("authenticated", true);
        user.getIdToken(false)
        .then((idToken) => {
            return axios.get(
                "http://localhost:8000/business",
                { headers: {
                    "Content-Type": "application/json",
                    "idtoken": idToken } }
            )
        })
        .then((response) => {
            localStorage.setItem("username", response.data.userName);
        })
        .catch((error) => {
            console.log(error);
        });
        console.log("User " + localStorage.getItem("username") + " is signed in");
    } else {
        // Set unauthenticated state
        localStorage.setItem("authenticated", false);
        localStorage.setItem("username", null);
        console.log("User is signed out");
    }
    });
    return null;
}

export default AuthStateObserver;