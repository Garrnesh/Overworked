import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import logo from './thriftitlogo.png'
import { PersonCircle } from "react-bootstrap-icons";
import { Telephone } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Hash } from "react-bootstrap-icons";
import { GeoAlt } from "react-bootstrap-icons";
import { Map } from "react-bootstrap-icons";
import { GlobeAmericas } from "react-bootstrap-icons";
import useFetch from "../../../useFetch";



const CheckoutPage = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState("Teddy");
    const { data: orderitems } = useFetch('http://localhost:8000/cartitems/cart_id/' + name);
    //THIS HAS TO ALL CHANGE ONCE WE CAN ACCESS USER SPECIFIC
    const { data: addresses, error, isPending } = useFetch('http://localhost:8000/address/buyer_username/John35');
    const { data: payments } = useFetch('http://localhost:8000/payments/buyer_username/Jenri59');
    //TO REPLACE ONCE WE STANDARDISE
    // const { data: addresses, error, isPending } = useFetch('http://localhost:8000/address/buyer_username/' + name);
    // const { data: payments } = useFetch('http://localhost:8000/payments/buyer_username/' + name);
    //END REPLACEMENT
    const [orderAddress, setorderAddress] = useState('');
    const [card, setCard] = useState('');
    //generate random string for order
    function generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    //get number of items in cart
    let count = 0;
    for (let key in orderitems) {
        count++;
    }
    console.log("Count", count); 

    const [orderID, setOrderID] = useState("order" + generateRandomString(20));
    console.log(orderID);
    //generate date of order
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    //end of date of order
    console.log(formattedDate);
    const handleConfirm = () => {
        const confirmation = {
            "order_id": orderID,
            "order_address": orderAddress,
            "order_card": card,
            "buyer_username": "Teddy",
            "date": formattedDate,
            "status": "Processing",
            "total_price": total

        }
        console.log(confirmation)
        fetch('http://localhost:8000/orders/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(confirmation)
        }).then(() => {
            window.location.reload(false);
        })

    }
    //to mask the credit card details for safety
    const maskNumber = (number) => {
        const lastFourDigits = number.slice(-4);
        const maskedNumber = "*".repeat(number.length - 4) + lastFourDigits;
        return maskedNumber;
    };

    //show order details
    const [productItems, setProductItems] = useState([]);

    async function addProductToCart(item) {
        try {
            const response = await fetch("http://localhost:8000/products/" + item.product_id, {
                method: "GET"
            });
            const productData = await response.json();
            const newProductItem = {
                Pid: item.product_id,
                Pimage: productData.product_image,
                Productname: productData.listing_name,
                Productprice: productData.product_price,
                Productsize: productData.product_size,
                cart_id: item.id,
                quantity: item.quantity
            };
            setProductItems(prevItems => [...prevItems, newProductItem]);
        } catch (err) {
            console.log(err);
        }
    }

    async function addProductToOrder(item) {
        console.log("item", item.product_id)
        const newProductItem = {
            order_id: orderID, // make sure that orderID is set correctly
            product_id: item.product_id,
            quantity: item.quantity,
        }
        try {
            const response = await fetch('http://localhost:8000/orderitems/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProductItem)
            });
            if (response.ok) {
                // clear the newProductItem object after the POST request is successful
                newProductItem.order_id = null;
                newProductItem.product_id = null;
                newProductItem.quantity = null;
                console.log('POST request successful');
            } else {
                console.log('POST request failed');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const total = productItems ? productItems.reduce((acc, item) => acc + parseFloat(item.Productprice) * parseFloat(item.quantity), 0) : 0;

    const handleAddress = (id) => {
        setorderAddress(id);
    }

    const handlePayment = (id) => {
        setCard(id);
    }

    console.log(orderAddress, card);
    useEffect(() => {
        if (orderitems) {
            orderitems.forEach(item => {
                //COMMENT OUT FIRST COS I DOING OTHER THINGS
                addProductToOrder(item);
                console.log("product", item.product_id);
                addProductToCart(item);
            });
        }
    }, [orderitems]);



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
                        <div className="d-flex">
                            <h4 className="mt-3 ms-3 me-3 mb-3">
                                Choose Address 
                            </h4>
                            <h4><Link to="/addnewaddress" className="btn btn-sm fw-bold btn-outline-primary">+ ADD NEW ADDRESS</Link></h4>
                            
                        </div>
                        

                        {/* choose address */}
                        <form>
                            {addresses && addresses.map(address => (

                                <div className="address-list">
                                    <div className="container mb-3">
                                        <div className="card border">
                                            <div className="row">
                                                <div class="col-2">
                                                    <label class="btn py-4 mt-2" for="address">
                                                        <input name="address" type="radio" onClick={() => handleAddress(address.id)} />
                                                        {/* <input name="address" type="radio"/> */}

                                                    </label>

                                                </div>
                                                <div className="card-body text-start py-4 col-10">
                                                    {/* <p className="card-text m-0">{address.id}</p> */}
                                                    <p className="card-text m-0">{address.address}</p>
                                                    <p className="card-text m-0">{address.postal_code}</p>
                                                    {/* <p className="card-text m-0">{address.city}</p> */}
                                                    {/* <p className="card-text">Phone Number: {address.phoneNumber}</p> */}
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
                            <h4>
                            <Link to="/addnewpayment" className="btn btn-sm fw-bold btn-outline-primary">+ ADD NEW PAYMENT</Link>
                            </h4>
                        </div>
                        <form>
                            {payments && payments.map(payment => (
                                <div className="address-list">
                                    <div className="container mb-3">
                                        <div className="card border">
                                            <div className="row">
                                                <div class="col-2">
                                                    <label class="btn py-4 mt-3" for="address">
                                                        <input name="address" type="radio" onClick={() => handlePayment(payment.id)} />

                                                    </label>
                                                </div>
                                                <div className="card-body text-start py-4 col-10">
                                                    {/* <h5 className="card-title">{payment.id}</h5> */}
                                                    <h5 className="card-title">{payment.name_on_card}</h5>
                                                    <p className="card-text m-0">{maskNumber(payment.card_number)}</p>
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

                            {/* order details */}
                            {productItems && productItems.map(order => (

                                <div className="address-list">
                                    <div className="container mb-3">
                                        <div className="row">
                                            <div className="col-sm-6">{order.Productname}</div>
                                            <div className="col-sm-3">Qty: {order.quantity}</div>
                                            <div className="col-sm-3">${order.Productprice}</div>
                                        </div>
                                    </div>
                                </div>

                            ))}

                            <div className="container mb-3">
                                <div className="row">
                                    <div className="col-sm-9 fw-bold">Total Price:</div>

                                    <div className="col-sm-3">${total.toFixed(2)}</div>
                                </div>
                            </div>

                        </div>
                        {/* <button type="checkout" class="btn btn-secondary btn-dark btn-block btn-lg col-12">Proceed to Order</button> */}
                        {/* <Link to={{ pathname: "/confirmationpage", state: { prop: orderID } }} className="btn btn-secondary btn-dark btn-block btn-lg col-12" onClick={handleConfirm}>Proceed to Order
                        </Link> */}
                        <Link to="/confirmationpage" className="btn btn-secondary btn-dark btn-block btn-lg col-12" onClick={handleConfirm}>Proceed to Order
                        </Link>

                    </div>
                </div>
            </div>



        </div>
    );
}


export default CheckoutPage;