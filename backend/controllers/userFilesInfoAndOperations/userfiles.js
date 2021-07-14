const multer = require('multer');
const userData = require('../../models/userfiles');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'backend/assets/userfiles/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
});

// const isImage = (req,file,cb)=>{
//     if(file.mimetype.startsWith('image')){
//         cb(null,true);
//     }
// }

const upload = multer({
    storage:storage,
    // fileFilter: isImage
});

exports.uploadfile = upload.single('pdf');


exports.userfiles=(req,res)=>{
    // console.log(req.file);
    const data = new userData({
        userId:req.body.userId,
        userFilePath:req.file.path,
        fileName:req.file.originalname
    });
    data.save().then((resp)=>{
        return res.send(resp);
    }).catch((err)=>{
        return res.send(err);
    })
}