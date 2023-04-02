import { Link } from "react-router-dom";
import React, {useState} from "react";
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
  console.log(latitude, longitude)
  console.log(thriftshop)

  // async function Sort_location() {
  //   const [distance_shops, setDistanceShops] = useState({});
  //   thriftshop && thriftshop.map((thriftshop) => { 
  //     const location_pre = {
  //       "latitude_person": String(latitude),
  //       "longitude_person": String(longitude),
  //       "business_username": String(thriftshop.id),
  //       "route_type": "drive"
  //     };
  //     try {
  //       const response =  fetch('http://localhost:8000/locations/routes', {
  //         method: 'POST',
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(location_pre)
  //       });
  //       if (response.ok) {
  //         // console.log(response)
  //         const response_json =  response.json();
  //         console.log(response_json)
  //         const distance = response_json["route_summary"]["total_distance"];
  //         distance_shops[thriftshop.id] = distance;
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })
  //   setDistanceShops(distance_shops);
  //   const sortedShops = distance_shops.sort((a, b) => a.distance - b.distance);
  //   console.log(sortedShops)
  // }

  async function Sort_location() {
    const [distance_shops, setDistanceShops] = useState({});
      const location_pre = {
        "latitude_person": latitude,
        "longitude_person": longitude,
        "business_username": "Bayan Hall",
        "route_type": "drive"
      };
      try {
        const response = await fetch('http://localhost:8000/locations/routes', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(location_pre)
        });
        if (response.ok) {
          // console.log(response)
          const response_json = await response.json();
          console.log(response_json)
          // const distance = response_json["route_summary"]["total_distance"];
          // distance_shops[thriftshop[i].id] = distance;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  // async function Sort_location() {
  //   const [distance_shops, setDistanceShops] = useState({});
  //   for (let i = 0; i < thriftshop.length; i++) {
  //     const location_pre = {
  //       "latitude_person": latitude,
  //       "longitude_person": longitude,
  //       "business_username": thriftshop[i].id,
  //       "route_type": "drive"
  //     };
  //     try {
  //       const response = await fetch('http://localhost:8000/locations/routes', {
  //         method: 'POST',
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(location_pre)
  //       });
  //       if (response.ok) {
  //         // console.log(response)
  //         const response_json = await response.json();
  //         console.log(response_json)
  //         const distance = response_json["route_summary"]["total_distance"];
  //         distance_shops[thriftshop[i].id] = distance;
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   setDistanceShops(distance_shops);
  //   const sortedShops = distance_shops.sort((a, b) => a.distance - b.distance);
  //   console.log(sortedShops)
  // }

  Sort_location();
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
            <button className="btn btn-outline-dark w-100 mb-4" onClick={getLocation}>Sort by Location</button>
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