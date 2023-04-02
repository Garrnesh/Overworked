import { useNavigate, useParams} from "react-router-dom";
import useFetch from "../../../useFetch";
import React, { useState,  useEffect  } from "react";
// import GoogleMapReact from 'google-map-react';

const TSDetails = () => {
  const { id } = useParams();
  const { data: thriftshop, error, isPending } = useFetch('http://localhost:8000/shops/' + id);
  const navigate = useNavigate();

  const [mapSource, setMapSource] = useState(null);
  console.log(id);
  async function fetchMap(id) {
    try {
    const response = await fetch("http://localhost:8000/locations/" + id, {
        method: 'GET',
    });
    const response_json = await response.json(); // await is needed here
    const latitude = response_json["latitude"];
    const longitude = response_json["longitude"];
    const postal_code = response_json["postal_code"];
    console.log(latitude, longitude, postal_code);
    const url = `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&postal=${postal_code}&zoom=17&height=512&width=512&points=[${latitude},${longitude},"255,255,178","A"]`;    // const mapResponse = await fetch(https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&postal=636960&zoom=17&height=512&width=512&points=[1.35381999263169,%20103.688242893188,%22255,255,178%22,%22A%22]);
    console.log(url);
    setMapSource(url);
    // return url;
    }catch(err) {
        console.log(err);
    }
} 
console.log(fetchMap(id));
  
  // console.log("image", mapSource);

  return (

    <div className="thriftshop-details">

      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {thriftshop && (
        <div className="row p-5">
          <div className="col-md-7 d-none d-md-block ml-4">
            <div className="col-md-9 pt-0 text-center text-md-start">
              <h2>
                <div className="product_brand fw-bold">{thriftshop.shop_name}</div>
              </h2>
              <p className="description">{thriftshop.shop_description}</p>
              {/* <p className="address"><span className="text-muted">Address: </span> <span>{thriftshop.shop_address }</span></p> */}

            </div>

          </div>

          {/* <!-- add picture carousel--> */}
          
          <div id="thrift" className="col-md-5 ml-5 p-4 justify-content-end pb-2">
            <img
              className="d-block w-100"
              src= {mapSource}
              alt="First slide"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "contain"
              }}

            />
          </div>
        </div>
      )}
    </div>
  );
}


export default TSDetails;