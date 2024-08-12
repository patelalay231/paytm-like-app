const {verifyToken} = require('../services/auth.service');

const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");

function checkForAuthenticationCookie(cookieName){
    return (req,res,next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }
        try{
            const userPayload = verifyToken(tokenCookieValue);
            req.user = userPayload;
        }
        catch(err){}
        return next();
    }
}

function restrictToLoggedinUserOnly(req,res,next){
    const token = req.cookies.token;
    if(!token) return res.send("User is not logged in");
    next();
}

function AuthMiddleWare(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).json({});
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded._id;
        next();
    } catch (error) {
        res.status(403).json({
            Error: error.message
        });
    }
}

module.exports = {
    checkForAuthenticationCookie,
    restrictToLoggedinUserOnly,
    AuthMiddleWare
}