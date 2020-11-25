const {searchGameByLetter} = require('../controllers/search'); 

module.exports = async (req, res, next) => {
    if (req.params.input.length < 2){
        let gamesByLetter = await req.client.getObject('gamesByLetter')
        let checkLetter = gamesByLetter[req.params.input]
        if (typeof checkLetter === 'string' || !checkLetter){
            const searchGames = await searchGamesByLetter(req.token, req.params.input)
            gamesByLetter[req.params.input] = searchGames
            req.client.setObject('gamesByLetter', gamesByLetter)
        }
    }
    next()
}