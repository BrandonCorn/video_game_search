const axios = require('axios'); 
const config = require('../../config/keys'); 
const { searchGameByLetter } = require('../../controllers/search'); 

module.exports = async (req,res) => {
    let gameData = await searchGameByLetter(req.token, req.body.letter); 
    
    res.status(200).send(gameData); 
}