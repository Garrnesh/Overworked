import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, error, isPending } = useFetch('http://localhost:8000/products/' + id);
  const navigate = useNavigate();

  const handleClick = () => {
    fetch('http://localhost:8000/products/' + product.id, {
      method: 'DELETE'
    }).then(() => {
      navigate.push('/');
    }) 
  }

  return (
    <div className="product-details mt-4">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { product && (
        // <article>
        //   <h2>{product.Product_name }</h2>
        //   <p>Brand: { product.Product_brand }</p>
        //   <div>{product.Product_description }</div>
        //   <button onClick={handleClick}>delete</button>
        // </article>
        <div className="container-lg">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-5 text-center d-none d-md-block ml-4">
              <Carousel>
                <Carousel.Item>
                  <img
                  className="d-block w-100"
                  src="https://images.nypl.org/index.php?id=1589457&t=w"
                  alt="First slide"
                  width = {400} height = {400} objectFit = "contain"
                />
              </Carousel.Item>
              
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.nypl.org/index.php?id=1589457&t=w"
                  alt="Second slide"
                  width = {400} height = {400} objectFit = "contain"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://images.nypl.org/index.php?id=1589457&t=w"
                  alt="Third slide"
                  width = {400} height = {400}
                />
              </Carousel.Item>
              </Carousel>
            </div>
            {/* <!-- add details of product--> */}
            <div className="col-md-5 text-center text-md-start">
              <h3>
                <div className="product_brand fw-light">{product.Product_brand }</div>
              </h3>
              <h4>
                <div className="product_name">{product.Product_name }</div>
              </h4>
              <h4>
                <div className="product_price">${product.Product_price}</div>
              </h4>
              <p className="product description">{product.Product_description}</p>

              {/* // <!-- add button for sizes--> */}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default ProductDetails;

