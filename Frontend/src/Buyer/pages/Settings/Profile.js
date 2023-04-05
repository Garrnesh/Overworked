import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// import thriftCrop from './thriftCrop.png';
import { PersonCircle } from "react-bootstrap-icons";
import { Envelope } from "react-bootstrap-icons";
import { Telephone } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

// Firebase authentication imports
import { auth } from "../../../Config/Firebase";
import { onAuthStateChanged, updateEmail, EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword } from "firebase/auth";

const Profile = () => {
    const [userName, setUserName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    //const [password, setPassword] = useState('');
    //const [confirmpassword, setCPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [halt, setHalt] = useState(false);

    const in_d_email = useRef();
    const in_d_password = useRef();

    const in_email = useRef();
    const in_mobile = useRef();

    const navigate = useNavigate();

    console.log(auth.currentUser);
    // Init input fields with current user data after authentication is complete
    if (((userName === '') || (emailId === '')) || (mobileNumber === '')) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmailId(user.email);
                console.log("onAuthStateChanged in Profile.js fired");
                // Get mobile number from backend
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
                        setUserName(response.data.userName);
                        setMobileNumber(response.data.phoneNumber);
                    })
                    .catch((error) => {
                        if (error.response) {
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        }
                        else {
                            console.log(error);
                        }
                    });
                unsubscribe();
            }
        });
    }

    const handleDialogCancel = () => {
        setOpen(false);
    }

    const handleDialogSubmit = () => {
        // Get the values from the inputs
        const final_email = in_d_email.current.value;
        const final_password = in_d_password.current.value;

        const newEmail = in_email.current.value;

        console.log(final_email + " " + final_password);
        // Create credential
        const credential = EmailAuthProvider.credential(final_email, final_password);

        // Reauthenticate user by re-login
        reauthenticateWithCredential(auth.currentUser, credential)
            .then(() => {
                // Signed in
                updateEmail(auth.currentUser, newEmail)
            })
            .then(() => {
                setEmailId(newEmail);
                console.log("Email updated, new email: " + newEmail);
            })
            .catch((error) => {
                console.log(error);
            });

        setOpen(false);
        setHalt(false);
    }
    // Init message
    //const [message, setMessage] = useState('');

    const checkInputs = (emailId, mobileNumber) => {
        // Check if all inputs are valid
        if (emailId === '') {
            //setMessage('Please enter a valid email address');
            return false;
        }
        if (mobileNumber === '') {
            //setMessage('Please enter a valid mobile number');
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Get the values from the inputs
        const final_email = in_email.current.value;
        const final_mobile = in_mobile.current.value;

        if (!checkInputs(final_email, final_mobile)) {
            return;
        }
        
        // Reauthenticate user if email is changed
        if (final_email !== emailId) {
            setHalt(true);
            setOpen(true);
        }

        while (halt) {}

        // Update phone number in backend
        if (final_mobile !== mobileNumber) {
            auth.currentUser.getIdToken(false)
                .then((idToken) => {
                    return axios.post(
                        "http://localhost:8000/buyer",
                        {   "userName": userName,
                            "phoneNumber": final_mobile },
                        { headers: { 
                            "Content-Type": "application/json",
                            "idtoken": idToken } } 
                    )
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        setMobileNumber(final_mobile);
                        console.log("Mobile number updated");
                    }
                    //setMessage(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    //setMessage(error);
                });
        }
    }


  return (
    <div className="signup">
        {/* <div className="text-center my-5">
            <img src= {thriftCrop} className = "img-responsive" height = "72"/>
        </div> */}
        <div>
            <Dialog open={open} onClose={handleDialogCancel}>
            <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Pleae re-login to continue
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="d_email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        inputRef={in_d_email}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="d_password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        inputRef={in_d_password}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogCancel}>Cancel</Button>
                    <Button onClick={handleDialogSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
        <div className="container-lg mt-3">
            <div className="text-center">
                <h2>Edit Personal Details</h2>
                <h5 className = "fw-light">Edit any one of the fields</h5>
            </div>
      
            <form className="row justify-content-center" onSubmit={handleSubmit}>
                <div className="col-lg-6">
            
                    <label htmlFor = "emailaddress" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Envelope/>
                        </span>
                        <input type="emailaddress" className = "form-control" id = "emailaddress" placeholder = "Enter email address" required defaultValue={emailId} ref={in_email} />
                    </div>
            
                    <label htmlFor = "mobilenumber" className="form-label"></label>
                    <div className="input-group mb-4">
                        <span className="input-group-text">
                            <Telephone/>
                        </span>
                        <input type="mobilenumber" className = "form-control" id = "mobilenumber" placeholder = "Enter mobile number" required defaultValue={mobileNumber} ref={in_mobile} />
                    </div>
            
                    
                    <button className="d-grid gap-2 col-6 mx-auto justify-content-center btn btn-outline-success btn-lg btn-block" value = "Signup">
                        Save Details
                    </button>

                    
                </div>
            </form>
            <div className="text-center mt-4" id="messageContainer" />
        </div>
    </div>
  );
}
 
export default Profile;