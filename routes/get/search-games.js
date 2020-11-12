const { searchGameByInput } = require('../../controllers/search'); 

module.exports = async (req, res) => {
    const searchGames = await searchGameByInput(req.token, req.params.search)
    if (!searchGames[0]) return res.render('search-games', {
        searchGames, 
        search: 'No games found'
    });
   
    return res.render('search-games', {
        searchGames, 
        search: req.params.search
    }); 
}