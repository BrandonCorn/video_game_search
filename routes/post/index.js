const router = require('express').Router(); 
const token = require('../../middleware/token')

router.post('/search-by-letter', token, require('./search-by-letter'))
router.post('/search-by-input', token, require('./search-by-input'))
router.post('/search-games', token, require('./search-games')) 
router.post('/game-data', token, require('./game-data'))

module.exports = router; 