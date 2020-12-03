const sendMail = require('../../controllers/nodemailer')
const config = require('../../config/keys')

module.exports = async (req, res) => {
    const message = `Message from: ${req.body.sender}\n\n` + req.body.text
    const mailOptions = {
        from: config.NODE_MAILER_EMAIL, 
        to: req.body.receiver, 
        subject: req.body.subject, 
        text: message
    } 
    const sendEmail = await sendMail(mailOptions)
    if (!sendEmail) return res.status(400).send('Error sending email')
    return res.status(200).send('Email sent successfully!')
}