const express = require('express');
const { registerNewUser, loginUser, logOut } = require('../controllers/AuthController');
const { checkEmailUnique } = require('../middlewares/checkEmailUnique');
const { validateRegister, validateLogin } = require('../middlewares/validate');
const router = express.Router();


router.post('/register',validateRegister,checkEmailUnique, registerNewUser);

router.post("/login",validateLogin,loginUser)


router.post("/logout",logOut)
module.exports = router;
