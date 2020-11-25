const axios = require('axios'); 
const config = require('../../config/keys'); 
const { searchGameByInput } = require('../../controllers/search'); 

module.exports = async (req,res) => { 
    let games = await req.client.getObject(req.body.input)
    if (typeof games === 'string' || !games){
        const searchGames = await searchGameByInput(req.token, req.body.input)
        req.client.setObject(req.body.input, searchGames)
        return res.status(200).send(searchGames)
    }
    
    return res.status(200).send(games)
}