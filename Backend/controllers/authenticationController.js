const User = require('../models/user.model')
const jwt = require('jsonwebtoken');

// generate Token

const generateToken = (id)=>{
      return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'});
}

// The Creating The User Logic For Register 

exports.registeruser = async(req,res)=>{
       // Simple validation
    const {name,email,password} = req.body;
if (!name || !email || !password) {
      res.status(402).json({message : "User Is Not Created Please Add All Field"})
} 
// Check if user exists
const existingUser = User.findOne({email})
  if (existingUser) {
      res.status(400).json({message:"User Already Exists"})
  }
    // create user
    const user = await User.create({name,email,})
    if (user) {
      res.status(201).json({
            message : "User Created",
            _id : user._id,
      name:user.name,
      email:user.email,
      token:generateToken(user._id)
      }) 
  
    }else{
           res.status(400).json({message:'Invalid user data' }) 
      }
}

// For Login 

exports.login = async ()=>{
      const {email,password} = req.body;

      // Find User 
      const user = User.findOne({email})
      if (user && (await user.matchPassword(password))) {
            res.json({
                  _id:user._id,
                  name:user.name,
                  email:user.email,
                  token:generateToken(user._id)
            })
      }else{
            res.status(401).json({message:"Invalid email Or Password"})
      }
}

