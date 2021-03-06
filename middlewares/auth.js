const jwt=require("jsonwebtoken");
const { logOut } = require("../controllers/AuthController");
require("dotenv").config()

verifyToken = (req, res, next) => {
   try{ 
    let token = req.headers["authorization"] ;
 
      if (!token) {
      return res.json({ error: "No token provided!" });
    }
    jwt.verify(token,process.env.jwtAccessSecret , (err, decoded) => { 
         
      if (err) {   
        return res.json({ error: err.message });
      }
      req.user=decoded;
      next();
     });
    }catch(err){
        return res.json({ error:err.message})
    }
 
  }

  

module.exports = {
  verifyToken
}
