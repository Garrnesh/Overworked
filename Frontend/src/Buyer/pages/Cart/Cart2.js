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
    const [name, setName] = useState("Sally");
    const { data: cartitems, isPending, error } = useFetch('http://localhost:8000/cartitems/cart_id/' + name);
    const navigate = useNavigate();
    let count = 0;
    for (let key in cartitems) {
        count++;
    }
    // console.log(count);
    const handleAdd = (id, cpid, qty, pid) => {
        if (qty < 5) {
            const itemUrl = 'http://localhost:8000/cartitems/' + id;
            const replaced = {
                "cart_id": cpid,
                "quantity": parseFloat(qty) - 1,
                "product_id": pid
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

    const handleMinus = (id, cpid, qty, pid) => {
        const replaced = {
            "cart_id": cpid,
            "quantity": parseFloat(qty) + 1,
            "product_id": pid
        };
        fetch('http://localhost:8000/cartitems/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(replaced)
        })
    }



    const handleClick = (id) => {
        fetch('http://localhost:8000/cartitems/' + name, {
            method: 'DELETE'
        })
        window.location.reload(false);
    }
    const [productItems, setProductItems] = useState({});
    const [image, setImage] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productSize, setProductSize] = useState("");
    //get product image, product name, product price 
    async function getInfo(id) {
        try {
            const response = await fetch("http://localhost:8000/products/" + id, {
                method: 'GET',
            });
            const response_json = await response.json();

            setImage(response_json["product_image"]);
            setProductName(response_json["listing_name"]);
            setProductPrice(response_json["product_price"]);
            setProductSize(response_json["product_size"]);
            // console.log(image, productName, productPrice, productSize);

        } catch (err) {
            console.log(err);
        }
    }
    
        cartitems && cartitems.map(item => {
            const productInfo = getInfo(item.product_id);
            const newItem = {
                Pimage: image,
                Productname: productName,
                Productprice: productPrice,
                Productsize: productSize
            }

            setProductItems([...productItems, newItem]);
        })





    return (
        <div className="text-center mb-2 mt-2 fw-light">
            <h1>Cart</h1>
            <h5 className="fw-bold">Items in Cart will be checked out</h5>
            {/* <h6>Cart is empty. Add to Cart to see your items here!</h6> */}
            {

                    productItems && productItems.map(item => {
                    // const productInfo = getInfo(item.product_id); 
                    return (
                        <div className="container-sm">

                            <div class="card rounded-3 mb-4">
                                <div class="card-body p-4">
                                    <div class="row d-flex justify-content-between align-items-center">
                                        {/* <!-- add image of picture--> */}
                                        <div class="col-md-2 col-lg-2 col-xl-2 m-lg-0">
                                            <img className="img-fluid rounded-3" style={{ height: "200px", objectFit: 'contain' }} src={item.Image} />
                                        </div>
                                        {/* <!-- name of the shirt, size and color--> */}
                                        <div class="col-md-3 col-lg-3 col-xl-3">
                                            <p class="lead fw-bold mb-2">{item.Productname}</p>
                                            <p><span class="text-muted">Size: </span>{item.Productsize}</p>
                                            <h5 class="mb-0">${item.Productprice}</h5>
                                        </div>
                                        {/* <!-- this for the quantity--> */}
                                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                            {/* <p class="mb-2 fw-normal">Qty:</p> */}

                                            <button class="btn btn-outline-light text-dark" type="button" onClick={() => handleMinus(item.id, item.cart_id, item.quantity, item.product_id)}>-</button>

                                            <input type="text" class="form-control text-center" style={{
                                                width: "45px"
                                            }} value={parseFloat(item.quantity)} />
                                            <div class="input-group-prepend">
                                                <button class="btn btn-outline-light text-dark" type="button" onClick={() => handleAdd(item.id, item.cart_id, item.quantity, item.product_id)}>+</button>
                                                {/* <!-- this all for the quantity--> */}
                                            </div>
                                        </div>

                                        {/* <!-- button to delete the order--> */}
                                        <div class="col-md-1 col-lg-1 col-xl-1">
                                            <Button onClick={() => { handleClick(item.product_id) }} variant="light">
                                                <BsFillTrashFill size={24} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                })}
            <Link to="/checkout" className="btn btn-secondary btn-dark btn-block btn-lg col-12">Add To Checkout
            </Link>
        </div>
    )

    // <div className="cartitems container-xxl">

    //     {/* {error && <div>{error}</div>}
    //             {isPending && <div>Loading...</div>} */}

    //     {/* {count === 0 &&
    //         <div className="text-center mb-2 mt-2 fw-light">
    //             <h1>Cart</h1>
    //             <h5 className="fw-bold">Items in Cart will be checked out</h5>
    //             <h6>Cart is empty. Add to Cart to see your items here!</h6>
    //         </div>
    //     } */}
    // {
    //     cartitems && cartitems.map(item => {
    //         const productInfo = getInfo(item.product_id); 
    //         return (
    //             <div className="container-sm">

    //                 <div class="card rounded-3 mb-4">
    //                     <div class="card-body p-4">
    //                         <div class="row d-flex justify-content-between align-items-center">
    //                             {/* <!-- add image of picture--> */}
    //                             <div class="col-md-2 col-lg-2 col-xl-2 m-lg-0">
    //                                 <img className="img-fluid rounded-3" style={{ height: "200px", objectFit: 'contain' }} src={image} />
    //                             </div>
    //                             {/* <!-- name of the shirt, size and color--> */}
    //                             <div class="col-md-3 col-lg-3 col-xl-3">
    //                                 <p class="lead fw-bold mb-2">{productName}</p>
    //                                 <p><span class="text-muted">Size: </span>{productSize}</p>
    //                                 <h5 class="mb-0">${productPrice}</h5>
    //                             </div>
    //                             {/* <!-- this for the quantity--> */}
    //                             <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
    //                                 {/* <p class="mb-2 fw-normal">Qty:</p> */}

    //                                 <button class="btn btn-outline-light text-dark" type="button" onClick={() => handleMinus(item.id, item.cart_id, item.quantity, item.product_id)}>-</button>

    //                                 <input type="text" class="form-control text-center" style={{
    //                                     width: "45px"
    //                                 }} value={parseFloat(item.quantity)} />
    //                                 <div class="input-group-prepend">
    //                                     <button class="btn btn-outline-light text-dark" type="button" onClick={() => handleAdd(item.id, item.cart_id, item.quantity, item.product_id)}>+</button>
    //                                     {/* <!-- this all for the quantity--> */}
    //                                 </div>
    //                             </div>

    //                             {/* <!-- button to delete the order--> */}
    //                             <div class="col-md-1 col-lg-1 col-xl-1">
    //                                 <Button onClick={() => { handleClick(item.product_id) }} variant="light">
    //                                     <BsFillTrashFill size={24} />
    //                                 </Button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>)
    //     })}
    //     <Link to="/checkout" className="btn btn-secondary btn-dark btn-block btn-lg col-12">Add To Checkout
    //     </Link>
    // </div>

}

export default Cart;