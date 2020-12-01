const axios = require('axios'); 
const config = require('../config/keys'); 
const search = require('./search');
const {searchGameById} = require('./search'); 


const searchUpcomingReleases = (token, platform) => {
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
            data: `fields *, game.name, game.cover.url, game.summary, date; where game.platforms = {${platform}} & date > 1606845655119; sort date desc; limit 5;`
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


//in the results, the first three positions contain upcoming releases for pc, ps4, and switch respectively, the next three positions are hardcoded popular
//games, and the last two positions are Brandon and Mike's favorite games
const searchAllDiscover = token => {
    return new Promise( async (resolve, reject) => {
        const discoverSearchResults = await Promise.all([searchUpcomingReleases(token, 6), searchUpcomingReleases(token, 48),
            searchUpcomingReleases(token, 130),searchGameById(token, 1029),
            searchGameById(token, 14548),searchGameById(token, 136976), 
            searchGameById(token, 1221), searchGameById(token, 43264)])
        
        resolve(discoverSearchResults); 
    })
    .catch( err => {
        console.log(err)
        return 'Error getting game data'
    })
}

module.exports = {
    searchUpcomingReleases,
    searchAllDiscover
}