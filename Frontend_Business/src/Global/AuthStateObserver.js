import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/Firebase";
import axios from "axios";
//import { useNavigate, Navigate } from "react-router-dom";

const AuthStateObserver = async () => {

    onAuthStateChanged(auth, async (user) => {

    if (user) {
        // Set authenticated state
        try {
            const idToken = await user.getIdToken(false);
            const response = await axios.get(
                    "http://localhost:8000/business",
                    { headers: {
                        "Content-Type": "application/json",
                        "idtoken": idToken } }
                )
            localStorage.setItem("authenticated", true);
            localStorage.setItem("username", response.data.userName);
            console.log("Username updated");
            console.log("User " + localStorage.getItem("username") + " is signed in");
        } catch (error) {
            console.log(error);
        }
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