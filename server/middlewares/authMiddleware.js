const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');

const protect = asyncHandler( async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    try{
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (err){
      res.status(401);
      throw new Error('Not authorized, invalid token')
    }

  }else {
    res.status(401);
    throw new Error("Not authorized, no token")
  }
})

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req?.headers)
  if(req?.headers?.authorization?.startsWith("Bearer")) {

    token = req?.headers?.authorization?.split(" ")[1];
    try {
      if (token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized, Please Login Again")
    }
  } else {
    throw new Error("There is no token attached to the header")
  }
});

const isAdmin = asyncHandler (async (req, res, next) => {
  const { email } = req.user
  const isAdmin = await User.findOne({email});
  if (isAdmin.role !== 'admin') {
    throw new Error("You are not an Admin");
  }else {
    next();
  }
})

module.exports = { authMiddleware, isAdmin, protect };
