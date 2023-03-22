import { Link } from "react-router-dom";
import { useState } from "react";
import thriftCrop from './thriftCrop.png';
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
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const account = { userName, emailId, mobilenumber, password};
        console.log(account);
        fetch('http://localhost:8000/accounts/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(account)
        }).then(() => {
            navigate('/login'); //will have to edit this later
        })
    }
  return (
    <div className="signup">
        <div className="text-center my-5">
            <img src= {thriftCrop} className = "img-responsive" height = "72"/>
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

                    { password==confirmpassword && <button className="d-grid gap-2 col-6 mx-auto justify-content-center btn btn-outline-success btn-lg btn-block" value = "Signup">
                        Signup
                    </button>}
                    
                </div>
            </form>
        </div>
    </div>
  );
}
 
export default SignUp;