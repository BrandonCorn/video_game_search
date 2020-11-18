const axios = require('axios'); 
const config = require('../../config/keys'); 
const { searchGameByInput } = require('../../controllers/search'); 

module.exports = async (req,res) => { 
    if (req.session[req.body.input] && typeof req.session[req.body.input] !== 'string') return res.status(200).send(req.session[req.body.input])
    let gameData = await searchGameByInput(req.token, req.body.input); 
    if (typeof gameData === 'string') return res.status(400).send('Error getting data')
    res.status(200).send(gameData); 
}