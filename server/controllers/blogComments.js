const  BlogComment = require("../models/blogCommentModel");
const Blog = require("../models/blogModel");

const getBlogComments = async (req, res) => {
  const { blogId } = req.params
  try {
    const comments = await BlogComment.find({blog: blogId}).populate('user');
    if (comments) {
      res.status(200).json({comments})
    } else {
      res.status(200).json({comments: []})
    }
  } catch (error) {
    console.log(error)
  }
}

const addBlogComment = async (req, res) => {
  const { postId } =  req.params
  const {userId, comment} = req.body
  const newComment = new BlogComment({blog: postId, user: userId, comment})
  try {
    const comment = await newComment.save();
    const findBlog = await Blog.findById(postId);
    if (comment && findBlog) {
      const updatedBlog = await Blog.updateOne({ _id: findBlog?._id }, {
        $inc: { commentsCount: 1 },
        $push: { commentedUsers: userId }
      });
      res.status(200).json({
        blog: updatedBlog,
        comment
      })
    } else {
      res.status(200).send({comment: ''})
    }
  } catch (error) {
    console.log(error)
  }
}

const updateBlogComment = async (req, res) => {
  const { commentId } = req.params;
  const { comment, userId } = req.body;

  try {
    // Find the existing user data
    const blogCommentData = await BlogComment.findById(commentId);
    if (blogCommentData) {
      if(userId === blogCommentData.user.toString()){
        // Merge the existing data with the new data
        if (comment === ''){
          const findBlog = await BlogComment.findById(commentId).populate('blog');
          if (findBlog) {
            const updateBlog = await Blog.findOneAndUpdate({ _id: findBlog.blog._id }, {
              $inc: { commentsCount: -1 },
              $pull: { commentedUser: userId }
            });
            await BlogComment.findByIdAndDelete(commentId)
            res.status(200).json({
              status: true,
              message: "Comment deleted successfully",
              blog: updateBlog
            });
          } else {
            res.status(200).json({
              status: false,
              message: "Error delete blog comment!",
            });
          }
        } else {
          const updatedCommentData = {
            ...blogCommentData.toObject(), // Convert Mongoose document to plain JavaScript object
            comment: comment || blogCommentData.comment,
          };
          // Update the user

          const updatedComment = await BlogComment.findOneAndUpdate({ _id: blogCommentData._id }, updatedCommentData);
          if (updatedComment) {
            res.status(200).json({
              comment: updatedComment,
            });
          } else {
            res.status(200).json({
              comment: updatedComment,
            });
          }
        }

      } else {
        res.status(200).json({
          status: true,
          message: "Error user credentials",
        });
      }
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }

}

const deleteBlogComment = async (req, res) => {

}

const likeBlogComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  if (userId) {
    try {
      // Find the existing user data
      const blogCommentData = await BlogComment.findById(commentId);
      if (blogCommentData) {
        const findLikedUser = blogCommentData.lovedUsers.includes(userId);
        console.log(findLikedUser)
        if (findLikedUser) {
          const updatedComment = await BlogComment.findOneAndUpdate(
            { _id: blogCommentData._id },
            {
              $inc: { loveCount: -1 },
              $pull: { lovedUsers: userId }
            }
          ).populate('blog');
          res.status(200).json({
            comment: updatedComment,
          });
        } else {
          const updatedComment = await BlogComment.findOneAndUpdate(
            { _id: blogCommentData._id },
            {
              $inc: { loveCount: 1 },
              $push: { lovedUsers: userId }
            }
          ).populate('blog');
          res.status(200).json({
            comment: updatedComment,
          });
        }
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({
        status: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  }
}

module.exports = {
  getBlogComments,
  addBlogComment,
  deleteBlogComment,
  likeBlogComment,
  updateBlogComment
}
