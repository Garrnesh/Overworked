import { Link } from "react-router-dom";
import { useState } from "react";
import thriftCrop from './thriftCrop.png';
import { PersonCircle } from "react-bootstrap-icons";
import { Envelope } from "react-bootstrap-icons";
import { CheckCircle } from "react-bootstrap-icons";
import { CurrencyDollar } from "react-bootstrap-icons";
import { UniversalAccess} from "react-bootstrap-icons";
import { BagPlus} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Bag } from "react-bootstrap-icons";
import BizNavBar from "./BizNavBar";
import axios from 'axios';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";



const AddNewListing = () => {
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
    const [tags, setTags] = useState('');

    const [business_username, setUsername] = useState(localStorage.getItem('username'));
    //console.log(business_username);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const listing = { product_image, product_description, product_brand, listing_name, product_price, 
            product_size, business_username, category, tags, product_quantity};
        console.log(JSON.stringify(listing));
        /*fetch('http://localhost:8000/products', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(listing)
        }).then(() => {
            navigate('/viewlisting');
        }).catch((err) => {
            console.log(err);
        })*/
        axios.post('http://localhost:8000/products', JSON.stringify(listing), {headers: { "Content-Type": "application/json" }})
        .then((res) => {
            console.log(res);
            navigate('/viewlisting');
        }).catch((err) => {
            console.log(err);
        })
    }

  return (
    <div className="AddNewListing">
        {/* <div className="navbar">
          <BizNavBar/>
        </div> */}
        <div className="text-center my-5">
            <img src= {thriftCrop} className = "img-responsive" height = "72"/>
        </div>

        <div className="container-lg">
            <div className="text-center">
                <h2>Add New Listing</h2>
            </div>
      
            <form className="row justify-content-center" onSubmit={handleSubmit}>
                <div className="col-lg-6">
            
                    <label htmlFor = "productname" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <PersonCircle/>
                        </span>
                        <input type="text" className = "form-control" id = "productname" placeholder = "Enter product name" required value={listing_name} onChange = {(e) => setlistingName(e.target.value)}/>
                    
                    </div>
            
                    <label htmlFor = "productbrand" className="form-label mt-1"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Envelope/>
                        </span>
                        <input type="text" className = "form-control" id = "productbrand" placeholder = "Enter brand of the product" required value={product_brand} onChange = {(e) => setproductBrand(e.target.value)}/>
                    </div>

                    <label htmlFor = "productTag" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <Bag/>
                        </span>
                        <input type="text" className = "form-control" id = "productTag" placeholder = "Enter product identifier" required value={tags} onChange = {(e) => setTags(e.target.value)}/>                    
                    </div>

                    <div className ="form-floating mt-2">
                        <textarea id = "productdescription" className = "form-control" required value={product_description} onChange = {(e) => setproductDescription(e.target.value)}></textarea>
                        <label htmlFor="productdescription" className ="form-label">Enter product description</label>
                    </div>

                    <label htmlFor = "productsize" className="form-label mt-1"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <UniversalAccess/>
                        </span>
                        <input type="text" className = "form-control" id = "productsize" placeholder = "Enter size of the product" required value={product_size} onChange = {(e) => setSizeofProduct(e.target.value)}/>
                    </div>

                    <label htmlFor = "productquantity" className="form-label mt-1"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <BagPlus/>
                        </span>
                        <input type="text" className = "form-control" id = "productquantity" placeholder = "Enter quanitity of the product" required value={product_quantity} onChange = {(e) => setQuantityofProduct(e.target.value)}/>
                    </div>


                    <label htmlFor = "priceofProduct" className="form-label"></label>
                    <div className="mb-4 input-group">
                        <span className="input-group-text">
                            <CurrencyDollar/>
                        </span>
                        <input type="text" className = "form-control" id = "priceofProduct" placeholder = "What is the price of the Product" required value={product_price} onChange = {(e) => setPriceofProduct(e.target.value)}/>
                    </div>

                    

                    <label htmlFor="category" className="form-label">Select category of product</label>
                    <div className="mb-4 container">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" required value={category} onChange = {() => setcategoryProduct("Accessories")}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                Accessories
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" required value={category} onChange = {() => setcategoryProduct("Top")}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Top
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" required value={category} onChange = {() => setcategoryProduct("Bottom")}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                Bottom
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" required value={category} onChange = {() => setcategoryProduct("Jacket")}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault4">
                                Jacket
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5" required value={category} onChange = {() => setcategoryProduct("Dress")}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault5">
                                Dress
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault6" required value={category} onChange = {() => setcategoryProduct("Sweatshirt")}/>
                            <label className="form-check-label" htmlFor="flexRadioDefault6">
                                Sweatshirt
                            </label>
                        </div>
                        
                    </div>
                    
                    <label htmlFor = "productimage" className="form-label"></label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <BagPlus/>
                        </span>
                        <input type="text" className = "form-control" id = "productimage" placeholder = "Upload image link" required value={product_image} onChange = {(e) => setproductImage(e.target.value)}/>
                    
                    </div>

                    

                    <button className="d-grid gap-2 col-6 mx-auto justify-content-center btn btn-outline-success btn-lg btn-block" value = "AddListing">
                        Add New Listing
                    </button>
                    
                </div>
            </form>
        </div>
    </div>
  );
}
 
export default AddNewListing;