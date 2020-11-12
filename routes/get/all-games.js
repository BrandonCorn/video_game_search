const { searchGameByLetter } = require('../../controllers/search'); 


module.exports = async (req,res) => { 
    const searchGames = await searchGameByLetter(req.token, 'a'); 
    if (!searchGames[0].name) return res.render('all-games', {
        searchGames, 
        message: 'No games to load'
    })
    return res.render('all-games', {
        searchGames
    })
}


