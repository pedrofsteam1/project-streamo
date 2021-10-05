const bcrypt = require('bcryptjs');
const mail = require('nodemailer');


const SendEmail = async (email, sub, msg) => {

    const transporter = mail.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port:587,
        secure: false,
        auth: {
            user: 'pedrofsteam3@gmail.com',
            pass: 'ywgnzzmkcldezoly'
        }
    });

    const mailOptions = {
        from: 'pedrofsteam3@gmail.com',
        to: email,
        subject: sub,
        html: msg
    }

    try {
        let info = await transporter.sendMail(mailOptions);

        return true;
    }
    catch (err) {
        console.log(err);
        if (err.code === 'EENVELOPE') { return 'invalidEmail' }
        else { return false }
    }  

}


module.exports = { SendEmail }