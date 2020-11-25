const { searchGameByInput } = require('../../controllers/search'); 

module.exports = async (req, res) => { 
    const searchGames = await req.client.getObject(req.params.input)
    return res.render('search-games', {
        searchGames, 
        input: req.params.input, 
    }); 
}