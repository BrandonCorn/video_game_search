const axios = require('axios'); 
const config = require('../config/keys'); 

const searchGameName = async (token) => {
    return new Promise( (resolve, reject) => {
        const creds = {
            headers: {
                'Client-ID': config.IGDB_CLIENT_ID, 
                'Authorization': `Bearer ${token}`
            }
        }

        axios.post('https://api.igdb.com/v4/games', {}, creds)
        .then( res => {
            console.log(res.data);
            resolve(res.data); 
        })
        .catch( err => {
            console.log(err); 
            reject(err); 
        })
    })
}

module.exports = {
    searchGameName, 

}