const router = require('express').Router(); 
const token = require('../../middleware/token'); 


router.get('/', require('./home')); 
router.get('/discover', require('./discover')); 
router.get('/all-games', token, require('./all-games')); 
router.get('/contact-us', require('./contact-us')); 
router.get('/search-games/:search', token, require('./search-games')); 


module.exports = router; 