const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    let token = req.cookies.token
    console.log(req.cookies)
    if(!token) {
        return res.status(401).json({msg: "Unauthorized no token"})
    }
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userEmail = decodedToken.userEmail;
        next()
    } catch (error) {
        return res.status(401).json({"msg": "Unauthorized token verification"})
    }
}

module.exports = {verifyToken}