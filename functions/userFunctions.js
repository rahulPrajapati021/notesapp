const {User} = require("../models/association")
const {Sequelize} = require("sequelize")
const jwt = require("jsonwebtoken")

async function getUserByUsernameOrEmail(username, email) {
    let existingUser = await User.findOne({
        where: {
          [Sequelize.Op.or]: [{ username: username }, { email: email }],
        },
      });
    return existingUser;
}

async function getUserIdByEmail(email) {
    let existingUser = await User.findOne({ where: { email: email } })
    return existingUser.id;
}

function generateToken(user) {
    const token = jwt.sign({userEmail: user.email}, process.env.TOKEN_SECRET, {expiresIn: '1h'})
    return token;
}

function setTokenCookie(res, token) {
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000,
        sameSite: 'None'
    })
}


module.exports = {getUserByUsernameOrEmail, generateToken, setTokenCookie, getUserIdByEmail}