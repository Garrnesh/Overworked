import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hash } from "react-bootstrap-icons";
import { GeoAlt } from "react-bootstrap-icons";

const AddAddress = () => {
    const [buyer_username, setusername] = useState(localStorage.getItem('username'));
    const [postal_code, setPincode] = useState('');
    const [address_str, setTxtaddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const address = { buyer_username, address_str, postal_code};
        console.log(address);
        fetch('http://localhost:8000/address/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(address)
        }).then(() => {
            //navigate(); //will have to edit this later
        })
    }

  return (
    <div className="border p-5 mb-5 container-sm">
        <div className="text-center mb-2">
            <h1>New Address</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
                <h2 className="lead display-sm fw-bold">Contact Details</h2>
            </div>
    
            <div className="mt-4">
                <h2 className="lead display-sm fw-bold">Address Details</h2>
            </div>
            <div className="justify-content-around">
                <div className ="border border-black p-2">
                    <div className="row justify-content-center">
                        <div className="col text-center">
                            <label htmlFor="postal_code" className="form-label"></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <Hash/>
                                </span>
                                <input type="number" className="form-control" id="postal_code" placeholder="Enter Pin Code" required value={postal_code} onChange = {(e) => setPincode(e.target.value)}/>
                            </div>
                            <label htmlFor="address" className="form-label"></label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <GeoAlt/>
                                </span>
                                <input type="text" className="form-control" id="address" placeholder="Address(House No, Building, Street, Area)" required value={address_str} onChange = {(e) => setTxtaddress(e.target.value)}/>
                            </div>
                            
                        </div>
                    </div>
                </div>   
            </div>
            
            <div className= "mt-5 text-center">
                <button className= "btn btn-outline-primary justify-content-center">
                    Add Address
                </button>
            </div>
        </form>
        
    </div>
  );
}
 
export default AddAddress;