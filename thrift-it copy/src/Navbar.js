import { Link } from "react-router-dom";
import { Heart } from "react-bootstrap-icons";
import { BagDash } from "react-bootstrap-icons";
import { PersonCircle } from "react-bootstrap-icons";
import { Search } from "react-bootstrap-icons";
import thriftCrop from './thriftCrop.png';

const Navbar = () => {
  return (
    <nav className="d-flex navbar navbar-expand-md navbar-light pb-4 shadow" >
        <div className="container-md">
          <a className="navbar-brand" href="">
            <span className="lead display-6 text-secondary fw-bold">
              <img src= {thriftCrop} className = "img-responsive" height = "72"/>
              ThriftIt
            </span>
          </a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          
          <div className="collapse navbar-collapse justify-content-end align-center" id="main-nav">
            <ul className="navbar-nav">
              <li className="nav-item fw-bold">
                <a className="nav-link" href="#thriftstores">Find Thrift Shops</a>
              </li>
              <li className="nav-item fw-bold">
                <a className="nav-link" href="#donationpts">Find Donation Points</a>
              </li>

            </ul>
          </div>
          
          <form className = "d-flex justify-content-center align-middle w-25" role = "search" actions = "/product_search">
            <label htmlFor="search" className="form-label"></label>
                <div className="input-group">
                    <span className="input-group-text">
                        <Search/>
                    </span>
                    <input type="search" className="form-control" id="search" placeholder="Search"/>
                </div>
          </form>


            <a href = "" className="btn">
                <Heart/>
            </a>
            <a href = "" className="btn">
                <BagDash/>
            </a>
            <a href = "" className="btn">
                <PersonCircle/>
            </a>
          </div>
          
    </nav>
  );
}
 
export default Navbar;
