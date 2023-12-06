const mongoose = require('mongoose');
const Category =  require("../models/categoryModel");
const User = require('../models/userModel');
const Blog = require('../models/blogCommentModel');

const getCategories = async (req, res) => {
  try {
      const category = await Category.find().populate('user').sort({"createdAt": -1});
      res.status(200).json(category)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}


const getCategoryBlogs = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const song = await Blog.find({category: _id}).populate('user').populate('lovedUsers').populate('category');
      res.status(200).json(song)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const CreateCategory = async (req, res) => {
  const { userId, title, image } = req.body

  if(!userId) res.json({
    message: 'No user provided'
  });

  const findUser = await User.findById(userId);

  if(!findUser) res.json({
    message: 'User does not exist'
  });

  try {
    const newCategory = new Category({image, title, user: userId })
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

const updateCategory = async (req, res) => {
  const { id: _id } = req.params;
  const category = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No category with that id')
  const updatedSong = await Category.findByIdAndUpdate(_id, {...category, _id}, {new: true});
  res.json(updatedSong)
}

const deleteCategory = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No category with that id')

  await  Category.findByIdAndRemove(_id);
  res.json({message: 'Category deleted successfully'});
}



module.exports = {CreateCategory, getCategories, updateCategory, deleteCategory , getCategoryBlogs}
