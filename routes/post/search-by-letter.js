 module.exports = async (req,res) => {

    res.status(200).send(res.locals.games)
}