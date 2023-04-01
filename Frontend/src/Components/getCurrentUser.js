import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/Firebase";

const getCurrentUser = () => {
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
                "http://localhost:8000/buyer",
                { headers: {
                    "Content-Type": "application/json",
                    "idtoken": idToken } }
            )
        })
        .then((response) => {
            return response.data.userName;
        })
        .catch((error) => {
            return error;
        });
}

export default getCurrentUser;