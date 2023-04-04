import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/Firebase";
//import { useNavigate, Navigate } from "react-router-dom";

const AuthStateObserver = () => {

    onAuthStateChanged(auth, (user) => {

    if (user) {
        // Set authenticated state
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