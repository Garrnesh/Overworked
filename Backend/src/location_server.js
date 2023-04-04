const axios = require('axios');
const creds = require('./Key/Details.json');

async function getToken() {
    try{
        const token = await fetch("https://developers.onemap.sg/privateapi/auth/post/getToken", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        });
        const token_json = await token.json();
        return token_json.access_token;

    }catch(err){
        console.log("Cannot proceed");
    }
}

module.exports = getToken;