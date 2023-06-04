const jwt = require("jsonwebtoken")
const {config} = require("../config/secret")

exports.authToken = (req, res, next) => {
        let token = req.header("x-api-key")
  if(!token) {
    res.status(401).json("you must sent token")
  }

  try {
    let decodetoken = jwt.verify(token, config.tokenSecret)
   req.tokenData = decodetoken
    next()
    
  } catch (error) {
    res.status(401).json("Token invalid or expired")

  }
}


