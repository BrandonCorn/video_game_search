const {searchGameByLetter} = require('../controllers/search'); 

module.exports = async (req, res, next) => {
    if (req.params.input.length > 1){
        return next(); 
    }
    //this promise will catch the error of the games starting with this letter not existing, it will then send back the games. 
    let exist = await new Promise( (resolve, reject) => {
        let check = req.session.gamesByLetter[req.params.input]; 
        if (typeof check !== 'undefined' || typeof check !== 'string' || Array.isArray(check)) return res.render({
            newSearch: 0, 
            searchGames: req.session.gamesByLetter[req.params.input], 
            input: req.params.input, 
            allGames: {}
        })
        return resolve(); 
    })
    .catch(err => {
        console.log(err); 
    })
    //this means we have either an error cached for the letter or it doesnt exist
    const searchGames = await searchGameByLetter(req.token, req.params.input); 
    if (typeof searchGames === 'string' && searchGames !== null) return res.render('search-games',{
        newSearch: 0,
        searchGames: {}, 
        input: 'No games found', 
        allGames: {}
    })
    req.session.gamesByLetter[req.params.letter] = searchGames; 
    return res.render('search-games', {
        newSearch: 1, 
        searchGames: req.session.gamesByLetter[req.params.input], 
        input: req.params.input, 
        allGames: req.session.gamesByLetter
    })
    next(); 
}