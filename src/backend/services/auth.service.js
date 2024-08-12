const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");

function createTokenForUser(user){
    const payLoad = {
        _id:user._id,
        username:user.username,
        firstname:user.firstname,
        lastname:user.lastname
    }
    const token = jwt.sign(payLoad,JWT_SECRET);
    return token;
}

function verifyToken(token){
    const payLoad = jwt.verify(token,JWT_SECRET);
    return payLoad;
}

module.exports = {
    createTokenForUser,
    verifyToken
}