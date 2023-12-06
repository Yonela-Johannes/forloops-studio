const User = require("../models/userModel");
const Artist = require("../models/artistModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../config/validateMongoDbId")
const jwt = require('jsonwebtoken')

// Login to existing user
// @desc Login to existing user
// @route POST /api/users/login
// @access Private
const loginUser = asyncHandler( async (req, res, next) => {

  let data;
  if(req.body?.user?.email){
    data = {
      email,
      given_name,
      family_name,
      picture,
      email_verified
    }
  }

  console.log(req.body)
  if(req.body?.oauthCode){
    const userInfo = jwt.decode(req.body?.oauthCode)
    let { email, given_name, family_name, picture, email_verified } = userInfo
    console.log(userInfo)
    data = {
      email,
      given_name,
      family_name,
      picture,
      email_verified
    }
  }

  console.log(data)
  if(data?.email){
    // check if user exist or not
    const findUser = await User.findOne({ email: data.email })
    console.log(findUser)
    if(findUser){
      const { given_name, family_name, email, picture, isAdmin, isBlocked, servers, members, channels, _id} = findUser
      res.status(200).json({
        status: true,
        message: "User Fetch Successfull!",
        user: {
          _id,
          given_name,
          family_name,
          email,
          picture,
          isAdmin,
          isBlocked,
        }
      });
    } else {
      // create the user

      const createdUser = await User.create({email, given_name, family_name, picture, email_verified});
      if(createdUser){
        const { given_name, quote, family_name, email, picture, isAdmin, isBlocked, servers, members, channels, _id} = createdUser
        res.status(201).json({
          status: true,
          message: "User Created Successfully!",
          user: {
            _id,
            given_name,
            family_name,
            email,
            picture,
            isAdmin,
            isBlocked,
            servers,
            members,
            channels,
            quote,
          }
        });
      }
    }
  }else {
    throw new Error("Invalid Credentials")
  }
});

// Login to existing user
// @desc Login to existing user
// @route GET /api/users/login
// @access Private
const createArtist = asyncHandler( async (req, res) => {
  const {userId, name, picture, quote } = req.body
  console.log(req.body)
  if(userId){
    // check if user exist or not
    const findUser = await Artist.findOne({user: userId})
    console.log(findUser)
    if(findUser){
      res.status(200).json({
        status: true,
        message: "User Fetch Successful!",
        artist: findUser
      });
    } else {
      // create the user
      const createdArtist = await Artist.create({user: userId, name, picture, quote});
      if(createdArtist){
        const createdUser = await User.findByIdAndUpdate(userId, {artist: createdArtist._id})
        if(createdUser){
          res.status(201).json({
            status: true,
            message: "User Created Successfully!",
            artist: createdUser
          });
        }else{
          res.json({message: 'User not updated'})
        }
      } else{
        res.json({message: 'Artist not created'})
      }
    }
  }else {
    throw new Error("Invalid Credentials")
  }
});

// Fetch all users
// @desc Retrieve all user
// @route GET /api/users/update
const getAllUsers = asyncHandler(async (req, res) => {
    try {
      const allUsers = await User.find({isAdmin: false});
      res
        .status(200)
        .json({
          status: true,
          message: "All Users Fetched Successfully",
          users: allUsers,
        })
    } catch (error){
      throw new Error('Something went wrong')
    }
});

const getAllAppUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find();
    res
      .status(200)
      .json({
        status: true,
        message: "All Users Fetched Successfully",
        users: allUsers,
      })
  } catch (error){
    throw new Error('Something went wrong')
  }
});
// Fetch user
// @desc Get user
// @route GET /api/user/:id
// access Admin/Users
const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId).populate('artist');
    if(user){
      res
        .status(200)
        .json({
          status: true,
          message: "User Fetched Successfully",
          user,
        })
    }else{
      throw new Error("User does not exist")
    }
  } catch (error){
    throw new Error(error)
  }
});
// Fetch all users
// @desc Retrieve all user
// @route POST /api/users/update
const getAllAdmins = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find({isAdmin: true});
    res
      .status(200)
      .json({
        status: true,
        message: "All Users Fetched Successfully",
        admins: allUsers,
      })
  } catch (error){
    throw new Error('Something went wrong')
  }
});

// Fetch user
// @desc Get user
// @route POST /api/user/:id
// access Admin/Users
const getAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId).populate('artist');
    if(user){
      res
        .status(200)
        .json({
          status: true,
          message: "Admin Fetched Successfully",
          user,
        })
    }else{
      throw new Error("User does not exist")
    }
  } catch (error){
    throw new Error(error)
  }
});


// Find user
// @desc search user
// @route POST /api/user?search
// access public
const findUser = asyncHandler(async (req, res) => {
  try {
    const keyword  = req.query.search ?
    {
      $or: [
        { name: { $regex: req.query.search, $options: "i"}},
        { email: { $regex: req.query.search, $options: "i"}},
      ],
    }
    : {};
    if(keyword){
      const users = await User.find(keyword).find({_id: {$ne: req.body.userId}});
      res
        .status(200)
        .json({
          status: true,
          message: "User Fetched Successfully",
          users,
        })
    }else{
      throw new Error("User does not exist")
    }
  } catch (error){
    throw new Error(error)
  }
});
// Update user
// @desc edit user
// @route POST /api/update/:id
// access Admin/User
const updateUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { given_name, family_name, nick, title, quote } = req.body;

  try {
    // Find the existing user data
    const userData = await User.findById({ _id: userId });

    if (userData) {
      // Merge the existing data with the new data
      const updatedUserData = {
        ...userData.toObject(), // Convert Mongoose document to plain JavaScript object
        given_name: given_name || userData.given_name,
        family_name: family_name || userData.family_name,
        nick: nick || userData.nick,
        title: title || userData.title,
        quote: quote || userData.quote,
        // Add more fields as needed
      };

      // Update the user
      const user = await User.updateOne({ _id: userData?._id }, updatedUserData);

      res.status(200).json({
        status: true,
        message: "Profile Updated Successfully",
        user,
      });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

// Assuming that asyncHandler is a middleware handling async errors


// Block user
// @desc block user from site
// @route POST /api/block-users
// access Admin
const blockUser = asyncHandler(async (req, res) => {
  const { userId } = req.body
  validateMongoDbId(userId)
  console.log({userId})
  try {
    const user = await User.findByIdAndUpdate({_id: userId}, {is_blocked: true} ,{new: true}
    );
    res
      .status(200)
      .json({
        status: true,
        message: "Profile Blocked Successfully",
        user,
      })
  } catch (error){
    throw new Error('Something went wrong')
  }
});

// Block user
// @desc block user from site
// @route POST /api/block-users
// access Admin
const unblockUser = asyncHandler(async (req, res) => {
  const { userId } = req.body
  validateMongoDbId(userId)
  try {
    const user = await User.findByIdAndUpdate({_id: userId}, {is_blocked: false} ,{new: true}
    );
    res
      .status(200)
      .json({
        status: true,
        message: "Profile Unblocked Successfully",
        user,
      })
  } catch (error){
    throw new Error('Something went wrong')
  }
});

// Logout user
// @desc log user out
// @route POST /api/users/logout
// access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out'});
});


module.exports = {
  loginUser,
  logoutUser,
  getAllAdmins,
  getAdmin,
  getAllAppUsers,
  getAllUsers,
  getUser,
  findUser,
  updateUser,
  blockUser,
  unblockUser,
  createArtist,
}
