const express = require('express');
const { index, homeContent } = require('../controllers/IndexController');
const { verifyToken } = require('../middlewares/auth');
const router = express.Router();

/* GET home page. */
router.get('/', index);

router.post("/",verifyToken,homeContent)


module.exports = router;
