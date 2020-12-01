const { searchUpcomingReleasesPlaystation } = require('../../controllers/discoverSearch'); 
const { searchBestGames } = require('../../controllers/discoverSearch'); 

module.exports = async (req, res) => { 
    var games = await searchUpcomingReleasesPlaystation(req.token); 
    var bestGames = await searchBestGames(req.token); 
    if (typeof games === 'string' && typeof bestGames === 'string'){
        var games = await searchUpcomingReleasesPlaystation(req.token)
        var bestGames = await searchBestGames(req.token)
    }
    const filteredGames = games.filter(gameData => gameData.game.cover.url && gameData.game.name && gameData.game.summary)
    const filteredBestGames = bestGames.filter(bestGameData => bestGameData.game.cover.url && bestGameData.game.name && bestGameData.game.summary && bestGameData.game.rating)

    console.log(filteredGames.length)
    console.log(filteredBestGames.length)
    console.log(filteredGames)    
    console.log(filteredBestGames)
    return res.render('discover', {
        games: filteredGames,
        bestGames: filteredBestGames
    })
}