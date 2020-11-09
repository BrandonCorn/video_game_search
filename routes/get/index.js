const router = require('express').Router(); 

router.get('/', require('./home')); 
router.get('/contact-us', require('./contact-us')); 

module.exports = router; 