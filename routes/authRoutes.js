const express = require("express")
const router = express.Router();
const {test, registerUser, loginUser, logoutUser, userDetail} = require("../controllers/authController");
const { verifyToken } = require("../middleware/verfiyToken");

router.get('/test', test)
router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser)
router.post('/logoutUser', logoutUser)
router.get('/userDetail',verifyToken, userDetail)


module.exports = router