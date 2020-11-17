const { searchGameByInput } = require('../controllers/search'); 

module.exports = async (req, res, next) => {
    if (!req.session[req.params.input] || typeof req.session[req.params.input] !== String){
        const searchGames = await searchGameByInput(req.token, req.params.input); 
        if (!searchGames[0]) return res.render('search-games', {
            newSearch: 0,
            searchGames, 
            input: 'No games found', 
            allGames: req.session.gamesByLetter
        });
        res.locals.newSearch = 1; 
        req.session[req.params.input] = searchGames; 
        next(); 
    }
    res.locals.newSearch = 0; 
    next(); 
}