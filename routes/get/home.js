const { searchAllLetters } = require('../../controllers/search'); 

module.exports = (req,res) => {
    // searchAllLetters(req.token, req.session)
    res.render('index', {
        searched: true, 
        allGames: res.locals.gamesByLetter
    });  
}