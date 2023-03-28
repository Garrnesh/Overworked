const axios = require('axios');
const { Locations } = require("../firebase.js");
const auth = require("../location_server.js");
const { FieldValue } = require("firebase-admin/firestore");

//getLocation
const getLocation = async (req,res) => {
    try{
        const location_coll = await Locations.get();
        const location = location_coll.docs.map((doc) => doc.data());
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
}

const checkLocation = async (business_username) => {
    try{
        const location = await Locations.doc(business_username).get();
        if(location.exists){
            throw new Error("Order with order id already exists");
        }
    }catch(err){
        throw new Error("Order with order id already exists");
    }
}

const addLocation = async (business_username, postal_code) => {
    const location = Locations.doc(business_username)
    try{
        const location_data = await axios.get('https://developers.onemap.sg/commonapi/' + postal_code + '?searchVal=revenue&returnGeom=Y&getAddrDetails=Y');
        const latitude = location_data["results"]["LATITUDE"];
        const longitude = location_data["results"]["LONGITUDE"];
        await location.set({
            latitude: latitude,
            longitude: longitude});
    }catch(err){
        throw new Error("Ubale to add location")
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
        const location_data = await axios.get('https://developers.onemap.sg/commonapi/' + postal_code + '?searchVal=revenue&returnGeom=Y&getAddrDetails=Y');
        const latitude = location_data["results"]["LATITUDE"];
        const longitude = location_data["results"]["LONGITUDE"];
        const location = {latitude, longitude};
        if (location.exists){
            return location;
        }
    }catch(err){
        throw new Error("Location cannot be identified")
    }
}

const getRoute = async (latitude_person, longitude_person, latitude_business, longitude_business, route_type) => {
    try{
        // const latitude_person = latitude_person;
        // const longitude_person = longitude_person;
        // const latitude_business = latitude_business;
        // const longitude_business = longitude_business;
        const routeType = route_type;
        
        if (route_type != "pt"){
            const route_unfiltered = await axios.get(`https://developers.onemap.sg/privateapi/routingsvc/route?start=${latitude_person,longitude_person}&end=${latitude_business,longitude_business}&routeType=${routeType}&token=${auth}`);
        }else{
            const timeValue = FieldValue.serverTimestamp();
            const dateTimeValue = timeValue.toDate(); 
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
            const route_unfiltered_pt = await axios.get(`https://developers.onemap.sg/privateapi/routingsvc/route?start=${latitude_person,longitude_person}&end=${latitude_business,longitude_business}&routeType=${routeType}&token=${auth}&date=${formattedDate}&time=${formattedTime}&mode=TRANSIT`);
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




// Location_router.get('/location', async(req,res) => {
//     try{
//         const location = await Locations.get();
//         res.status(200).json(location);
//     }catch(err){
//         res.status(404).json("Location not found");
//     }
// })

// Location_router.post('/location', async(req,res) => {
//     const { shop_id, postal_code } = req.body;
//     try{
//         const location_data = await axios.get('https://developers.onemap.sg/commonapi/' + postal_code + '?searchVal=revenue&returnGeom=Y&getAddrDetails=Y');
//         const lat = location_data["results"]["LATITUDE"];
//         const long = location_data["results"]["LONGITUDE"];
//         const location = Locations.doc(shop_id);
//         await location.set({
//             lat: lat,
//             long: long,
//         });
//     }catch(err){
//         res.status(500).send(err.message);
//     }
// });


