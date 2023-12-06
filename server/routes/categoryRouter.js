const express = require("express");
const {
  getCategories,
  CreateCategory,
  deleteCategory,
  updateCategory,
  getCategoryBlogs,
 } = require("../controllers/categoryController");

const categoryRouter = express.Router();

categoryRouter.get('/', getCategories)
categoryRouter.get('/category-blogs/:id', getCategoryBlogs)
categoryRouter.post('/', CreateCategory);
categoryRouter.delete('/:id', deleteCategory);
categoryRouter.patch('/:id', updateCategory);

module.exports = categoryRouter;
