const jwt = require('jsonwebtoken');
const User = require('../models/user.model')


const protect = async (req,res,next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
         try {
            // get it token from header
            token = req.headers.authorization.split(' ')[1]

            // verify Token 
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            // Get User From The Token minus  Password
            req.user = await User.findById(decoded.id).select("-password")

            next()
         } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
         }
    }

    if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
}

module.exports = {protect}