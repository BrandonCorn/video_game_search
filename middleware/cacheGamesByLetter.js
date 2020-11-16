const { searchGameByLetter } = require('../controllers/search'); 

module.exports = async (req, res, next) => {
    console.log('session: ', req.session.gamesByLetter[req.body.letter])
    if (!req.session.gamesByLetter) req.session.gamesByLetter = {}
    if (req.session.gamesByLetter[req.body.letter]) {
        res.locals.games = req.session.gamesByLetter[req.body.letter]
        next()
    }
    else{
        const searchGames = await searchGameByLetter(req.token, req.body.letter)
        if (!searchGames) return res.status(400).send('error getting data')
        req.session.gamesByLetter[req.body.letter] = searchGames;
        res.locals.games = req.session.gamesByLetter[req.body.letter]
        next()
    }
}





