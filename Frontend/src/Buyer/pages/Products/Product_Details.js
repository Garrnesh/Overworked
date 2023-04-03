import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../useFetch";
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, error, isPending } = useFetch('http://localhost:8000/products/' + id);

  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(false);
  // const[quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('S');

  const handleAddToCart = () => {

    const cartitem = {
        "cart_id" : 'Pooh',
        "product_id": id,
        "quantity": 1,
    };
    console.log("cartitem", cartitem);
    fetch('http://localhost:8000/cartitems', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cartitem)
    }).then(() => {
      navigate(-1);
      window.location.reload(false);

    }).catch((err) => {
      console.log(err);
    })
    //to notify that item has been added to cart!
    alert("Added to Cart!")

  }
  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  }
  const buttonStyle = {
    backgroundColor: "white",
    color: "black",
    margin: "10px", // add margin around each button
    padding: "10px", // add padding inside each button
    width : "50px"
  };

  const selectedButtonStyle = {
    backgroundColor: "black",
    color: "white",
    margin: "10px", // add margin around each button
    padding: "10px", // add padding inside each button
    width : "50px"
  }


  return (
    <div className="product-details mt-4">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {product && (

        <div className="container-lg">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-5 text-center d-none d-md-block ml-4">
              <Carousel className = 'carousel-dark'>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={product.product_image}
                    alt="First slide"
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "contain"
                    }}
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={product.product_image}
                    alt="Second slide"
                    style={{
                      width: "400px",
                      height: "400px",
                      objectFit: "contain"
                    }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={product.product_image}
                    alt="Third slide"
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "contain"
                    }}
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            {/* <!-- add details of product--> */}
            <div className="col-md-5 text-center text-md-start">
              <h3>
                <div className="product_brand fw-light">{product.product_brand}</div>
              </h3>
              <h4>
                <div className="product_name">{product.product_name}</div>
              </h4>
              <h4>
                <div className="product_price">${product.product_price}</div>
              </h4>
              <p className="product description">{product.product_description}</p>

              {/* // <!-- add button for sizes--> */}

              <Button type="addtocart" className="btn btn-dark btn-block btn-lg col-12" style = {{margin: "10px"}} onClick ={() => handleAddToCart()}>Add To Cart</Button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;