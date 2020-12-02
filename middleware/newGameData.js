const search = require('../controllers/search')
const { searchGameById } = require('../controllers/search')

module.exports = async (req, res, next) => {
    let game = await req.client.getObject(req.params.id)
    if (!game) {
        const newGame = await searchGameById(req.token, req.params.id)
        req.client.setObject(req.params.id, newGame); 
    }
    next()
}