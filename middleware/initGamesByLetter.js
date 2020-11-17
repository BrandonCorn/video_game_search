const { searchAllLetters, searchGameByLetter } = require('../controllers/search') 

module.exports = async (req, res, next) => {
    if (!req.session.gamesByLetter) {
        req.session.gamesByLetter = {}
        req.session.gamesByLetter = await searchAllLetters(req.token)
        return next()
    }
    next()
}