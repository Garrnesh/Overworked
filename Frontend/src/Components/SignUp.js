import { useState } from "react";
import axios from "axios";

import { auth } from "../Config/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// import thriftCrop from './thriftCrop.png';
// import logo from './thriftitlogo.png';
import { PersonCircle } from "react-bootstrap-icons";
import { Envelope } from "react-bootstrap-icons";
import { Telephone } from "react-bootstrap-icons";
import { Lock } from "react-bootstrap-icons";
import { CheckCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setCPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const account = { userName, emailId, mobilenumber, password};
        console.log(account);

        // Check if username already exists
        axios.get("http://localhost:8000/buyer/isusernameunique/" + userName)
            .then((response) => {
                if (response.status === 200) {
                    return;
                }
                else {
                    throw new Error("Username already exists");
                }
            })
            .then(() => {
                return createUserWithEmailAndPassword(auth, emailId, password);
            })
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                // Make http request to backend to store username and phone number
                return user.getIdToken(false)
            })
            .then((idToken) => {
                return axios.post(
                    "http://localhost:8000/buyer",
                    {   "userName": userName,
                        "phoneNumber": mobilenumber },
                    { headers: { 
                        "Content-Type": "application/json",
                        "idtoken": idToken } } 
            )})
            .then((response) => {
                navigate("/home");
            })
            .catch((error) => {
                console.log(error);
                setMessage("Error: " + error);
            });
    }

  return (
    <div className="signup">
        <div className="text-center my-5">
        <h1 className="title">Sign Up to be ThriftIt member</h1>

        {/* <h1 className="title"><img src={logo} className="img-responsive" height="144" /></h1> */}
        </div>

        <div className="container-lg">
            <div className="text-center">
                <h2>User Signup</h2>
            </div>
      
            <form className="row justify-content-center" onSubmit={handleSubmit}>
                <div className="col-lg-6">
            
                    <label htmlFor = "username" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <PersonCircle/>
                        </span>
                        <input type="username" className = "form-control" id = "username" placeholder = "Enter username" required value={userName} onChange = {(e) => setUserName(e.target.value)}/>
                    </div>

            
                    <label htmlFor = "emailaddress" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Envelope/>
                        </span>
                        <input type="emailaddress" className = "form-control" id = "emailaddress" placeholder = "Enter email address" required value={emailId} onChange = {(e) => setEmailId(e.target.value)}/>
                    </div>
            
                    <label htmlFor = "mobilenumber" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Telephone/>
                        </span>
                        <input type="mobilenumber" className = "form-control" id = "mobilenumber" placeholder = "Enter mobile number" required value={mobilenumber} onChange = {(e) => setMobilenumber(e.target.value)}/>
                    </div>
            
                    <label htmlFor = "password" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Lock/>
                        </span>
                        <input type="password" className = "form-control" id = "password" placeholder = "Enter password" required value={password} onChange = {(e) => setPassword(e.target.value)}/>
                    </div>
            
                    <label htmlFor = "confirmpassword" className="form-label"></label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text">
                            <CheckCircle/>
                        </span>
                        <input type="password" className = "form-control" id = "confirmpassword" placeholder = "Re-enter password" required value={confirmpassword} onChange = {(e) => setCPassword(e.target.value)}/>
                    </div>

                    { password===confirmpassword && <button className="d-grid gap-2 col-6 mx-auto justify-content-center btn btn-outline-success btn-lg btn-block" value = "Signup">
                        Signup
                    </button>}
                    
                </div>
            </form>
            {message && (
                 <div className="error"> {message} </div>
            )}
        </div>
    </div>
  );
}
 
export default SignUp;