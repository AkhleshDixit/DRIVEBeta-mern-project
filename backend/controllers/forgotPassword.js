const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const user = require('../model/user');
// const { sendMail } = require('./sendMail');
const jwtKey = "jwt";

exports.forgotPassword = (req, res) => {

    user.findOne({ email: req.body.email }).then((result) => {

        if (result) {

            const data = {
                email: req.body.email
            }

            const token = jwt.sign({ data }, jwtKey,);

            // const email = req.body.email;
            // const subject = "reset password" ;
            // const text = `click to this link to reset your password ${'http://localhost:' + process.env.PORT + '/confirmpass?=' + token}`;

            // sendMail(email,subject,text);

            const transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: '',
                    pass: ''
                }
            });

            const mailOptions = {
                from: "",
                to: req.body.email,
                subject: "reset password",
                text: `click to this link to reset your password ${'http://localhost:' + process.env.PORT + '/confirmpass?=' + token}`
            };

            transport.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.send({
                        success: 'false',
                        message: "Verification email does not sent due to some network issues"
                    });
                }
                else {
                    return res.send({
                        success: 'true',
                        message: "Reset password link has been sent to your email"
                    });
                }
            });

            
        }
        else {
            return res.send({
                success: 'false',
                message: "Invalid email"
            });
        }
    }).catch((err)=>{
        return res.send({
            success: 'false',
            message: "Something went wrong"
        });
    });

}