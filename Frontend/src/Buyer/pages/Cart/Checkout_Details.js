import { Link } from "react-router-dom";
import { useState } from "react";
// import logo from './thriftitlogo.png'
import { PersonCircle } from "react-bootstrap-icons";
import { Telephone } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Hash } from "react-bootstrap-icons";
import { GeoAlt } from "react-bootstrap-icons";
import { Map } from "react-bootstrap-icons";
import { GlobeAmericas } from "react-bootstrap-icons";
import useFetch from "../../../useFetch";


const CheckoutPage = () => {
    const navigate = useNavigate();

    const { data: addresses, error, isPending } = useFetch('http://localhost:8000/addresses');
    const { data: payments } = useFetch('http://localhost:8000/payments');
    const { data: orders } = useFetch('http://localhost:8000/cart');
    const [totalPrice, setTotalPrice] = useState(0);
    const [chosenaddress, setChosenaddress] = useState({});
    const [chosenpayment, setChosenpayment] = useState({});
    
    const total = orders ? orders.reduce((acc, item) => acc + parseFloat(item.cartproduct_price)*parseFloat(item.cartproduct_quantity), 0) : 0;
    
    //choose payment 
    const handlePayment = (cardNumber, nameCard, expiryDate, cvv) => {
        const payment = {
            "cardNumber": cardNumber,
            "nameCard": nameCard,
            "expiryDate": expiryDate,
            "CVV": cvv
        };
        setChosenpayment(payment);
        console.log(payment);
    }

    // const total = orders.reduce((price, order) => price + parseFloat(order.cartproduct_price), 0);

   
    //choose address
    const handleAddress = (pincode, txtaddress, locality, city) => {
        const address = {
            "pincode": pincode,
            "txtaddress": txtaddress,
            "locality": locality,
            "city": city
        };
        setChosenaddress(address);
        console.log(address);
    }
    //when button is pressed 
    const handleConfirm = () => {
        
        const confirmation = {
            "orders": orders,
            "totalPrice": 300,
            "address": chosenaddress,
            "payment": chosenpayment
        }
        console.log(confirmation)
        fetch('http://localhost:8000/confirmation/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(confirmation)
        }).then(() => {
            navigate(-1);
            window.location.reload(false);
        })
    }

    return (
        <div className="address-list p-5 mb-5 container-sm">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {/* //choose address */}
            <div className="text-center mb-2 mt-2">
                <h1>Checkout Details</h1>
            </div>
            <div className="container rounded mt-3">
                <div className="row">
                    <div className="rounded mt-3 col-6">
                        <div className="d-flex ">
                            <h4 className="mt-3 ms-3 me-3 mb-3">
                                Choose Address
                            </h4>
                        </div>


                        {/* choose address */}
                        <form>
                            {addresses && addresses.map(address => (
                                
                                <div className="address-list" key={address.id}>
                                    <div className="container mb-3">
                                        <div className="card border">
                                            <div className="row">
                                                <div class="col-2">

                                                    <label class="btn py-4 mt-5" for="address">
                                                        <input name="address" type="radio" onClick={() => handleAddress(address.pincode, address.txtaddress, address.locality, address.city)} />
                                                    </label>

                                                </div>
                                                <div className="card-body text-start py-4 col-10">
                                                    <h5 className="card-title">{address.Name}</h5>
                                                    <p className="card-text m-0">{address.txtaddress}</p>
                                                    <p className="card-text m-0">{address.pincode}</p>
                                                    <p className="card-text m-0">{address.city}</p>
                                                    <p className="card-text">Phone Number: {address.phoneNumber}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            ))}
                        </form>

                        {/* choose payment */}

                        <div className="d-flex ">
                            <h4 className="mt-3 ms-3 me-3 mb-3">
                                Choose Payment
                            </h4>
                        </div>
                        <form>
                            {payments && payments.map(payment => (
                                <div className="address-list" key={payment.id}>
                                    <div className="container mb-3">
                                        <div className="card border">
                                            <div className="row">
                                                <div class="col-2">
                                                    <label class="btn py-4 mt-3" for="address">
                                                        <input name="address" type="radio" onClick={() => handlePayment(payment.cardNumber, payment.nameCard, payment.expiryDate, payment.CVV)} />
                                                    </label>
                                                </div>
                                                <div className="card-body text-start py-4 col-10">
                                                    <h5 className="card-title">{payment.cardNumber}</h5>
                                                    <p className="card-text m-0">{payment.nameCard}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </form>
                    </div>
                    <div className="rounded mt-3 col-6">
                        <div className="mb-3 mt-2 border">
                            <h4 className="mt-3 ms-3 me-3 mb-3">
                                Order Summary
                            </h4>

                            {/* choose payment */}
                            {orders && orders.map(order => (

                                <div className="address-list" key={order.id}>
                                    {/* <div>{totalPrice} += parseFloat({order.cartproduct_price})*parseFloat({order.cartproduct_quantity})</div> */}
                                    <div className="container mb-3">
                                        <div className="row">
                                            <div className="col-sm-6">{order.cartproduct_name}</div>
                                            <div className="col-sm-3">Qty: {order.cartproduct_quantity}</div>
                                            <div className="col-sm-3">${order.cartproduct_price}</div>
                                        </div>
                                    </div>
                                </div>

                            ))}

                            <div className="container mb-3">
                                <div className="row">
                                    <div className="col-sm-9 fw-bold">Total Price:</div>

                                    <div className="col-sm-3">${total}</div>
                                </div>
                            </div>

                        </div>
                        {/* <button type="checkout" class="btn btn-secondary btn-dark btn-block btn-lg col-12" onClick={handleConfirm}>Proceed to Order</button> */}
                        <Link to="/confirmationpage" className="btn btn-secondary btn-dark btn-block btn-lg col-12" onClick={handleConfirm}>Proceed to Order
                        </Link>
                    </div>
                </div>
            </div>



        </div>
    );
}


export default CheckoutPage;