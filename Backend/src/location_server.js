const axios = require('axios');
const creds = require('./Key/Details.json');

const getToken = async () => {
    try{
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
        const token = await (axios(login)).json()
        const auth_token = JSON.stringify(token.access_token);
        return auth_token;

    }catch(err){
        console.log(err);
    }
}

module.exports = {
    getToken,
}


