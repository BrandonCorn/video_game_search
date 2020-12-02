const router = require('express').Router(); 
const token = require('../../middleware/token'); 
const newInputSearch = require('../../middleware/newInputSearch');
const initGamesByLetter = require('../../middleware/initGamesByLetter');  
const newInputIsLetter = require('../../middleware/newInputIsLetter'); 
const newGameData = require('../../middleware/newGameData')

router.get('/', token, initGamesByLetter, require('./home')); 
router.get('/discover', token, initGamesByLetter, require('./discover')); 
router.get('/all-games', token, initGamesByLetter, require('./all-games')); 
router.get('/contact-us', token, initGamesByLetter, require('./contact-us')); 
router.get('/search-games/:input', token, newInputIsLetter, newInputSearch, require('./search-games')); 
router.get('/game/:id/:name', token, newGameData, require('./game-data')); 

module.exports = router; 