const jwt = require("jsonwebtoken")
const {JWT_USER_PASSWORD} = require("../config.js");

function userMidlleware(req, res, next) {
  // do something
  const token = req.headers.token;
  const decode = jwt.verify(token, JWT_USER_PASSWORD);

  if(decode){
      req.user = decode;
  }else{
      return res.status(401).json({
          message: "you are not signin"
      })
  }
  next();
}

module.exports = {
    userMidlleware: userMidlleware
}