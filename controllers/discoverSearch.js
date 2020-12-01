const axios = require('axios'); 
const config = require('../config/keys'); 

const searchUpcomingReleasesPlaystation = (token) => {
    return new Promise( async (resolve, reject) => {
        const bearer = 'Bearer ' + token; 
        axios({
            url: 'https://api.igdb.com/v4/release_dates/', 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Client-ID': config.IGDB_CLIENT_ID,
                'Authorization': bearer, 
                'Content-Type': 'text/plain',
            },
            data: 'fields *, game.name, game.cover.url, game.summary; where game.platforms = {48} & date < 1600000000; sort date desc; limit 15;'
        })
        .then( apiRes => {
            resolve(apiRes.data);
        })
        .catch( err => {
            console.log(err); 
            reject('Error getting data');
        })
    })
    .catch( err => { 
        return 'Error getting game data';
    })
}

const searchBestGames = (token) => {
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
            data: 'fields *, game.name, game.cover.url, game.summary; where rating >= 80 & release_dates.date > 631152000; sort rating desc; limit 15;'
        })
        .then( apiRes => {
            resolve(apiRes.data);
        })
        .catch( err => {
            console.log(err); 
            reject('Error getting data');
        })
    })
    .catch( err => { 
        return 'Error getting game data';
    })
}

module.exports = {
    searchUpcomingReleasesPlaystation,
    searchBestGames,
}