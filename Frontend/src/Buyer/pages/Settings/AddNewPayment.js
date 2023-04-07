import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddNewPayment = () => {
    const [card_number, setCardNumber] = useState('');
    const [name_on_card, setNameCard] = useState('');
    const [exp_date, setExpiryDate] = useState('');
    const [cvc, setCVC] = useState('');
    const [buyer_username, setusername] = useState(localStorage.getItem('username'));
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      const payment = { buyer_username, card_number, name_on_card, exp_date, cvc};
      console.log(payment);
      fetch('http://localhost:8000/payments/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment)
      })
      .then(() => {
          window.location.reload(false);
          navigate(-1);
      })
    }
  return (
    <div className="addnewpayment">
      <div className="text-center m-3">
        <h1>Add New Payment Method</h1>
      </div>

      <div className="container my-5">
        <div className="row g-3 justify-content-center align-items-center">
            <div className="col-md-8">
              <div className="text-center text-md-start">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
            
                    <div className="nav-link active" id="nav-card-tab" data-bs-toggle="tab" data-bs-target="#nav-card" type="button" role="tab" aria-controls="nav-card" aria-selected="false">Credit/Debit Card</div>
            
                  </div>
                </nav>
              </div>
              <div className="tab-content" id="nav-tabContent">

          
                <div className="tab-pane fade show active p-3" id="nav-card" role="tabpanel" aria-labelledby="nav-card-tab">
                  <h3 className="mb-3">Credit/Debit Card</h3>
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
                        <input type="text" className="form-control" id="cardNumber" placeholder="**** **** **** 3567" required value={card_number} onChange = {(e) => setCardNumber(e.target.value)}/>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="w-50 mb-2 align-items-center justify-content-center">
                        <label htmlFor="card_on_name" className="form-label mb-1">Name on Card</label>
                        <input type="text" className="form-control" id="card_on_name" placeholder="Full Name" required value={name_on_card} onChange = {(e) => setNameCard(e.target.value)}/>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="row justify-content-center">
                        <div className="col-md-6">
                          <div className="mb-2 align-items-center justify-content-center">
                            <label htmlFor="exp_date" className="form-label mb-1">Expiry Date</label>
                            <input type="text" className="form-control" id="exp_date" placeholder="MM/YY" required value={exp_date} onChange = {(e) => setExpiryDate(e.target.value)}/>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-2 align-items-center justify-content-center">
                            <label htmlFor="cvc" className="form-label mb-1">CVC</label>
                            <input type="text" className="form-control" id="cvc" placeholder="CVC" required value={cvc} onChange = {(e) => setCVC(e.target.value)}/>
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
          </div> 
      </div>
    </div>
  );
}
 
export default AddNewPayment;