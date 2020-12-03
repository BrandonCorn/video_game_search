const nodemailer = require('nodemailer')
const config = require('../config/keys')

module.exports = async (mailOptions) => {
    const transport = nodemailer.createTransport({
        service: 'gmail', 
        secure: true, 
        auth: {
            user: config.NODE_MAILER_EMAIL, 
            pass: config.NODE_MAILER_PASS
        }
    })

    return new Promise( async (resolve, reject) => {
        let newMessage = await transport.sendMail(mailOptions)
        .then(data => {
            return resolve(true); 
        })
        .catch(err => {
            return reject(err)
        })
    })
    .catch(err => { 
        console.log(err); 
        return false;
    })
}