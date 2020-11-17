const { searchGameByInput } = require('../controllers/search'); 

module.exports = async (req, res, next) => {
    if (!req.session[req.params.input]){
        console.log('had to search for game'); 
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
    console.log('game input already exists and is not a letter'); 
    res.locals.newSearch = 0; 
    next(); 
}