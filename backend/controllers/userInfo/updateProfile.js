const user = require('../../models/user');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'backend/assets/ProfilePic/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
});

const isImage = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }
}

const upload = multer({
    storage:storage,
    fileFilter: isImage
});

exports.uploadImage = upload.single('avatar');

exports.updateProfile = (req,res)=>{
    user.updateOne({
        _id:req.params.id,
        $set:{
            image:req.file.path
        }
    }).then((result)=>{
        if(result){
            return res.send({
                success:true,
                message:"Profile pic uploaded successfully"
            })
        }
        else{
            return res.send({
                success:false,
                message:"Profile pic not uploaded"
            })
        }

    }).catch((err)=>{
        return res.send({
            success:false,
            message:"Profile pic not uploaded"
        })
    })
}