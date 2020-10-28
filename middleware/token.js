const axios = require('axios'); 
const config = require('../config/keys'); 

module.exports = (req,res,next) => {
    axios.post(`https://id.twitch.tv/oauth2/token?client_id=${config.IGDB_CLIENT_ID}&client_secret=${config.IGDB_CLIENT_SECRET}&grant_type=client_credentials`)
    .then( apiRes => {
        req.token = apiRes.data.access_token;  
        next(); 
    })
    .catch( err => {
        console.log(err); 
        return res.status(400).send('Error'); 
    })


}