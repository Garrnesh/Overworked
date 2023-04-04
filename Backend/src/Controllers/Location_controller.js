const axios = require('axios');
const { Locations } = require("../firebase.js");
const getToken = require("../location_server.js");
const { FieldValue } = require("firebase-admin/firestore");

//getLocation
const getLocation = async (req,res) => {
    try{
        const location_coll = await Locations.get();
        const location = location_coll.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(location);
    }catch(err){
        res.status(500).send(err.message);
    }
}

const getLocationByBusinessUsername = async (business_username) => {
    const location = await Locations.doc(business_username).get();
    if(location.exists){
        return location;
    }else{
        throw new Error("Location does not exist");
    }
};

const checkLocation = async (business_username) => {
    try{
        const location = await Locations.doc(business_username).get();
        if(location.exists){
            throw new Error("Order with order id already exists");
        }
    }catch(err){
        throw new Error("Order with order id already exists");
    }
};

const addLocation = async (business_username, postal_code) => {
    const location = Locations.doc(business_username);
    try{
        const location_data_obtain = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${postal_code}&returnGeom=Y&getAddrDetails=Y`);
        const location_data_json = location_data_obtain.data;
        const location_data = location_data_json["results"][0];
        const latitude = location_data["LATITUDE"];
        const longitude = location_data["LONGITUDE"];
        await location.set({
            latitude: latitude,
            longitude: longitude,
            postal_code: postal_code});
    }catch(err){
        throw new Error("Unable to add location")
    }
};

const removeLocation = async (business_username) => {
    try{
        await Locations.doc(business_username).delete();
    }catch(err){
        throw new Error("Unable to delete location");
    }
}

const identifyLocation = async (postal_code) => {
    try{
        const location_data_obtain = await axios.get(`https://developers.onemap.sg/commonapi/search?searchVal=${postal_code}&returnGeom=Y&getAddrDetails=Y`);
        const location_data_json = location_data_obtain.data;
        const location_data = location_data_json["results"][0];
        const latitude = location_data["LATITUDE"];
        const longitude = location_data["LONGITUDE"];
        const location = {latitude, longitude};
        return location;
    }catch(err){
        throw new Error("Location cannot be identified")
    }
}

const getRoute = async (latitude_person, longitude_person, latitude_business, longitude_business, route_type) => {
    try{
        const routeType = route_type;
        const token = await getToken();
        if (route_type != "pt"){
            const route_unfiltered = await axios.get(`https://developers.onemap.sg/privateapi/routingsvc/route?start=${latitude_person},${longitude_person}&end=${latitude_business},${longitude_business}&routeType=${routeType}&token=${token}`);
            const route_unfiltered_json = route_unfiltered.data;
            console.log(route_unfiltered_json);
            return route_unfiltered_json;
        }else{
            const timeValue = FieldValue.serverTimestamp();
            let dateTimeValue = new Date();
            // try{
            //     dateTimeValue = timeValue.toDate(); 
            // }catch(err){
            //     console.log(err)
            // }    
            const formatDate = { 
                timeZone: "Asia/Singapore", 
                year: "numeric", 
                month: "2-digit", 
                day: "2-digit" 
            };
            const formatTime = { 
                timeZone: "Asia/Singapore", 
                hour12: false, 
                hourCycle: "h23",
                hour: "2-digit", 
                minute: "2-digit", 
                second: "2-digit" 
            };
            const formattedDate = dateTimeValue.toLocaleDateString("en-US", formatDate);
            const formattedTime = dateTimeValue.toLocaleTimeString("en-US", formatTime);
            const route_unfiltered_pt = await axios.get(`https://developers.onemap.sg/privateapi/routingsvc/route?start=${latitude_person},${longitude_person}&end=${latitude_business},${longitude_business}&routeType=${routeType}&token=${token}&date=${formattedDate}&time=${formattedTime}&mode=TRANSIT`);
            const route_unfiltered_json = route_unfiltered_pt.data;
            return route_unfiltered_json;
        }
    }catch(err){
        throw new Error("Route cannot be found");
    }
}

module.exports = {
    getLocation,
    getLocationByBusinessUsername,
    checkLocation,
    addLocation,
    removeLocation,
    identifyLocation,
    getRoute,
}

