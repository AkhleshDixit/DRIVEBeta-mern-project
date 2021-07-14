const express = require('express');
const router = express.Router();
const { userinfo } = require('../controllers/userInfo/userinfo');
const { updateProfile,uploadImage } = require('../controllers/userInfo/updateProfile');
const { userFilesInfo } = require('../controllers/userFilesInfoAndOperations/userFilesInfo');
const { downloadUserFile } = require('../controllers/userFilesInfoAndOperations/downloadUserFile');
const { deleteUserFile } = require('../controllers/userFilesInfoAndOperations/deleteUserFile');
const { userfiles,uploadfile } = require('../controllers/userFilesInfoAndOperations/userfiles');


router.get('/user/:id',userinfo)
router.get('/user/userFilesList/:id',userFilesInfo)
router.get('/user/download/:userFilePath',downloadUserFile)
router.put('/user/updateprofile/:id',uploadImage,updateProfile)
router.delete('/user/delete/:id',deleteUserFile)
router.post('/user/files',uploadfile,userfiles);


module.exports = router;