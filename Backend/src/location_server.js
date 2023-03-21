const axios = require('axios');
const creds = require('./Key/Details.json');

const getToken = async () => {
    try{
        var login = 
        {
            method: 'POST',
            headers:
            {
                'content-type': 'application/json'
            },
            json: JSON.stringify(creds)
        };
        const token = await (axios.get('https://developers.onemap.sg/privateapi/auth/post/getToken', getToken)).json()
        const auth_token = token.access_token;
        return auth_token;

    }catch(err){
        console.log(err);
    }
}


