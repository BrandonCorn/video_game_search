module.exports = (req,res) => {
    req.body.start = 1; 
    req.body.end = 10; 

    return res.render('all-games', {
        'start': req.body.start, 
        'end': req.body.end
    })
}