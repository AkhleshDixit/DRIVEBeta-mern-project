const user = require('../../models/user');

exports.userinfo=(req,res)=>{
    user.find({_id:req.params.id}).then((result)=>{
        if(result){
            return res.send({
                success:true,
                name:result[0].name,
                profilePicPath:result[0].image
            });
        }
        else{
            return res.send({
                success:false,
                message:"User not find"
            })
        }
    }).catch((err)=>{
        return res.send({
            success:false,
            message:'Something went wrong'
        })
    })
}