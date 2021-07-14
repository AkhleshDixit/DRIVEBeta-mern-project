const express = require('express');
const router = express.Router();
const { login } = require('../controllers/login');
const { signup } = require('../controllers/signup');
const { accountverified } = require('../controllers/accountverified');
const { forgotPassword } = require('../controllers/forgotPassword');
const { resetpass } = require('../controllers/resetpass');
const { accountverificationAuth } = require('../middleware/auth');
const { confirmpassauth } = require('../middleware/confirmpassauth');
const { confirmpass } = require('../controllers/confirmpass');

router.get('/',(req, res) => {
    res.send('<h1>This is homepage route</h1>');
});

router.post('/login', login);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetpass);
router.get('/confirmpass',confirmpassauth,confirmpass)
router.get('/accountverification', accountverificationAuth, accountverified);
router.post('/signup', signup);

module.exports = router;