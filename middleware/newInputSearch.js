const { searchGameByInput, searchGameByLetter } = require('../controllers/search'); 

module.exports = async (req, res, next) => { 
    let game = await req.client.getObject(req.params.input)
    
    if (typeof game === 'string' || !game){
        console.log('game not exist')
        const searchGame = await searchGameByInput(req.token, req.params.input)
        if (typeof searchGame === 'string') {
            console.log('didnt find game')
            res.locals.newSearch = 0
            res.locals.game = {}
            next()
        }
        else{
            console.log('found game and sent back')
            req.client.setObject(req.params.input)
            res.locals.newSearch = 1
            res.locals.game = searchGame
            next()
        }
    }
    console.log('game exists and sent it')
    res.locals.game = game
    res.locals.newSearch = 0
    next()
    
    // if (typeof req.session[req.params.input] == 'undefined' || typeof req.session[req.params.input] != 'object'){
    //     const searchGames = await searchGameByInput(req.token, req.params.input); 
    //     if (!searchGames[0]) return res.render('search-games', {
    //         newSearch: 0,
    //         searchGames, 
    //         input: 'No games found', 
    //         allGames: req.session.gamesByLetter
    //     });
    //     res.locals.newSearch = 1; 
    //     console.log(searchGames); 
    //     res.locals.game = searchGames;
    //     req.session[req.params.input] = searchGames; 
    //     return next(); 
    // }
    // if(typeof req.session[req.params.input] === 'string') {
    //     const searchGames = await searchGameByInput(req.token, req.params.input); 
    //     if (!searchGames[0]) return res.render('search-games', {
    //         newSearch: 0,
    //         searchGames, 
    //         input: 'No games found', 
    //         allGames: req.session.gamesByLetter
    //     });
    //     res.locals.newSearch = 1; 
    //     req.session[req.params.input] = searchGames; 
    //     return next(); 
    // }
    // res.locals.newSearch = 0; 
    // res.locals.game = req.session[req.params.input]
    // next(); 
}