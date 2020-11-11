const router = require('express').Router(); 
const token = require('../../middleware/token')

router.post('/search-by-letter', token, require('./search-by-letter'))
router.post('/search-by-input', token, require('./search-by-input'))

module.exports = router; 