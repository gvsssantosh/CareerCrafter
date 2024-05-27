const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {

  var token = req.headers['authorization'];
  //const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : req.query.token;
  //this approach checks both headers and query parameters to get the token.
  //console.log("Authenticate User Middleware");

  if (!token) {
    return res.status(401).json({ success: false, message: "Authorization Failed. No Access Token" });
  }
  else {
    token = token.replace("Bearer ", "");
    // console.log(token);    

    jwt.verify(token, process.env.JWT_SECRETKEY, function (err, decodedToken) {
      if (err) { //failed verification.
        return res.status(403).json({ success: false, message: "Authorization Failed. Invalid token" });
      }
      console.log(decodedToken);
      //req.user = decodedToken;
      //this we can use in the routes it contains the decoded token (in our case we get userid)
      //const user = req.user;
      //const userId = decodedToken.userId; 
      next();

    });
  }
};


module.exports = authenticateToken;