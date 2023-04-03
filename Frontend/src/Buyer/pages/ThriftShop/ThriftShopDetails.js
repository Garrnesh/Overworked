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
    // console.log(latitude, longitude, postal_code);
    const url = `https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&postal=${postal_code}&zoom=17&height=512&width=512&points=[${latitude},${longitude},"255,255,178","A"]`;    // const mapResponse = await fetch(https://developers.onemap.sg/commonapi/staticmap/getStaticImage?layerchosen=default&postal=636960&zoom=17&height=512&width=512&points=[1.35381999263169,%20103.688242893188,%22255,255,178%22,%22A%22]);
    setMapSource(url);
    // return url;
    }catch(err) {
        console.log(err);
    }
  } 
  console.log(fetchMap(id));

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [err, setError] = useState(null);

  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setError(null);
        },
        function(err_m) {
          console.err("Error getting current position: " + err_m.message);
          setError("Error getting current position. Please try again later.");
        }
      );
    } else {
      console.err("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  }

  async function getRoute(username, type){
    const check = {
      "latitude_person": String(latitude),
      "longitude_person": String(longitude),
      "business_username": username,
      "route_type": type
    };
    const response = await fetch('http://localhost:8000/locations/routes', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(check)
    });
    if(response.ok){
      const response_json = await response.json()
      return response_json
    }
  }

  async function getDirections(){
    getLocation();
    console.log(latitude);
    console.log(longitude);
    let route_drive = {}
    let route_pt = {}
    let final_route_drive = {}
    let final_route_pt = {}
    const type_drive = "drive"
    const type_pt = "pt"
    if (latitude !== null && longitude !== null) {
      route_drive = await getRoute(id, type_drive)
      console.log(route_drive)
      route_pt = await getRoute(id, type_pt)
      console.log(route_pt)
      //Formating route_drive
      final_route_drive["Distance"] = String((route_drive["route_summary"]["total_distance"])/1000) + " km"
      final_route_drive["Time"] = String(Math.floor((route_drive["route_summary"]["total_time"])/60)) + " min"
      let route_direction_drive = []
      for(let i=0; i<route_drive["route_instructions"].length; i++){
        if(i==0){
          route_direction_drive[i] = (route_drive["route_instructions"][i])[9]
        }else{
          route_direction_drive[i] = "In " + (route_drive["route_instructions"][i-1])[5] + " " + (route_drive["route_instructions"][i])[9];
        }
      }
      final_route_drive["Directions"] = route_direction_drive;
      // console.log(final_route_drive)
      const route_info_pt= route_pt["plan"]["itineraries"][0]

      // Formatting route_pt
      final_route_pt["Time"] = String(Math.floor((route_info_pt["duration"])/60)) + " min"
      final_route_pt["Walking distance"] = String(route_info_pt["walkDistance"]) + " meters"
      let route_direction_pt = []
      for (let j=0; j<route_info_pt["legs"].length; j++){
        if (((route_info_pt["legs"])[j])["mode"] === "SUBWAY"){
          route_direction_pt[j] = "BOARD TRAIN AT " + ((route_info_pt["legs"])[j])["from"]["stopCode"] + " " + ((route_info_pt["legs"])[j])["from"]["name"] + " AND ALIGHT AT " + ((route_info_pt["legs"])[j])["to"]["stopCode"] + " " + ((route_info_pt["legs"])[j])["to"]["name"];
        }
        if(((route_info_pt["legs"])[j])["mode"] === "BUS"){
          route_direction_pt[j] = "BOARD BUS " + ((route_info_pt["legs"])[j])["route"] + " AT " + ((route_info_pt["legs"])[j])["from"]["stopCode"] + " " + ((route_info_pt["legs"])[j])["from"]["name"] + " AND ALIGHT AT " + ((route_info_pt["legs"])[j])["to"]["stopCode"] + " " + ((route_info_pt["legs"])[j])["to"]["name"];
        }
      }
      final_route_pt["Directions"] = route_direction_pt
      console.log(final_route_pt)
    }
  }

  
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
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={getDirections}>Get directions</button>
              </div>

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