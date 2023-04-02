import { Link } from "react-router-dom";
import { useState } from "react";
// import logo from './thriftitlogo.png';
import useFetch from "../../../useFetch";


const ConfirmationPage = () => {
    // const navigate = useNavigate();

    // const { data: orders, error, isPending } = useFetch('http://localhost:8000/confirmation/orders');
    // const { data: totalPrice } = useFetch('http://localhost:8000/confirmation/totalPrice');
    // const { data: address } = useFetch('http://localhost:8000/confirmation/address');
    //  const { data: payment } = useFetch('http://localhost:8000/confirmation/payment');
    const { data: orders } = useFetch('http://localhost:8000/cart');
    const { data: address } = useFetch('http://localhost:8000/deliveryaddress');
    const total = orders ? orders.reduce((acc, item) => acc + parseFloat(item.cartproduct_price), 0) : 0;
    return (
        <div className="address-list p-5 mb-5 container-sm">
            {/* {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>} */}
            {/* //choose address */}
            <div className="text-center mb-3 mt-2">
                <h1>Thank you for shopping with ThriftIt</h1>
                <h4 className = "font-weight-light">Here are your confirmed order details</h4>
            </div>
            <div className="mb-2 mt-2 rounded row m-3 justify-content-center border ">
                        {/* <div className="mb-3 mt-2 border"> */}
                        {/* //order details */}
                            <h4 className="text-center mt-3 ms-3 me-3 mb-3">
                                Order Summary
                            </h4>

                            {/* choose payment */}
                            {orders && orders.map(order => (

                                <div className="address-list" key={order.id}>
                                    <div className="container mb-3">
                                        <div className="row">
                                            <div className="col-sm-6">{order.cartproduct_name}</div>
                                            <div className="col-sm-3">Qty: {order.cartproduct_quantity}</div>
                                            <div className="col-sm-3">${order.cartproduct_price}</div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                            <div>
                            <div className="container mb-3">
                                <div className="row">
                                    <div className="col-sm-9 fw-bold">Total Price:</div>
                                    <div className="col-sm-3">${total}</div>
                                </div>
                            </div>
                            </div>
                        {/* address details */}
                        {/* <div className="mb-3 mt-2 border"> */}
                        <h4 className="text-center mt-3 ms-3 me-3 mb-3">
                                Delivery Details
                            </h4>

                            {/* choose payment */}
                            {address && address.map(ad => (

                                <div className="address-list" key={ad.id}>
                                    <div className="container mb-3">
                                        <div className="row">
                                            <div>Address: {ad.txtaddress}</div>
                                            <div>Locality: {ad.locality}</div>
                                            <div>Postal Code:{ad.pincode}</div>
                                            <div>City: {ad.city}</div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                    </div>
                    <Link to="/home" className="btn btn-secondary btn-dark btn-block btn-lg col-12" > Back to Homepage
                        </Link>
        </div>
    );
}


export default ConfirmationPage;