import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../useFetch";
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import { useState } from 'react';
const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, error, isPending } = useFetch('http://localhost:8000/products/' + id);
  console.log(product);
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(false);
  // const[quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('S');

  const handleAddToCart = () => {
    const cartproduct = {
      cartproduct_id: product.Listing_id,
      cartproduct_name:  product.product_name,
      cartproduct_soldat: product.sold_at,
      cartproduct_quantity: 1,
      cartproduct_size: size,
      cartproduct_price: product.product_price,
      cartproduct_image: product.product_image,

    };
    console.log(cartproduct);
    fetch('http://localhost:8000/cart/', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cartproduct)
    }).then(() => {
      navigate(-1);
      window.location.reload(false);
    })

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
        // <article>
        //   <h2>{product.Product_name }</h2>
        //   <p>Brand: { product.Product_brand }</p>
        //   <div>{product.Product_description }</div>
        //   <button onClick={handleClick}>delete</button>
        // </article>
        <div className="container-lg">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-5 text-center d-none d-md-block ml-4">
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
              <div>
                <Form.Select value = {size} onChange = {(event) => setSize(event.target.value)}>
                  <option value = "XS">
                  <Button value = "XS" style={selectedButton === 1 ? selectedButtonStyle : buttonStyle} onClick={() => handleButtonClick(1)}>XS</Button>
                  </option>
                  <option value = "S">
                    <Button value = "S" style={selectedButton === 2 ? selectedButtonStyle : buttonStyle} onClick={() => handleButtonClick(2)}>S</Button>
                  </option>
                  <option value = "M">
                  <Button value = "M" style={selectedButton === 3 ? selectedButtonStyle : buttonStyle} onClick={() => handleButtonClick(3)}>M</Button>
                  </option>
                  <option value = "M">
                  <Button value = "L" style={selectedButton === 4 ? selectedButtonStyle : buttonStyle} onClick={() => handleButtonClick(4)}>L</Button>
                  </option>
                  <option value = "L">
                  <Button value = "XL" style={selectedButton === 5 ? selectedButtonStyle : buttonStyle} onClick={() => handleButtonClick(5)}>XL</Button>
                  </option>
                </Form.Select>   
                <Button type="addtocart" className="btn btn-dark btn-block btn-lg col-12" style = {{margin: "10px"}} onClick ={handleAddToCart}>Add To Cart</Button>
       
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;