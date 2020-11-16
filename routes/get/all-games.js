const { searchGameByLetter } = require('../../controllers/search'); 


module.exports = async (req,res) => { 
    if (!req.session.gamesByLetter['a']) {
        const searchGames = await searchGameByLetter(req.token, 'a'); 
        if (!searchGames[0].name) return res.render('all-games', {
            searchGames, 
            letter: 'a', 
            searched: true,
            allGames: {}
        })
    }
    return res.render('all-games', {
        searchGames: req.session.gamesByLetter['a'], 
        letter: 'a',
        searched: true,
        allGames: req.session.gamesByLetter
    })
}


