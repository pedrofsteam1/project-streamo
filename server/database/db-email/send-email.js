const mail = require('nodemailer');



exports.sendEmail = function (email, sub, msg, callback) {

    let transporter = mail.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port:587,
        secure: false,
        auth: {
            user: 'pedrofsteam3@gmail.com',
            pass: 'ywgnzzmkcldezoly'
        }
    });
    

    let mailOptions = {
        from: 'pedrofsteam3@gmail.com',
        to: email,
        subject: sub,
        html: msg
    };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          callback(false);
        } else {
          console.log('Email sent: ' + info.response);
          callback(true);
        }
    }); 
}