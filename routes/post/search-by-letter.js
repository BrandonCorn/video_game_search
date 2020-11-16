const { searchGameByLetter } = require('../../controllers/search'); 

module.exports = async (req,res) => {
    // let gameData = await searchGameByLetter(req.token, req.body.letter); 
    // if (!gameData) return res.status(400).send('Error getting data');  
    // console.log(gameData); 
    // res.status(200).send(gameData);
    // res.status(200).send('made it') 
    // res.status(200).send(req.session.gamesByLetter[req.body.letter])
    res.status(200).send(res.locals.games); 
}