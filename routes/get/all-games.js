const { searchGameByLetter } = require('../../controllers/search'); 


module.exports = async (req,res) => { 
    if (req.session.visits > 1) return res.render('all-games', {searched: false})
    console.log(req.session); 
    if (!req.session.gamesByLetter['a']) {
        console.log('dont have a')
        const searchGames = await searchGameByLetter(req.token, 'a'); 
        if (!searchGames[0].name) return res.render('all-games', {
            searchGames, 
            message: 'No games to load'
        })
        else return res.render('all-games', {
            searchGames, 
            searched: true
        })
    }
    return res.render('all-games', {
        searchGames: req.session.gamesByLetter['a'], 
        searched: true,
    })
}


