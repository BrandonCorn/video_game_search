const axios = require('axios'); 
const config = require('../config/keys'); 

const searchGameName = async (token) => {
    return new Promise( async (resolve, reject) => {
        const bearer = 'Bearer ' + token; 
        axios({
            url: 'https://api.igdb.com/v4/games/', 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',  
                'Client-ID': config.IGDB_CLIENT_ID,
                'Authorization': bearer, 
                'Content-Type': 'text/plain',
            },
            data: 'fields name; where name ~ "a"*; limit 20;'
        })
        .then( apiRes => {
            console.log(apiRes);
            resolve(apiRes.data);  
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