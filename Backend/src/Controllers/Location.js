const express = require('Express');
const Location_router = express.Router();
const axios = require('axios');

const { Locations } = require("../firebase.js");
const auth = require("../location_server.js");

Location_router.get('/location', async(req,res) => {
    try{
        const location = await Locations.get();
        res.status(200).json(location);
    }catch(err){
        res.status(404).json("Location not found");
    }
})

Location_router.post('/location', async(req,res) => {
    const { shop_id, postal_code } = req.body;
    try{
        const location_data = await axios.get('https://developers.onemap.sg/commonapi/' + postal_code + '?searchVal=revenue&returnGeom=Y&getAddrDetails=Y');
        const lat = location_data["results"]["LATITUDE"];
        const long = location_data["results"]["LONGITUDE"];
        const location = Locations.doc(shop_id);
        await location.set({
            lat: lat,
            long: long,
        });
    }catch(err){
        res.status(500).send(err.message);
    }
});

//Add getting distance and route

