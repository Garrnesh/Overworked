import { Link } from "react-router-dom";
import { useState } from "react";
import thriftCrop from './thriftCrop.png';
import { PersonCircle } from "react-bootstrap-icons";
import { Envelope } from "react-bootstrap-icons";
import { Telephone } from "react-bootstrap-icons";
import { Lock } from "react-bootstrap-icons";
import { CheckCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { GeoAlt } from "react-bootstrap-icons";
import { Mailbox } from "react-bootstrap-icons";
import { Hash } from "react-bootstrap-icons";

import { auth } from "./Config/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

import axios from "axios";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


const BizSignUp = () => {
    const [userName, setUserName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setCPassword] = useState('');
    const [bizAddress, setbizAddress] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [UenNumber, setUenNumber] = useState('');
    const [bizDescription, setbizDescription] = useState('');
    const [donation, setDonation] = useState(false);

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const business = { 
            userName: String(userName), 
            shopDesc: String(bizDescription), 
            shopAddr: String(bizAddress),
            postalCode: String(postalCode), 
            uen: String(UenNumber), 
            phoneNumber: String(mobilenumber),
            donation: String(donation)
        };
        console.log(business);

        createUserWithEmailAndPassword(auth, emailId, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                return user.getIdToken(true);
            })
            .then((idtoken) => {
                /*fetch('http://localhost:8000/business', {
                    method: 'POST',
                    headers: { 
                        "Content-Type": "application/json",
                        "idtoken": idtoken },
                    body: JSON.stringify(business)
                });*/
                console.log(idtoken);
                return axios.post(
                    'http://localhost:8000/business', 
                    JSON.stringify(business), 
                    { headers: { 
                        "Content-Type": "application/json",
                        "idtoken": idtoken }
                    }
                );
            })
            .then ((response) => {
                setError(null);
                localStorage.setItem("authenticated", true);
                localStorage.setItem("username", userName);
                navigate("/viewlisting");
            })
            .catch((error) => {
                setError(error.response.data);

                console.log(error);
            });
    }
  return (
    <div className="BizSignUp">
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="text-center my-5">
            <img src= {thriftCrop} className = "img-responsive" height = "72"/>
        </div>

        <div className="container-lg">
            <div className="text-center">
                <h2>Business Signup</h2>
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

                    <div className ="form-floating mt-1">
                        <textarea id = "businessdescription" className = "form-control" required value={bizDescription} onChange = {(e) => setbizDescription(e.target.value)}></textarea>
                        <label htmlFor="businessdescription" className ="form-label">Enter business description</label>
                    </div>

                    <label htmlFor = "address" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <GeoAlt/>
                        </span>
                        <input type="text" className = "form-control" id = "address" placeholder = "Enter Business Address" required value={bizAddress} onChange = {(e) => setbizAddress(e.target.value)}/>
                    </div>

                    <label htmlFor = "postalCode" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Mailbox/>
                        </span>
                        <input type="text" className = "form-control" id = "postalCode" placeholder = "Enter Postal Code" required value={postalCode} onChange = {(e) => setpostalCode(e.target.value)}/>
                    </div>

                    <label htmlFor = "UENnumber" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Hash/>
                        </span>
                        <input type="text" className = "form-control" id = "UENnumber" placeholder = "Enter UEN Number" required value={UenNumber} onChange = {(e) => setUenNumber(e.target.value)}/>
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

                    <label htmlFor="category" className="form-label mt-3">Are you a Donation Point?</label>
                    <div className="mt-1 container">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" required value={donation} onChange = {() => setDonation("True")}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                True
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" required value={donation} onChange = {() => setDonation("False")}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                False
                            </label>
                        </div>
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
        </div>
    </div>
  );
}
 
export default BizSignUp;