const bcrypt = require('bcrypt');
const user = require('../model/user');

exports.resetpass = (req,res)=>{
    var email = localStorage.getItem('email');
    localStorage.removeItem('email');
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        user.updateOne({email:email},{$set:{
            password:hash
        }}).then((result)=>{
            return res.send('<h1>password changed successfully</h1>');
        }).catch((err)=>{
            console.log(err);
        })
    });
}
