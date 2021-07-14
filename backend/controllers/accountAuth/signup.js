const jwt = require('jsonwebtoken');
const multer = require('multer');
const user = require('../../models/user');
const { sendMail } = require('../sendMail');

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

exports.signup = (req, res) => {

    user.findOne({ email: req.body.email }).then((result) => {

        if (result) {
            return res.send({
                success: false,
                message: 'This email is already in use'
            });
        }
        else {

            let imagePath;

            if(req.file === undefined){
                imagePath = 'backend/assets/ProfilePic/default.png'
            }
            else{
                imagePath = req.file.path
            }

            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                image:imagePath
            };

            const token = jwt.sign({ data }, process.env.JWT_KEY, {expiresIn: 3000} );

            const email = req.body.email;
            const subject = "Confirm your DRIVEBeta account";
            const successMessage = "Verification mail has been sent to your email";
            const verificationUrl = `${req.protocol}://${req.get('host')}/accountverification?=${token}`
            const text = `Click to this link to confirm your account\n${verificationUrl}`;

            sendMail(email, subject, successMessage, text, res);

        }
    }).catch((err)=>{
        return res.send({
            success: 'false',
            message: "Something went wrong"
        });
    });

}