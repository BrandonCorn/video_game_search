const { searchGameByInput } = require('../../controllers/search'); 

module.exports = async (req, res) => {
    if (!!req.session.sameSearch) return res.render('search-games', {
        input: req.params.input, 
        sameSearch: req.session.sameSearch,
    })
 
    const searchGames = await searchGameByInput(req.token, req.params.input)
    if (!searchGames[0]) return res.render('search-games', {
        searchGames, 
        input: 'No games found'
    });

    return res.render('search-games', {
        searchGames, 
        input: req.params.input, 
        sameSearch: req.session.sameSearch, 
    }); 
}