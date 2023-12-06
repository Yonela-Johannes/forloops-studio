const express = require("express");
const { getBlogComments, addBlogComment, deleteBlogComment, updateBlogComment, likeBlogComment } = require('../controllers/blogComments.js');

const blogCommentRouter = express.Router();
blogCommentRouter.get('/:blogId', getBlogComments);
blogCommentRouter.post('/comment/:postId', addBlogComment);
blogCommentRouter.patch('/like/:commentId', likeBlogComment)
blogCommentRouter.patch('/update/:commentId', updateBlogComment);


module.exports = blogCommentRouter
