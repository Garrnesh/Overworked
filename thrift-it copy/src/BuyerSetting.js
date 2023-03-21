import { Link } from "react-router-dom";


const BuyerSettings = () => {
  return (
    <div className="buyersettings">
        <div class="d-flex flex-column text-center mt-5">
            <h1>Profile</h1>
            <h2 class="lead fw-bold text-primary">Hi Buyer</h2>
        </div>
        <div class="row m-3 justify-content-center">
            <Link to="/profile" className="btn btn-outline-primary mb-2 col-7">Edit Profile</Link>
            <Link to="/savaddress" className="btn btn-outline-primary mb-2 col-7">Edit/Review Saved Addresses</Link>
            <Link to="/savpayment" className="btn btn-outline-primary mb-2 col-7">Edit/Review Saved Payment Methods</Link>
        </div>
    </div>
  );
}
 
export default BuyerSettings;
