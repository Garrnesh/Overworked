import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../useFetch";
import Image from 'react-bootstrap/Image';
import { BsFillTrashFill } from "react-icons/bs";
// import logo from './logo.png';
import { Button, Container, Nav } from "react-bootstrap";
// import PortalNavbar from "../../Navbar";
const Cart = () => {
    // const [cardNumber, setCardNumber] = useState('');
    // const [nameCard, setNameCard] = useState('');
    // const [expiryDate, setExpiryDate] = useState('');
    // const [CVV, setCVV] = useState('');
    // const navigate = useNavigate();

    const { data: cartitems, isPending, error } = useFetch('http://localhost:8000/cartitems');
    const navigate = useNavigate();
    const [checkout, setCheckout] = useState(false);
    //add items to a temporary array of objects
    const [add, setAdd] = useState(1);
    //add items to checkout
    const handleAddToCheckout = (itemname, itemsoldat, itemquantity, itemsize, itemprice) => {

        if (checkout) {
            fetch('http://localhost:8000/orders/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(add)
            }).then(() => {
                navigate(-1);
                window.location.reload(false);
            })
        }
        else {
            const orderitem = {

                orderitem_name: itemname,
                orderitem_soldat: itemsoldat,
                orderitem_quantity: itemquantity,
                orderitem_size: itemsize,
                orderitem_price: itemprice,


            };
            setAdd(add => [add, orderitem]);
        }

    }

    const handleClick = (id) => {
        fetch('http://localhost:8000/carts/' + id, {
            method: 'DELETE'
        })
        window.location.reload(false);
    }

    // const handleDecrease = (item, quantity) => {
    //    const object = cartitems.find((product) => product.cartproduct_id === item.cartproduct_id);
    //    object.cartproduct_quantity = parseFloat(object.cartproduct_quantity) -1;

    //    const updated = JSON.stringify(cartitems);
    // }

    // const handleIncrease = (id) => {
        
    // }



    return (
        <div className="cartitems container-xxl">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {/* {(cartitems.length === 0 || cartitems || [] === 0) && <div className="text-center mb-2 mt-2"><h5 classNane = "fw-light">Cart is empty. Add items to Checkout!</h5></div>} */}
            <div className="text-center mb-2 mt-2 fw-light">
                <h1>Cart</h1>
                <h5 className = "fw-bold">Items in Cart will be checked  out</h5>
            </div>
            {
                cartitems && cartitems.map(item => (

                    <div className="container-sm">

                    <div class="card rounded-3 mb-4">
                        <div class="card-body p-4">
                            <div class="row d-flex justify-content-between align-items-center">
                                {/* <!-- add checkbox to add to checkout-->
                                <div class="form-check col-md-1 col-lg-1 col-xl-1">
                                    <label class="btn" for="addtocheckout">
                                        <input name="cartoptions" type="checkbox" onClick={() => { handleAddToCheckout(item.cartproduct_name, item.cartproduct_soldat, item.cartproduct_quantity, item.cartproduct_size, item.cartproduct_price) }} />
                                    </label>
                                </div> */}
                                {/* <!-- add image of picture--> */}
                                <div class="col-md-2 col-lg-2 col-xl-2 m-lg-0">
                                    <img className="img-fluid rounded-3" style={{ height: "200px", objectFit: 'contain' }} src={item.cartproduct_image} />
                                </div>
                                {/* <!-- name of the shirt, size and color--> */}
                                <div class="col-md-3 col-lg-3 col-xl-3">
                                    <p class="lead fw-bold mb-2">{item.cartproduct_name}</p>
                                    <p><span class="text-muted">Size: </span>{item.cartproduct_size}</p>
                                    <h5 class="mb-0">${item.cartproduct_price}</h5>
                                </div>
                                {/* <!-- this for the quantity--> */}
                                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                    <p class="mb-2 fw-normal">Qty:</p>
                                    {/* <button class="btn btn-link px-2"
                                        onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                                        <i class="fas fa-minus"></i>
                                    </button>

                                    <input id="form1" min="0" name="quantity" value="1" type="number"
                                        class="form-control form-control-sm" />

                                    <button class="btn btn-link px-2"
                                        onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                                        <i class="fas fa-plus"></i>
                                    </button> */}
                                    <input type="button" value = "-" onClick={() => setAdd(add -1)}/>
                                    <input type="text" name = "quantity" value = "1" max = "5" />
                                    <input type="button" value = "+"onClick={() => setAdd(add + 1)} />
                                    {/* <!-- this all for the quantity--> */}
                                </div>

                                {/* <!-- button to delete the order--> */}
                                <div class="col-md-1 col-lg-1 col-xl-1">
                                    <Button onClick={() => { handleClick(item.id) }} variant="light">
                                        <BsFillTrashFill size={24} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
            <Link to="/checkout" className="btn btn-secondary btn-dark btn-block btn-lg col-12">Add To Checkout
            </Link>


            {/* <button type="checkout" class="btn btn-secondary btn-dark btn-block btn-lg col-12" onClick = {() => setCheckout(true)}>Add to Checkout</button> */}
        </div>
    );
}

export default Cart;