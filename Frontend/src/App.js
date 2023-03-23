import "bootstrap/dist/css/bootstrap.min.css";
//navigation bar
import Navibar from './BuyerInterfaces/BUYER_Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Home Page that displays random clothes 
import Home from './BuyerInterfaces/BUYER_Home';
import ProductDetails from './BuyerInterfaces/BUYER_productDetails';

//Browse Donation Point
import SearchBar from "./BuyerInterfaces/BUYER_SearchBar";
//Browse Thrift Shops
import BrowseThriftShops  from './BuyerInterfaces/BUYER_BrowseThriftShops';

import TSDetails from './BuyerInterfaces/BUYER_thriftshopDetails';
import SearchBarSection from './BuyerInterfaces/BUYER_SearchBarSection';

function App() {
  return (
    <Router>
      <div className = "App">
        {/* Show Navigation Bar */}
        <Navibar />    

        <div className="content">
          {/* Route to Different js */}
          <Routes>
           {/* Home Page that displays random clothes  */}
          <Route path="/" element={<Home />} />
          {/* When click on PRODUCTS CARD -> Direct to Product Info */}
          <Route path="products/:id" element={<ProductDetails />} />
          {/* Browse Donation Points
          <Route path="/donationpoints" element={<BrowseDonationPoints />} />
          {/* When click on DP CARD -> Direct to DP Info */}
          {/* <Route path="donationpoints/:id" element={<DPDetails />} /> */}
          {/* <Route path="donationpoints/:id" element={<DPDetails />} /> */} 
          {/* Browse Thrift Shops */}
          <Route path="/thriftshops" element={<BrowseThriftShops />} />
          {/* When click on TS CARD -> Direct to TS Info */}
          <Route path="thriftshops/:id" element={<TSDetails />} />

          <Route path="/search" element={<SearchBar />} />


          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
