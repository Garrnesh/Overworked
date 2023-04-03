import { Link } from "react-router-dom";
import { useState } from "react";
import thriftCrop from './thriftCrop.png';
import { PersonCircle } from "react-bootstrap-icons";
import { Telephone } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Hash } from "react-bootstrap-icons";
import { GeoAlt } from "react-bootstrap-icons";
import { Map } from "react-bootstrap-icons";
import { GlobeAmericas } from "react-bootstrap-icons";
import useFetch from "./useFetch";


const PayAddress = (props) => {
    const [username, setName] = useState('');
    const [postal_code, setPincode] = useState('');
    const [address, setTxtaddress] = useState('');
    const navigate = useNavigate();

    const { data: addresses, isPending, error } = useFetch('http://localhost:8001/addresses');

    const handleSubmit = (e) => {
        const address_1 = { username, postal_code, address};
        console.log(address_1);
        fetch('http://localhost:8001/addresses/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(address_1)
        })
        window.location.reload(false);
    }

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
            <h1>Address Settings</h1>
        </div>

        <div className="border rounded mt-3">
            <div className="d-flex justify-content-between">
                <h4 className="mt-3 ms-3 me-3 mb-3">
                    Saved Addresses
                </h4>
            </div>
            
            {addresses && addresses.map(address => (
                <div className="address-list" key={address.id}> 
                    <div className="container mb-3">
                        <div className="card border">
                            <div className="card-body text-start py-4">
                                <p className="card-text m-0">{address.address}</p>
                                <p className="card-text m-0">{ address.postal_code}</p>
                            </div>
                            <button onClick={() => {handleClick(address.id)}} className="container text-center border-top border-danger py-3 text-black">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

            ))}

            
            
        </div>


        
        <div className="text-center mb-2 mt-4">
            <button>
                <Link>
                    <h3>Add New Address?</h3>
                </Link>
            </button>
           
        </div>
        
    </div>
  );
}
 
export default PayAddress;