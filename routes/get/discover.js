const { searchUpcomingReleasesPlaystation } = require('../../controllers/search'); 

module.exports = async (req, res) => { 
    const game = await searchUpcomingReleasesPlaystation(req.token);  
    if (!game.name) return res.render('game', {
        game,
        message: 'Could not load game data'
    }) 
    console.log(game); 
    return res.render('discover', {
        game
    })
}