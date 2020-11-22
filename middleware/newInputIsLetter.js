const {searchGameByLetter} = require('../controllers/search'); 

module.exports = async (req, res, next) => {
    if (req.params.input.length > 1){
        return next(); 
    }
    let gamesByLetter = await req.client.getObject('gamesByLetter')
    let checkLetter = gamesByLetter[req.params.input]
    if (!checkLetter || typeof checkLetter === 'string'){
        const searchGames = await searchGamesByLetter(req.token, req.params.input)
        if (typeof searchGames === 'string' || searchGames !== null) return res.render('search-games', {
            newSearch: 0, 
            searchGames: {}, 
            input: 'No games found', 
            allGames: {}
        })
        else {
            gamesByLetter[req.params.input] = searchGames
            req.client.setObject('gamesByLetter', gamesByLetter)
            return res.render('search-games', {
                newSearch: 1, 
                searchGames: searchGames, 
                input: req.params.input, 
                allGames: gamesByLetter
            })
        }
    }
    else{
        return res.render('search-games', {
            newSearch: 0, 
            searchGames: checkLetter, 
            input: req.params.input, 
            allGames: gamesByLetter
        })
    }
    //this promise will catch the error of the games starting with this letter not existing, it will then send back the games. 
    
    // let exist = await new Promise( (resolve, reject) => {
    //     let check = req.session.gamesByLetter[req.params.input];
    //     if (typeof check !== 'undefined' && typeof check !== 'string' && Array.isArray(check)) return res.render({
    //         newSearch: 0, 
    //         searchGames: req.session.gamesByLetter[req.params.input], 
    //         input: req.params.input, 
    //         allGames: {}
    //     })
    //     return resolve(); 
    // })
    // .catch(err => {
    //     console.log(err); 
    // })
    // //this means we have either an error cached for the letter or it doesnt exist
    // const searchGames = await searchGameByLetter(req.token, req.params.input); 
    // if (typeof searchGames === 'string' && searchGames !== null) return res.render('search-games',{
    //     newSearch: 0,
    //     searchGames: {}, 
    //     input: 'No games found', 
    //     allGames: {}
    // })
    // req.session.gamesByLetter[req.params.input] = searchGames; 
    // return res.render('search-games', {
    //     newSearch: 1, 
    //     searchGames: req.session.gamesByLetter[req.params.input], 
    //     input: req.params.input, 
    //     allGames: req.session.gamesByLetter
    // })
    // next(); 
}