const { searchGameByInput } = require('../controllers/search'); 

module.exports = async (req, res, next) => { 
    if (typeof req.session[req.params.input] == 'undefined' || typeof req.session[req.params.input] != 'object'){
        const searchGames = await searchGameByInput(req.token, req.params.input); 
        if (!searchGames[0]) return res.render('search-games', {
            newSearch: 0,
            searchGames, 
            input: 'No games found', 
            allGames: req.session.gamesByLetter
        });
        res.locals.newSearch = 1; 
        req.session[req.params.input] = searchGames; 
        return next(); 
    }
    if(typeof req.session[req.params.input] === 'string') {
        const searchGames = await searchGameByInput(req.token, req.params.input); 
        if (!searchGames[0]) return res.render('search-games', {
            newSearch: 0,
            searchGames, 
            input: 'No games found', 
            allGames: req.session.gamesByLetter
        });
        res.locals.newSearch = 1; 
        req.session[req.params.input] = searchGames; 
        return next(); 
    }
    res.locals.newSearch = 0; 
    next(); 
}