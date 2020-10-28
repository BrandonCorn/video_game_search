const axios = require('axios'); 
const config = require('../../config/keys'); 
const { searchGameName } = require('../../controllers/search'); 

module.exports = async (req,res) => {
    let gameData = await searchGameName(req.token); 
    console.log(gameData); 
    res.status(200).send(gameData); 
}