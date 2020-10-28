const router = require('express').Router(); 


router.use(require('./delete')); 
router.use(require('./get')); 
router.use(require('./post')); 
router.use(require('./put')); 


module.exports = router; 