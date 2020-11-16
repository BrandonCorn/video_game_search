const router = require('express').Router(); 
const token = require('../../middleware/token'); 
const trackVisits = require('../../middleware/trackAllGamesVisit'); 
const sameSearch = require('../../middleware/sameSearch');
const initGamesByLetter = require('../../middleware/initGamesByLetter');  


router.get('/', token, initGamesByLetter, require('./home')); 
router.get('/discover', token, initGamesByLetter, require('./discover')); 
router.get('/all-games', trackVisits, token, initGamesByLetter, require('./all-games')); 
router.get('/contact-us', token, initGamesByLetter, require('./contact-us')); 
router.get('/search-games/:input', sameSearch, token, initGamesByLetter, require('./search-games')); 
router.get('/game/:id/:name', token, initGamesByLetter, require('./game-data')); 

module.exports = router; 