const userData = require('../../models/userfiles')

exports.userFilesInfo = (req,res)=>{
    userData.find({userId:req.params.id}).then((result)=>{
        if(result){
            return res.send(result);
        }
        else{
            return res.send({
                success:false,
                message:"No files to show"
            });
        }
    }).catch((err)=>{
        return res.send({
            success:false,
            message:"Something went wrong"
        });
    });
}