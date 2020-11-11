const router = require('express').Router(); 

router.get('/', require('./home')); 
router.get('/discover', require('./discover')); 
router.get('/all-games', require('./all-games')); 
router.get('/contact-us', require('./contact-us')); 

module.exports = router; 