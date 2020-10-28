const router = require('express').Router(); 

router.get('/', require('./home')); 

module.exports = router; 