// const { searchUpcomingReleasesPlaystation, searchBestGames } = require('../../controllers/discoverSearch'); 
const { searchAllDiscover } = require('../../controllers/discoverSearch')

module.exports = async (req, res) => { 
    const games = await searchAllDiscover(req.token)
    const upcomingGames = games.slice(0,4).map(games => games.filter(gameData => gameData.game.cover && gameData.game.name && gameData.game.summary)[0])
    const popularGames = games.slice(4,7)
    const favoriteGames = games.slice(7,9)
    
    return res.render('discover', {
        games: upcomingGames,
        bestGames: popularGames, 
        favoriteGames
    })
}