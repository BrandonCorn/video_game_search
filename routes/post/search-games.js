module.exports = (req, res) => {
     
    return res.redirect(`/search-games/${req.body.input}`)
}