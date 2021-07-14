const jwt = require('jsonwebtoken');
const user = require('../../models/user');
const { sendMail } = require('../sendMail');

exports.forgotPassword = (req, res) => {

    user.findOne({ email: req.body.email }).then((result) => {

        if (result) {

            const data = {
                email: req.body.email
            }

            const token = jwt.sign({ data }, process.env.JWT_KEY, {expiresIn: 3000});

            const email = req.body.email;
            const subject = "DRIVEBeta account password recovery" ;
            const successMessage = "Reset password link has been sent to your email";
            const resetUrl = `${req.protocol}://${req.get('host')}/account/confirmpass?=${token}`
            const text = `Click to this link to reset your password:-\n${resetUrl}\n\n If you have not requested this email, then ignore it.`;

            sendMail(email, subject, successMessage, text, res);
            
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