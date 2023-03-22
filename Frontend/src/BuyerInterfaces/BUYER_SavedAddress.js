import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";


const SavAddress = () => {
    const [Name, setName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [pincode, setPincode] = useState('');
    const [txtaddress, setTxtaddress] = useState('');
    const [locality, setLocality] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const { data: addresses, isPending, error } = useFetch('http://localhost:8001/addresses');


    const handleClick = (id) => {
        fetch('http://localhost:8001/addresses/' + id, {
          method: 'DELETE'
        })
        window.location.reload(false);
    }

  return (
    <div className="address-list border p-5 mb-5 container-sm">
        {error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>}
        <div className="text-center mb-2">
            <h1>Choose Address</h1>
        </div>

        <div className="border rounded mt-3">
            <div className="d-flex justify-content-between mb-3">
                <h4 className="mt-3 ms-3 me-3 mb-3">
                    Saved Addresses
                </h4>
                <Link to="/addnewaddress" className="btn btn-outline-primary mt-3 ms-3 me-3 fw-bold">+ ADD NEW ADDRESS</Link>
            </div>
            
            {addresses && addresses.map(address => (
                <div className="address-list" key={address.id}> 
                    <div className="container mb-3">
                        <div className="card border">
                            <div className="card-body text-start py-4">
                                <h5 className="card-title">{address.Name}</h5>
                                <p className="card-text m-0">{address.txtaddress}</p>
                                <p className="card-text m-0">{ address.pincode}</p>
                                <p className="card-text m-0">{address.city}</p>
                                <p className="card-text">Phone Number: {address.phoneNumber}</p>
                            </div>
                            <button onClick={() => {handleClick(address.id)}} className="container text-center border-top border-danger py-3 text-black">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

            ))}

            
            
        </div>

        
    </div>
  );
}
 
export default SavAddress;