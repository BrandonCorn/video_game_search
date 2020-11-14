const router = require('express').Router(); 
const token = require('../../middleware/token'); 
const trackVisits = require('../../middleware/trackAllGamesVisit'); 

router.get('/', require('./home')); 
router.get('/discover', require('./discover')); 
router.get('/all-games', trackVisits, token, require('./all-games')); 
router.get('/contact-us', require('./contact-us')); 
router.get('/search-games/:search', token, require('./search-games')); 
router.get('/game/:id/:name', token, require('./game-data')); 
//fix problem with loading game page. 

module.exports = router; 