const { searchGameByInput } = require('../../controllers/search'); 

module.exports = async (req, res) => { 
    let searchGames; 
    const length = () => req.params.input.length; 
    if (length > 1) {
        searchGames = await req.client.getObject('gamesByLetter')[req.params.input]; 
    }
    else {
        searchGames = await req.client.getObject(req.params.input); 
    }
    return res.render('search-games', {
        searchGames, 
        input: req.params.input, 
    }); 
}