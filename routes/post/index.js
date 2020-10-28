const router = require('express').Router(); 
const token = require('../../middleware/token')

router.get('/search-by-name', token, require('./search-by-name'))

module.exports = router; 