const axios = require('axios');
const creds = require('./Key/Details.json');

async function getToken() {

    var login = 
    {
        method: 'POST',
        url: 'https://developers.onemap.sg/privateapi/auth/post/getToken',
        headers:
        {
            'cache-control': 'no-cache, max-age=0',
            'content-type': 'application/json'
        },
        json: JSON.stringify(creds)
    };
    try{
        const token = await axios(login);
        const token_json = token.json();
        const auth_token = token_json.access_token;
        return auth_token;

    }catch(err){
        console.log("Cannot proceed");
    }
}

module.exports = getToken;