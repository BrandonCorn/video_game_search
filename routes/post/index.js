const router = require('express').Router(); 
const token = require('../../middleware/token');
const cacheGamesByLetter = require('../../middleware/cacheGamesByLetter'); 

router.post('/search-by-letter', token, cacheGamesByLetter, require('./search-by-letter'));
router.post('/search-by-input', token, require('./search-by-input'));
router.post('/search-games', token, require('./search-games')); 


module.exports = router; 