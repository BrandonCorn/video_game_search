const { searchGameById } = require('../../controllers/search'); 

module.exports = async (req, res) => {
    console.log(req.params.id); 
    console.log(req.params.name);  
    // const game = await searchGameById(req.token, id); 
    // if (!game.name) return res.render('game', {
    //     message: 'Could not load game data'
    // })
    // return res.render('game', {
    //     game
    // })
}