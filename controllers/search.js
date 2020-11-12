const axios = require('axios'); 
const config = require('../config/keys'); 

//Search for games starting with a given letter
//@Params: (token) api token for access to data, (letter) letter that games start with from the query 
//@Returns: an object containing the name of a game and url to an image of the games cover
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
            data: `fields name, cover.url; sort name asc; where name ~ "${letter}"*; limit 300;`
        })
        .then( apiRes => {
            return resolve(apiRes.data);  
        })
        .catch( err => { 
            console.log(typeof err)
            return reject(err); 
        })
    })
    .catch( err => {
        return err; 
    })
}

//Searches for a game that contains the provided input in any place of the title
//@Params: (token) api token for access to data, (input) input that we search for in game titles 
//@Returns: an object containing the name of a game and url to an image of the games cover
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
            data: `fields name, cover.url; sort name asc; where name ~ *"${input}"*; limit 50;`
        })
        .then( apiRes => {
            resolve(apiRes.data);  
        })
        .catch( err => {
            console.log(err); 
            reject(err); 
        })
    })
    .catch( err => {
        console.log(err); 
        return err; 
    })
}

//Searches for a specific game by id to get all data about the game
//@Params: (token) api token for access to data, (id) the id of the game in the API's db
const searchGameById = (token, id) => {
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
            data: `fields name,cover.url,summary,first_release_date,genres.name,involved_companies.company.name,platforms.name,rating,screenshots.url, url,game_modes.name; where id = ${id};`
        })
        .then( apiRes => {
            //searching for only game, request returns array so grab the game from first position
            resolve(apiRes.data[0]);  
        })
        .catch( err => {
            console.log(err); 
            reject(err); 
        })
    })
    .catch( err => {
        console.log(err); 
        return err; 
    })
}

module.exports = {
    searchGameByLetter, 
    searchGameByInput, 
    searchGameById
}