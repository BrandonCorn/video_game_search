const {searchGameByLetter} = require('../controllers/search'); 

module.exports = async (req, res, next) => {
    if (req.session.gamesByLetter[req.params.input]){
        if (req.session.gamesByLetter[req.params.input].message) { 
            const searchGames = await searchGameByLetter(req.token, req.params.input); 
            if (!searchGames[0].name) return res.render('search-games',{
                newSearch: 0,
                searchGames: {}, 
                input: 'No games found', 
                allGames: {}
            })
            req.session.gamesByLetter[req.params.letter] = searchGames; 
            return res.render('search-games', {
                newSearch: 1, 
                searchGames: req.session.gamesByLetter[req.params.input], 
                input: req.params.input, 
                allGames: req.session.gamesByLetter
            })
        }

        return res.render('search-games', {
            newSearch: 0, 
            searchGames: req.session.gamesByLetter[req.params.input], 
            input: req.params.input, 
            allGames: {}
        }) 
    } 
    next()
}