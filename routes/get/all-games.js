const { searchGameByLetter } = require('../../controllers/search'); 


module.exports = async (req,res) => { 
    return res.render('all-games', {
        searched: true,
        allGames: res.locals.gamesByLetter
    })
}


