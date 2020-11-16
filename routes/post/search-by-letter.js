const { searchGameByLetter } = require('../../controllers/search'); 

module.exports = async (req,res) => {

    res.status(200).send(res.locals.games); 
}