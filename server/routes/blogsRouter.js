const express = require("express");
const {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  loveBlog,
  viewBlog,
  getFeaturedBlogs,
 } = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.get('/', getBlogs)
blogRouter.get('/featured', getFeaturedBlogs)
blogRouter.get('/:id', getBlog)
blogRouter.post('/', createBlog);
blogRouter.delete('/:id', deleteBlog);
blogRouter.patch('/update/:id', updateBlog);
blogRouter.patch('/like/:id', loveBlog);
blogRouter.patch('/view/:id', viewBlog);

module.exports = blogRouter;
