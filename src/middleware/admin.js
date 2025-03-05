const jwt = require("jsonwebtoken")
const {JWT_ADMIN_PASSWORD} = require("../config_db/config.js");

function adminMidlleware(req, res, next) {
  // do something
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_USER_PASSWORD);

  if(decoded){
      req.userId = decoded.id;
  }else{
      return res.status(401).json({
          message: "you are not signin"
      })
  }
  next();
}
module.exports = {
    adminMidlleware: adminMidlleware
}