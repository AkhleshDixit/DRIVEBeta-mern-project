const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const user = require('../model/user');
// const { sendMail } = require('./sendMail');
const jwtKey = "jwt";

exports.signup = (req, res) => {

    user.findOne({ email: req.body.email }).then((result) => {

        if (result) {
            return res.send({
                success: false,
                message: 'This email is already in use'
            });
        }
        else {

            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            };

            const token = jwt.sign({ data }, jwtKey,);

            // const email = req.body.email;
            // const subject = "confirm your account";
            // const text = `click to this link to confirm your account ${'http://localhost:' + process.env.PORT + '/accountverification?=' + token}`;

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
                subject: "confirm your account",
                text: `click to this link to confirm your account ${'http://localhost:' + process.env.PORT + '/accountverification?=' + token}`
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
                        message: "Verification mail has been sent to your email"
                    });
                }
            });

        }
    }).catch((err)=>{
        return res.send({
            success: 'false',
            message: "Something went wrong"
        });
    });

}