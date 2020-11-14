module.exports = (req, res, next) => {
    if (!req.session.lastSearch) {
        req.session.lastSearch = req.params.input; 
        req.session.sameSearch = 0; 
        return next()
    }
    if (req.session.lastSearch == req.params.input) req.session.sameSearch = 1
    else {
        req.session.lastSearch = req.params.input; 
        req.session.sameSearch = 0; 
    }
    next()
}