const nodemailer = require('nodemailer');

exports.sendMail = (email, sub, successMessage, text, res) => {

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.SMTP_AUTH_USER,
            pass: process.env.SMTP_AUTH_PASS
        }
    });

    const mailOptions = {
        from: `${process.env.SMTP_FROM_NAME} ${process.env.SMTP_FROM_EMAIL}`,
        to: email,
        subject: sub,
        text: text
    };

    transport.sendMail(mailOptions,(err, info) => {
        if (err) {
            return res.send({
                success: 'false',
                message: "Mail does not sent due to some network issues"
            });
        }
        else {
            return res.send({
                success: 'true',
                message: `${successMessage}`
            });
        }
    });
}