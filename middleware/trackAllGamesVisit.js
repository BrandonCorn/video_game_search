const {v4: uuidv4} = require('uuid'); 

module.exports = (req, res, next) => {
    if (!req.session.visits) req.session.visits = 1
    else req.session.visits++

    next(); 

}