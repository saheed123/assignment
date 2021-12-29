require('dotenv').config();

const token = require('jsonwebtoken');


exports.verifyToken =   (req, res, next) => {
  const headerToken = req.header('x-auth-token');
  if (!headerToken) {
  return res.status(401).json({
      message: 'no token provided'
    });
  }
  
    token.verify(headerToken, process.env.JWT_SEC, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'token invalid' });
       
     }
     else if(decoded) {
        req.user = decoded;
      return  next();
       
     
      }
      
      
       
     } )
    
    
   

    
  
  
 
    
   

  
}
