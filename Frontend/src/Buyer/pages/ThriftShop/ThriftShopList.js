import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


const ThriftShopList = ({ thriftshops }) => {

  const [thriftshop, setThriftShop] = useState(thriftshops);
  
  const filterResult = (dp_ornot) => {
    const result = thriftshops.filter((curData) => {
      return curData.donation === dp_ornot;
    });
    setThriftShop(result);
  }

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
        },
        function(error) {
          console.error("Error getting current position: " + error.message);
          setError("Error getting current position. Please try again later.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  }

  async function getRoute(username){
    const check = {
      "latitude_person": String(latitude),
      "longitude_person": String(longitude),
      "business_username": username,
      "route_type": "drive"
    };
    const response = await fetch('http://localhost:8000/locations/routes', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(check)
    });
    if(response.ok){
      const response_json = await response.json()
      const distance = response_json["route_summary"]["total_distance"]
      return distance
    }
  }

  async function sortShop(){
    const before_sort = {};
    const thriftshopsorted = [];
    getLocation();
    console.log(latitude);
    console.log(longitude);

    if (latitude !== null && longitude !== null) {
      for (let i=0; i<thriftshop.length; i++){
        const username = thriftshop[i].id
        before_sort[username] = await getRoute(username)
      }
      const sortedArray = Object.entries(before_sort).sort((a, b) => a[1] - b[1]);
      const sortedObj = Object.fromEntries(sortedArray); //This will sort the object
      const sortedKeys = Object.keys(sortedObj); //This will return the sorted keys as an array
      for (let j=0; j<sortedKeys.length; j++){
        for(let k=0; k<thriftshop.length; k++){
          if(sortedKeys[j] === thriftshop[k].id){
            thriftshopsorted[j] = thriftshop[k]
          }
        }
      }
      setThriftShop(thriftshopsorted);
      // setIsLoading(false);
    }
  }
  
  sortShop();

  return (
    <>
      {/* <h2 className="text-center text-info">Browse Thrift Shops</h2> */}

      {/* filter */}
      <div className="container-fluid mx-2">
        <div className="row mt-5 mx-2">
          <div className="col-md-3">
            <h2 className="text">Filter Thrift Shops</h2>
            <button className="btn btn-outline-dark w-100 mb-4" onClick = {()=>filterResult('True')}>Donation Point</button>
            <button className="btn btn-outline-dark w-100 mb-4" onClick = {() => setThriftShop(thriftshops)}>All Thrift Shops</button>
            {/* <button className="btn btn-outline-dark w-100 mb-4" onClick={sortShop()}>Sort by Location</button> */}
            <button className="btn btn-outline-dark w-100 mb-4" onClick={sortShop}>Sort by Location</button>

          </div>

          <div className="col-md-9">
            <div className="row">
              
              {/* display products */}
              {/* the first thriftshop is from the usestate thriftshop */}
              {thriftshop.map((thriftshop) => {
                const{id, shop_name, shop_address} = thriftshop;
                return(
                <>
                  <div key={id} className="col mb-2" >

                      <Link to={`/thriftshops/${id}`} style={{ textDecoration: 'none', color: '#000000' }}>
                        <Card className="card" style={{ width: '45rem' }}>
                          <Card.Body>
                            <Card.Title>{shop_name}</Card.Title>
                            <Card.Text>Address: {shop_address}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Link>
                  </div>
                </>
              )})}
            </div>
          </div>
        </div>
      </div>

  
    </>
  )
}

export default ThriftShopList;