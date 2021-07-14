const userData = require('../../models/userfiles');

exports.deleteUserFile=(req,res)=>{
    userData.deleteOne({_id:req.params.id}).then((result)=>{
        if(result){
            return res.send(result);
        }
        else{
            return res.send({
                success:false,
                message:"File not deleted"
            });
        }
    }).catch((err)=>{
        return res.send({
            success:false,
            message:"Something went wrong"
        });
    });
}