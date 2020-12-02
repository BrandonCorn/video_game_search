const { searchAllLetters, searchGameByLetter } = require('../controllers/search') 

module.exports = async (req, res, next) => {
    const gamesByLetter = await req.client.getObject('gamesByLetter')
    if (!gamesByLetter){
        const getGamesByLetter = await searchAllLetters(req.token)
        req.client.setObject('gamesByLetter', getGamesByLetter); 
        res.locals.gamesByLetter = getGamesByLetter;
        next() 
    }
    res.locals.gamesByLetter =  gamesByLetter
    next()
}