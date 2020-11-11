const axios = require('axios'); 
const config = require('../../config/keys'); 
const { searchGameByInput } = require('../../controllers/search'); 

module.exports = async (req,res) => {
    let gameData = await searchGameByInput(req.token, req.body.input); 
     
    res.status(200).send(gameData); 
}