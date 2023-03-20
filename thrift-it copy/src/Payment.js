import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [nameCard, setNameCard] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [CVV, setCVV] = useState('');
    const navigate = useNavigate();

    const { data: payments, isPending, error } = useFetch('http://localhost:8002/payments');

    const handleSubmit = (e) => {
      e.preventDefault();
      const payment = { cardNumber, nameCard, expiryDate, CVV};
      console.log(payment);
      fetch('http://localhost:8002/payments/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment)
      })
      window.location.reload(false);
    }

    const handleClick = (id) => {
        fetch('http://localhost:8002/payments/' + id, {
          method: 'DELETE'
        })
        window.location.reload(false);
    }

  return (
    <div className="payment">
        {error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>}
        <div className="text-center m-3">
            <h1>Payment</h1>
        </div>

        <div className="container my-5">
            <div className="row g-3 justify-content-start align-items-center">
                <div className="col-md-8">
                    <div className="text-center text-md-start">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
            
                                <button className="nav-link active" id="nav-cash-tab" data-bs-toggle="tab" data-bs-target="#nav-cash" type="button" role="tab" aria-controls="nav-cash" aria-selected="true">Cash of Delivery</button>
            
                                <button className="nav-link" id="nav-card-tab" data-bs-toggle="tab" data-bs-target="#nav-card" type="button" role="tab" aria-controls="nav-card" aria-selected="false">Credit/Debit Card</button>
            
                            </div>
                        </nav>
                    </div>
                    <div className="tab-content" id="nav-tabContent">

                        <div className="tab-pane fade show active p-3" id="nav-cash" role="tabpanel" aria-labelledby="nav-cash-tab">
                            <h3>Cash on Delivery</h3>
                            <p className="lead mt-4">Your package will be delivered to your doorstep</p>
                            <p className="lead mt-0">Please pay our delivery staff in cash and collect your order.</p>
                  
                            <div className= "mt-5 text-center">
                                <Link to="/review" className="btn btn-outline-primary justify-content-center">Proceed to Review and Checkout</Link>
                            </div>
                        </div>
          
                        <div className="tab-pane fade p-3" id="nav-card" role="tabpanel" aria-labelledby="nav-card-tab">
                            <h3 className="mb-3">Credit/Debit Card</h3>
                            <div className="m-3 mt-4">
                                <h5>
                                    Previously added Payment Methods
                                </h5>
                            </div>
                            {payments && payments.map(payment => (
                            <div className="container mt-2 mb-3">
                                <div className="card border">
                                    <div className="card-body text-start py-4">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h5 className="card-title">{payment.nameCard}</h5>
                                                <p className="card-text m-0">Card Number {payment.cardNumber}</p>
                                                <p className="card-text m-0">Expiry Date: {payment.expiryDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Link to="/review" className="btn btn-outline-success justify-content-center">Proceed to Review and Checkout</Link>
                                    <button onClick={() => {handleClick(payment.id)}} className="btn btn-outline-danger justify-content-center">
                                        Remove Card
                                    </button>
                                </div>
                            </div>
                            ))}
                            <div className="lead text-center m-4">
                                OR
                            </div>
                            <div className="d-flex p-2 justify-content-center">
                                <p className="lead d-inline me-2">We accept</p>
                                <span>
                                    <img src= "https://mms.businesswire.com/media/20210126006164/en/854905/5/Visa+Brand+Mark+-+Blue+-+900x291.jpg" className = "img-responsive me-3" height = "22"/>
                                    <img src= "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png" className = "img-responsive me-3" height = "22"/>
                                    <img src= "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" className = "img-responsive me-3" height = "22"/>
                                    <img src= "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Maestro_2016.svg/800px-Maestro_2016.svg.png" className = "img-responsive me-3" height = "22"/>
                                </span>
                            </div>
                            <form className = "d-flex flex-column ms-5 me-5 p-3 pt-4 pb-4 rounded bg-danger" onSubmit={handleSubmit}>
                                <div className="d-flex justify-content-center">
                                    <div className="w-50 mb-2 align-items-center justify-content-center">
                                        <label htmlFor="cardNumber" className="form-label mb-1">Card Number</label>
                                        <input type="text" className="form-control" id="cardNumber" placeholder="**** **** **** 3567" required value={cardNumber} onChange = {(e) => setCardNumber(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="w-50 mb-2 align-items-center justify-content-center">
                                        <label htmlFor="nameCard" className="form-label mb-1">Name on Card</label>
                                        <input type="text" className="form-control" id="nameCard" placeholder="Full Name" required value={nameCard} onChange = {(e) => setNameCard(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="row justify-content-center">
                                        <div className="col-md-6">
                                            <div className="mb-2 align-items-center justify-content-center">
                                                <label htmlFor="expiryDate" className="form-label mb-1">Expiry Date</label>
                                                <input type="text" className="form-control" id="expiryDate" placeholder="MM/YY" required value={expiryDate} onChange = {(e) => setExpiryDate(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-2 align-items-center justify-content-center">
                                                <label htmlFor="cvv" className="form-label mb-1">CVV</label>
                                                <input type="text" className="form-control" id="cvv" placeholder="CVV" required value={CVV} onChange = {(e) => setCVV(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className= "mt-3 text-center">
                                    <button className = "btn btn-success justify-content-center">
                                        Add Payment Method
                                    </button>
                                </div>
                            </form>
                        </div>   
                    </div>
                </div>
                <div className="col-md-4">
                    <section id="bill" className="bg-light">
                        <div className="card border border-2">
                            <div className="card-header text-center text-primary">
                                <h4 className="card-title">Bill</h4>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className = "d-flex justify-content-around">
                                        <p className="card-text">Sub Total</p>
                                        <p className="card-text text-primary">S$25.9</p>
                                    </div>
                                </div>
                                <div className = "border-bottom">
                                    <div className = "d-flex justify-content-around">
                                        <p className="card-text">Delivery Cost</p>
                                        <p className="card-text text-primary">S$3.5</p>
                                    </div>
                                </div>
                                <div>
                                    <div className = "d-flex justify-content-around mt-2">
                                        <p className="card-text">Grand Total</p>
                                        <p className="card-text text-primary">S$29.4</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div> 
    </div>
  );
}
 
export default Payment;
