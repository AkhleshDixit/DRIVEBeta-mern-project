const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const user = require('../../models/user');

exports.accountverified = (req, res) => {

    bcrypt.hash(res.data.password, 10, (err, hash) => {
        if (err) {
            console.log(err);
        }
        else {
            const data = new user({
                _id: mongoose.Types.ObjectId(),
                name: res.data.name,
                email: res.data.email,
                password: hash,
                image:res.data.image
            });
            data.save().then((result) => {
                
            }).catch((err) => {
                console.log(err)
            });

        }
    });

    res.send('<h1>Account verified successfully</h1><p>Please go to Login to continue</p>');
}