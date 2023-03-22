import { Link } from "react-router-dom";
import { useState } from "react";
import thriftCrop from './thriftCrop.png';
import { Lock } from "react-bootstrap-icons";
import { CheckCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Password = () => {
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setCPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        
        console.log("hello");
        
    }
  return (
    <div className="signup">
        <div className="text-center my-5">
            <img src= {thriftCrop} className = "img-responsive" height = "72"/>
        </div>

        <div className="container-lg">
            <div className="text-center">
                <h2>Change Password</h2>
            </div>
      
            <form className="row justify-content-center" onSubmit={handleSubmit}>
                <div className="col-lg-6">
            
                    <label htmlFor = "oldpassword" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Lock/>
                        </span>
                        <input type="password" className = "form-control" id = "oldpassword" placeholder = "Enter old password" required value={oldpassword} onChange = {(e) => setOldPassword(e.target.value)}/>
                    </div>

                    <label htmlFor = "newpassword" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Lock/>
                        </span>
                        <input type="password" className = "form-control" id = "newpassword" placeholder = "Enter new password" required value={newpassword} onChange = {(e) => setNewPassword(e.target.value)}/>
                    </div>
            
                    <label htmlFor = "confirmpassword" className="form-label"></label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text">
                            <CheckCircle/>
                        </span>
                        <input type="password" className = "form-control" id = "confirmpassword" placeholder = "Re-enter new password" required value={confirmpassword} onChange = {(e) => setCPassword(e.target.value)}/>
                    </div>

                    { newpassword==confirmpassword && <button className="d-grid gap-2 col-6 mx-auto justify-content-center btn btn-outline-success btn-lg btn-block" value = "Signup">
                        Signup
                    </button>}
                    
                </div>
            </form>
        </div>
    </div>
  );
}
 
export default Password;