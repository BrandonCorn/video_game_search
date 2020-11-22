const { render } = require("ejs");

module.exports = (req, res) => {
    return res.render('discover', {
        searched: true, 
        allGames: res.locals.gamesByLetter
    }); 
}