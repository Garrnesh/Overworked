const express = require('Express');
const UEN_router = express.Router();
const axios = require('axios');

UEN_router.get('/UEN/:UEN', async (req,res) => {

    const UEN = req.params.UEN;

    const params = {
        resource_id: '5ab68aac-91f6-4f39-9b21-698610bdf3f7',
    };

    const UEN_url = 'https://data.gov.sg/api/action/datastore_search' + '?resource_id=' + params.resource_id + '&q=' + UEN; 

    try {
        const verify = await axios.get(UEN_url);
        const verify_JSON = verify.data;

        if (verify_JSON.result.total == 1) {
            res.status(200).json(verify_JSON["result"]["records"]);
        } else {
            res.status(404).send("Business not found");
        }
    } catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = UEN_router;