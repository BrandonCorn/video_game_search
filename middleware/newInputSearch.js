const { searchGameByInput} = require('../controllers/search'); 

module.exports = async (req, res, next) => { 
    const length = () => req.params.input.length; 
    if (length > 1) {
        let games = await req.client.getObject(req.params.input)
        if (typeof games === 'string' || !games){
            const searchGames = await searchGameByInput(req.token, req.params.input)
            req.client.setObject(req.params.input, searchGames)
        }
    }
    next()
}