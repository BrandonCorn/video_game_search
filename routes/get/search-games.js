const { searchGameByInput } = require('../../controllers/search'); 

module.exports = async (req, res) => { 

    return res.render('search-games', {
        searchGames: req.session[req.params.input], 
        input: req.params.input, 
        newSearch: res.locals.newSearch, 
        allGames: req.session.gamesByLetter 
    }); 
}