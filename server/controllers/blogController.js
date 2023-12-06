const Blog = require("../models/blogModel")

const getBlogs = async (req, res) => {
  try {
      const blogs = await Blog.find().populate('user').populate('category');
      res.status(200).json(blogs)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getFeaturedBlogs = async (req, res) => {
  try {
      const blogs = await Blog.find().populate('user').populate('category');
      res.status(200).json(blogs)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getBlog = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const blog = await Blog.findById(_id).populate('user').populate('category');
      res.status(200).json({
        status: true,
        message: "Blog fetch Successfully",
        blog,
      });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const createBlog = async (req, res) => {
  const post = req.body;
  const newBlog = new Blog({...post, user: req.body.userId, createdAt: new Date().toISOString()})
  try {
    await newBlog.save();
    res.status(200).json({
      status: true,
      message: "Blog created Successfully",
      blog: newBlog
    });
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { subtitle, title, post, image, category, } = req.body;

  try {
    // Find the existing user data
    const blogData = await Blog.findById(id);
    if (blogData) {
      // Merge the existing data with the new data
      const updatedBlogData = {
        ...blogData.toObject(), // Convert Mongoose document to plain JavaScript object
        title: title || blogData.title,
        subtitle: subtitle || blogData.subtitle,
        image: image || blogData.image,
        post: post || blogData.post,
        category: category || blogData.category,
        user: blogData.user
      };

      // Update the user
      const blog = await Blog.updateOne({ _id: blogData._id }, updatedBlogData);

      res.status(200).json({
        status: true,
        message: "Blog updated Successfully",
        blog,
      });
    }
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}

const deleteBlog = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  await  Blog.findByIdAndRemove(_id);
  res.json({message: 'Blog deleted successfully'});
}

const loveBlog = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (id && userId) {
    try {
      // Find the existing user data
      const blogData = await Blog.findById(id);
      if (blogData) {
        const findLikedUser = blogData.lovedUsers.includes(userId);
        console.log({findLikedUser})
        if (findLikedUser) {
          const updatedBlog = await Blog.findOneAndUpdate(
            { _id: blogData._id },
            {
              $inc: { loveCount: -1 },
              $pull: { lovedUsers: userId }
            }
          ).populate('user');
          res.status(200).json({
            blog: updatedBlog,
          });
          } else {
            console.log({blogId: blogData._id})
            const updatedBlog = await Blog.findOneAndUpdate(
              { _id: blogData._id },
              {
                $inc: { loveCount: 1 },
                $push: { lovedUsers: userId }
              }
            ).populate('user').populate('category');
            console.log(updatedBlog)
            res.status(200).json({
              blog: updatedBlog,
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

const viewBlog = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (id) {
    try {
      // Find the existing user data
      const blogData = await Blog.findById(id);
      if (blogData) {
        const findViewedUser = blogData.viewedUsers.includes(userId);
         if (!userId) {
           const updatedBlog = await Blog.findOneAndUpdate(
             { _id: blogData._id },
             {
               $inc: { viewCount: 1 },
             }
           ).populate('user');
           res.status(200).json({
             blog: updatedBlog,
           });
         } else {
           if (findViewedUser === false) {
             const updatedBlog = await Blog.findOneAndUpdate(
               { _id: blogData._id },
               {
                 $inc: { viewCount: 1 },
                 $push: { viewedUsers: userId }
               }
             ).populate('user').populate('category');
             res.status(200).json({
               blog: updatedBlog,
             });
           } else {
            const updatedBlog = await Blog.findOneAndUpdate(
              { _id: blogData._id },
              {
                $inc: { viewCount: 1 },
              }
            ).populate('user').populate('category');
            res.status(200).json({
              blog: updatedBlog,
            });
           }
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

module.exports =  {
  getFeaturedBlogs,
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  loveBlog,
  viewBlog
}
