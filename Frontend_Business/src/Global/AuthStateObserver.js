import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/Firebase";
import axios from "axios";
//import { useNavigate, Navigate } from "react-router-dom";

const AuthStateObserver = () => {

    onAuthStateChanged(auth, (user) => {

    if (user) {
        // Set authenticated state
        if (localStorage.getItem("username") === undefined) {
            // Set username
            user.getIdToken(false).then((idToken) => {
                axios.get(
                    "http://localhost:8000/business",
                    { headers: {
                        "Content-Type": "application/json",
                        "idtoken": idToken } }
                ).then((response) => {
                    localStorage.setItem("username", response.data.userName);
                    console.log("Username updated");
                }).catch((error) => {
                    console.log(error);
                });
            });
        }
        localStorage.setItem("authenticated", true);
        console.log("User is signed in");
    } else {
        // Set unauthenticated state
        localStorage.setItem("authenticated", false);
        localStorage.removeItem("username");
        console.log("User is signed out");
    }
    });
    return null;
}

export default AuthStateObserver;