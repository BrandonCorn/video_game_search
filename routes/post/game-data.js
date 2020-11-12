module.exports = (req, res) => { 
    console.log('made it here'); 
    const url = `/game/${req.body.id}/${req.body.name}`
    console.log(url); 
    return res.redirect(url); 
}