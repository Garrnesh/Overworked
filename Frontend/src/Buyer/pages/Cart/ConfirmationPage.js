import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import logo from './thriftitlogo.png';
import useFetch from "../../../useFetch";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
    // const navigate = useNavigate();

    // const { data: orders, error, isPending } = useFetch('http://localhost:8000/confirmation/orders');
    // const { data: totalPrice } = useFetch('http://localhost:8000/confirmation/totalPrice');
    // const { data: address } = useFetch('http://localhost:8000/confirmation/address');
    //  const { data: payment } = useFetch('http://localhost:8000/confirmation/payment');
    // const myProp = props?.location?.state?.myProp;
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const { data: orderitems} = useFetch('http://localhost:8000/cartitems/cart_id/' + username);
    // const {data: orderDetails} = useFetch('http://localhost:8000/orders/buyer_username/' + name)
    const [totalPrice, setTotalPrice] = useState(0);
    
    const [productItems, setProductItems] = useState([]);

    const handleClick = () => {
        orderitems.forEach(item => {
            console.log(item.id)
        fetch('http://localhost:8000/cartitems/' + item.id, {
            method: 'DELETE'
        })
    })
    // alert("Cart items cleared!")
    }

    async function addProductToCart(item) {
      try {
        const response = await fetch("http://localhost:8000/products/" + item.product_id, {
          method: "GET"
        });
        const productData = await response.json();
        const newProductItem = {
          Pid :  item.product_id,
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


    
    useEffect(() => {
      if (orderitems) {
        orderitems.forEach(item => {
          addProductToCart(item);
        //   addProductToOrder(item);
        });
      }
    }, [orderitems]);
    
    const total = productItems ? productItems.reduce((acc, item) => acc + parseFloat(item.Productprice)*parseFloat(item.quantity), 0) : 0;
    //this is to add items to orderitems



    //trasnfer items to orderitem
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
                            <div>
                            <div className="container mb-3">
                                <div className="row">
                                    <div className="col-sm-9 fw-bold">Total Price:</div>
                                    <div className="col-sm-3 fw-bold">${total.toFixed(2)}</div>
                                </div>
                            </div>
                            </div>
                    </div>
                    <Link to="/home" className="btn btn-secondary btn-dark btn-block btn-lg col-12" onClick = {() => handleClick()}> Back to Homepage
                        </Link>
        </div>
    );
}



export default ConfirmationPage;