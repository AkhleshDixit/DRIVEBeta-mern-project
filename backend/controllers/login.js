const bcrypt = require('bcrypt');
const user = require('../model/user');

exports.login = (req, res) => {
    user.findOne({ email: req.body.email }).then(async (data) => {
        if (data) {
            var hashedpassword = await bcrypt.compare(req.body.password, data.password);
            
            if (hashedpassword) {
                return res.send({
                    success: true,
                    message: 'login successful'
                });
            }
            else {
                return res.send({
                    success: false,
                    message: 'invalid credentials'
                });
            }
        }
        else {
            return res.send({
                success: false,
                message: 'invalid credentials'
            });
        }
    }).catch((err)=>{
        return res.send({
            success: 'false',
            message: "Something went wrong"
        });
    });
}