const { searchGameById } = require('../../controllers/search'); 

module.exports = async (req, res) => { 
    const game = await searchGameById(req.token, req.params.id);  
    if (!game.name) return res.render('game', {
        game,
        message: 'Could not load game data'
    }) 
    console.log(game); 
    return res.render('game-data', {
        game
    })
}