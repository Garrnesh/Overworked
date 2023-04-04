import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../useFetch";

const Payment = () => {
    const [card_number, setCardNumber] = useState('');
    const [card_on_name, setNameCard] = useState('');
    const [exp_date, setExpiryDate] = useState('');
    const [cvc, setCVV] = useState('');
    const navigate = useNavigate();
    const [buyer_username, setuserName] = useState(localStorage.getItem('username'));

    const { data: payments, isPending, error } = useFetch('http://localhost:8000/payments/buyer_username/' + buyer_username);


    const handleClick = (id) => {
        fetch('http://localhost:8000/payments/' + id, {
          method: 'DELETE'
        })
        window.location.reload(false);
    }


  return (
    <div className="payment">
        {error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>}
        <div class="container-md mb-3">
        <h1 class="text-center m-5">Choose Payment Methods</h1>
        <div class="border rounded mt-3">
            <div class="d-flex justify-content-between">
                <h4 class="mt-4 ms-3 me-3">
                    Saved Payment Methods
                </h4>
                <Link to="/addnewpayment" className="btn btn-outline-primary mt-3 ms-3 me-3 fw-bold">+ ADD NEW PAYMENT</Link>
            </div>
            
            {payments && payments.map(payment => (
                <div className="container mt-2 mb-3">
                    <div className="card border">
                        <div className="card-body text-start py-4">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="card-title">{payment.nameCard}</h5>
                                    <p className="card-text m-0">Card Number {payment.card_number}</p>
                                    <p className="card-text m-0">Expiry Date: {payment.exp_date}</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => {handleClick(payment.id)}} className="btn btn-outline-danger justify-content-center">
                            Remove Card
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
    </div>
    </div>
  );
}
 
export default Payment;