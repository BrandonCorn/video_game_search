const router = require('express').Router(); 
const token = require('../../middleware/token'); 
const trackVisits = require('../../middleware/trackAllGamesVisit'); 
const sameSearch = require('../../middleware/sameSearch');
const initGamesByLetter = require('../../middleware/initGamesByLetter');  


router.get('/', token, initGamesByLetter, require('./home')); 
router.get('/discover', require('./discover')); 
router.get('/all-games', trackVisits, token, require('./all-games')); 
router.get('/contact-us', require('./contact-us')); 
router.get('/search-games/:input', sameSearch, token, require('./search-games')); 
router.get('/game/:id/:name', token, require('./game-data')); 

module.exports = router; 