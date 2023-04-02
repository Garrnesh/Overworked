import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/Firebase";
import axios from "axios";

const getCurrentUser = async () => {
    // If the user is not signed in, return null
    if (localStorage.getItem("authenticated") !== "true") {
        return null;
    }
    while (auth.currentUser === null) {
        // Wait for user to be authenticated, this is to prevent late loading of user data on page load
    }
    const user = auth.currentUser;
    // Get username from backend
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
            return response.data.userName;
        })
        .catch((error) => {
            return null;
        });
}

export default getCurrentUser;