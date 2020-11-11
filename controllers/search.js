const axios = require('axios'); 
const config = require('../config/keys'); 

const searchGameByLetter = async (token, letter) => {
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
            data: `fields name; sort name asc; where name ~ "${letter}"*; limit 500;`
        })
        .then( apiRes => {
            console.log(apiRes);
            return resolve(apiRes.data);  
        })
        .catch( err => {
            console.log(err); 
            return reject(err); 
        })
    })
    .catch( err => {
        return err; 
    })
}


const searchGameByInput = (token, input) => {
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
            data: `fields name; sort name asc; where name ~ *"${input}"*; limit 50;`
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
    searchGameByLetter, 
    searchGameByInput
}