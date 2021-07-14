const express = require('express');
const router = express.Router();
const { login } = require('../controllers/accountAuth/login');
const { signup, uploadImage } = require('../controllers/accountAuth/signup');
const { accountverified } = require('../controllers/accountAuth/accountverified');
const { forgotPassword } = require('../controllers/resetPassAuth/forgotPassword');
const { resetpass } = require('../controllers/resetPassAuth/resetpass');
const { accountverificationAuth } = require('../middleware/auth');
const { confirmpassauth } = require('../middleware/confirmpassauth');
const { confirmpass } = require('../controllers/resetPassAuth/confirmpass');


router.post('/account/login', login);
router.post('/account/forgotpassword',forgotPassword);
router.post('/account/resetpassword',resetpass);
router.get('/account/confirmpass',confirmpassauth,confirmpass)
router.get('/accountverification', accountverificationAuth, accountverified);
router.post('/account/signup',uploadImage, signup);


module.exports = router;