// middleware/verifyToken.js
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import cors from './cors';


export const verifyToken = (req, res, next) => {
  
  if (cors(req, res)) return;

  const cookies = cookie.parse(req.headers.cookie || '');
  const authToken = cookies.authToken || req.headers?.authorization?.split(' ')[1];
  
  if (!authToken) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log("defore redirected");

    if(!decoded){
      console.log("redirected");
      
      return res.status(403).redirect('/auth/signin')
    }
    // Add the decoded payload to the request object
    console.log(decoded);
    console.log("not redirected");
    
    req.user = decoded;
    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    return res.status(403).redirect('/signin')
  }
};
