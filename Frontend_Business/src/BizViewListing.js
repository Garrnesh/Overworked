import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import getCurrentUser from "./getCurrentUser";


const BizViewListing = (props) => {
    const [listing_name, setlistingName] = useState('');
    const [product_brand, setproductBrand] = useState('');
    const [product_description, setproductDescription] = useState('');
    //const [materialOfProduct, setmaterialOfProduct] = useState('');
    //const [ageOfProduct, setageOfProduct] = useState('');
    const [category, setcategoryProduct] = useState('');
    const [product_price, setPriceofProduct] = useState('');
    const [product_size, setSizeofProduct] = useState('');
    const [product_quantity, setQuantityofProduct] = useState('');
    const [product_image, setproductImage] = useState('');

    const navigate = useNavigate();

    const username = getCurrentUser();
    console.log(username);

    const { data: listings, isPending, error } = useFetch('http://localhost:8003/listings');

    const handleSubmit = (e) => {
        e.preventDefault();
        const listing = { listing_name, product_brand, product_description, category, product_price, product_size, product_quantity, product_image};
        fetch('http://localhost:8000/listings', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(listing)
        }).then(() => {
            navigate('/viewlisting'); //will have to edit this later
        })
    }

    const handleClick = (id) => {
        fetch('http://localhost:8003/listings/' + id, {
          method: 'DELETE'
        })
        window.location.reload(false);
    }

  return (
    <div className="address-list border p-5 mb-5 container-sm">
        {error && <div>{ error }</div> }
        {isPending && <div>Loading...</div>}
        <div className="text-center mb-2">
            <h1>Your Product Inventory</h1>
        </div>

        <div className="mt-3">
            
            {listings && listings.map(listing => (
                <div className="listing-list" key={listing.id}> 
                    <div className="container mb-3">
                        <div className="card border">
                            <div className="card-body text-start py-4">
                                <div className="row d-flex justify-content-between align-items-center">
                                    <div className="col-md-2 col-lg-2 col-xl-2">
                                        <button>
                                            <Link to="/">
                                                <img src={listing.imageFile} className="img-fluid rounded-3" alt="ProductImage"/>
                                            </Link>
                                        </button>
                                    </div>
                    
                                    <div className="col-md-3 col-lg-3 col-xl-3">
                                        <p className="lead fw-bold mb-2">{listing.listing_name}</p>
                                        <p><span className="text-muted">Brand: </span>{listing.product_brand} <span className="text-muted">Size: </span> {listing.product_size} </p>
                                        <div>
                                            <p className="mb-2 fw-normal">Qty: {listing.product_quantity}</p>
                                            
                                        </div> 
                                    </div>
                    
                                    
                    
                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                        <h5 className="mb-0">{listing.product_price}</h5>
                                    </div>
                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                        <a href="#!" className="text-danger"><i className="fas fa-trash fa-lg"></i></a>
                                    </div>
                                </div>
                            </div>



                            <button onClick={() => {handleClick(listing.id)}} className="container text-center border-top border-danger py-3 text-black">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

            ))}

            
            
        </div>


        
        <Link to="/addnewlisting" className="btn btn-outline-primary mt-3 ms-3 me-3 fw-bold">+ ADD NEW LISTING</Link>

    </div>
  );
}
 
export default BizViewListing;