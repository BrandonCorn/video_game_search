const { searchGameByLetter } = require('../../controllers/search'); 

module.exports = async (req,res) => {
    let exist = await new Promise( (resolve, reject) => {
        let check = req.session.gamesByLetter[req.body.letter]; 
        if (typeof check !== 'undefined' && typeof check !== 'string' && Array.isArray(check))  return resolve(req.session.gamesByLetter[req.body.letter])
        return reject(false); 
    })
    .catch(err => {
        return false; 
    })
    
    if (exist) return res.status(200).send(exist)
    const searchGames = await searchGameByLetter(req.token, req.body.letter); 
    if (typeof searchGames === 'string') return res.status(400).send('Error getting game')
    else return res.status(200).send(searchGames) 
}