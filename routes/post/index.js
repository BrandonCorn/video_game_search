const router = require('express').Router(); 
const token = require('../../middleware/token');
const newInputIsLetter = require('../../middleware/newInputIsLetter'); 

router.post('/search-by-letter', token, require('./search-by-letter'));
router.post('/search-by-input', token, newInputIsLetter, require('./search-by-input'));
router.post('/search-games', token, require('./search-games')); 
router.post('/send-email', require('./send-email')); 


module.exports = router; 