const { request } = require("express");

module.exports = (req, res, next) => {
    if (!req.session.users) req.session.users = {}
    req.session.users['name'] = 'brandon'
    console.log(req.session.users['name'])
    next(); 

}