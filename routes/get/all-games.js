const { searchGameByLetter } = require('../../controllers/search'); 


module.exports = async (req,res) => { 
    const searchGames = await searchGameByLetter(req.token, 'a'); 
     
    return res.render('all-games', {
        searchGames
    })
}


