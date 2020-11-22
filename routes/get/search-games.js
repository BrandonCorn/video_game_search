const { searchGameByInput } = require('../../controllers/search'); 

module.exports = async (req, res) => { 

    return res.render('search-games', {
        searchGames: res.locals.game, 
        input: req.params.input, 
        newSearch: res.locals.newSearch, 
        allGames: {}
    }); 
}