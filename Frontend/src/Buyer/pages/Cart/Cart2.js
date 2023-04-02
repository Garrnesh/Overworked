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

    const { data: cartitems, isPending, error } = useFetch('http://localhost:8000/cart');
    const navigate = useNavigate();
    let count = 0;
    for (let key in cartitems) {
        count++;
    }
    console.log(count);
    const handleAdd = (cpid, name, soldat, qty, size, price, image, id) => {
        if (qty < 5) {
            const itemUrl = 'http://localhost:8000/products/' + id;
            const replaced = {
                "cartproduct_id": cpid,
                "cartproduct_name": name,
                "cartproduct_soldat": soldat,
                "cartproduct_quantity": parseFloat(qty) + 1,
                "cartproduct_size": size,
                "cartproduct_price": price,
                "cartproduct_image": image,
                "id": id
            };
            fetch('http://localhost:8000/cart/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(replaced)
            })
        }
    }

    const handleDelete = (cpid, name, soldat, qty, size, price, image, id) => {
        const replaced = {
            "cartproduct_id": cpid,
            "cartproduct_name": name,
            "cartproduct_soldat": soldat,
            "cartproduct_quantity": parseFloat(qty) - 1,
            "cartproduct_size": size,
            "cartproduct_price": price,
            "cartproduct_image": image,
        };
        fetch('http://localhost:8000/cart/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(replaced)
        })
    }



    const handleClick = (id) => {
        fetch('http://localhost:8000/cart/' + id, {
            method: 'DELETE'
        })
        window.location.reload(false);
    }



    return (
        <div className="cartitems container-xxl">
            {/* {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>} */}

            {count === 0 &&             
            <div className="text-center mb-2 mt-2 fw-light">
                <h1>Cart</h1>
                <h5 className="fw-bold">Items in Cart will be checked out</h5>
                <h6>Cart is empty. Add to Cart to see your items here!</h6>
            </div>
            }
            {
                cartitems && cartitems.map(item => (

                    <div className="container-sm">

                        <div class="card rounded-3 mb-4">
                            <div class="card-body p-4">
                                <div class="row d-flex justify-content-between align-items-center">
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
                                        {/* <p class="mb-2 fw-normal">Qty:</p> */}

                                        <button class="btn btn-outline-light text-dark" type="button" onClick={() => handleDelete(item.cartproduct_id, item.cartproduct_name, item.cartproduct_soldat, item.cartproduct_quantity, item.cartproduct_size, item.cartproduct_price, item.cartproduct_image, item.id)}>-</button>

                                        <input type="text" class="form-control text-center" style={{
                                            width: "45px"
                                        }} value={parseFloat(item.cartproduct_quantity)} />
                                        <div class="input-group-prepend">
                                            <button class="btn btn-outline-light text-dark" type="button" onClick={() => handleAdd(item.cartproduct_id, item.cartproduct_name, item.cartproduct_soldat, item.cartproduct_quantity, item.cartproduct_size, item.cartproduct_price, item.cartproduct_image, item.id)}>+</button>
                                            {/* <!-- this all for the quantity--> */}
                                        </div>
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
    // }
    // return (
    //     <div className="text-center mb-2 mt-2"><h5 classNane="fw-light">Cart is empty. Add items to Checkout!</h5></div>
    // )
}

export default Cart;