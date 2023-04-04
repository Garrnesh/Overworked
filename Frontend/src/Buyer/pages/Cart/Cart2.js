import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../useFetch";
import Image from 'react-bootstrap/Image';
import { BsFillTrashFill } from "react-icons/bs";
// import logo from './logo.png';
import { Button, Container, Nav } from "react-bootstrap";
// import PortalNavbar from "../../Navbar";
const Cart = () => {
    const [name, setName] = useState("Teddy");
    const { data: cartitems, isPending, error } = useFetch('http://localhost:8000/cartitems/cart_id/' + name);
    const navigate = useNavigate();
    let count = 0;
    for (let key in cartitems) {
        count++;
    }
    // console.log(count);
    const handleAdd = (id, qty) => {
        console.log(id);
        if (qty < 5) {
            const replaced = {
                "cartitem_id": id,
                "quantity": parseFloat(qty) +  1
                
            };
            fetch('http://localhost:8000/cartitems/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(replaced)
            })
            window.location.reload(false);
        }
        else{
            alert("Max Quantity is 5")
        }
    }

    const handleMinus = (id, qty, product_id) => {
        console.log(id, qty, product_id);
        if (qty > 1) {
            const replaced = {
                "cartitem_id": id,
                "quantity": parseFloat(qty) -  1
                
            };
            fetch('http://localhost:8000/cartitems/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(replaced)
            })
            window.location.reload(false);
        }
        else{
            alert("Press Delete Button to remove item from Cart")
        }
    }

    const handleClick = (id) => {
        
        fetch('http://localhost:8000/cartitems/' + id, {
            method: 'DELETE'
        })
        window.location.reload(false);
    }
    //state variable to store the products to be displayed

    const [productItems, setProductItems] = useState([]);

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
      if (cartitems) {
        cartitems.forEach(item => {
          addProductToCart(item);
        });
      }
    }, [cartitems]);
    
    console.log(productItems);

    return (
        <div className="text-center mb-2 mt-2 fw-light">
            <h1>Cart</h1>
            <h5 className="fw-bold">Items in Cart will be checked out</h5>
            {/* <h6>Cart is empty. Add to Cart to see your items here!</h6> */}
            { error ? (
  <h1 className = "mt-3">Cart does not have any items. Add to Checkout now!</h1>
) : (
  <>
    {productItems && productItems.map(item => (
      <div className="container-sm">
        <div class="card rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              {/* <!-- add image of picture--> */}
              <div class="col-md-2 col-lg-2 col-xl-2 m-lg-0">
                <img className="img-fluid rounded-3" style={{ height: "200px", objectFit: 'contain' }} src={item.Pimage} />
              </div>
              {/* <!-- name of the shirt, size and color--> */}
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-bold mb-2">{item.Productname}</p>
                <p><span class="text-muted">Size: </span>{item.Productsize}</p>
                <p><span class="text-muted">$</span>{item.Productprice}</p>
              </div>
              {/* <!-- this for the quantity--> */}
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                {/* <p class="mb-2 fw-normal">Qty:</p> */}
                <button class="btn btn-outline-light text-dark" type="button" onClick={() => handleMinus(item.cart_id, item.quantity)}>-</button>
                <input type="text" class="form-control text-center" style={{ width: "45px" }} value={parseFloat(item.quantity)} />
                <div class="input-group-prepend">
                  <button class="btn btn-outline-light text-dark" type="button" onClick={() => handleAdd(item.cart_id, item.quantity)}>+</button>
                  {/* <!-- this all for the quantity--> */}
                </div>
              </div>
              {/* <!-- button to delete the order--> */}
              <div class="col-md-1 col-lg-1 col-xl-1">
                <Button onClick={() => { handleClick(item.cart_id) }} variant="light">
                  <BsFillTrashFill size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
    <Link to="/checkout" className="btn btn-secondary btn-dark btn-block btn-lg col-12">Add To Checkout</Link>
  </>
)}
           
        </div>
    )

}

export default Cart;