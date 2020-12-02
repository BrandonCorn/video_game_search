const { searchGameById } = require('../../controllers/search'); 

module.exports = async (req, res) => { 
    // const game = await searchGameById(req.token, req.params.id); 
    const game = await req.client.getObject(req.params.id)
    if (!game.name) return res.render('game-data', {
        game,
        message: 'Could not load game data'
    })  
    return res.render('game-data', {
        game
    })
}