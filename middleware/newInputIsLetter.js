const {searchGameByLetter} = require('../controllers/search'); 

module.exports = async (req, res, next) => {
    const length = () => req.params.input.length; 
    if (length < 2){
        let gamesByLetter = await req.client.getObject('gamesByLetter')
        let checkLetter = gamesByLetter[req.params.input]
        if (typeof checkLetter === 'string' || !checkLetter){
            const searchGames = await searchGameByLetter(req.token, req.params.input)
            gamesByLetter[req.params.input] = searchGames
            req.client.setObject('gamesByLetter', gamesByLetter)
        }
    }
    next()
}