const nodemailer = require('nodemailer');


const sendEmailUtility = async (emailTo, emailSubject, emailText) => {
    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: 'Task Manager MERN <info@teamrabbil.com>',
        to: emailTo,
        subject: emailSubject,
        text: emailText
    };

    return  await transporter.sendMail(mailOptions);
}
module.exports = sendEmailUtility;