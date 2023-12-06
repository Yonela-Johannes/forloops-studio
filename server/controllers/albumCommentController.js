const AlbumComment = require("../models/ablumCommentModel");
const Album = require("../models/albumModel");

const getAlbumComments = async (req, res) => {
  const { id } = req.params
  console.log(req.params)
  return ''

  try {
    const comments = await AlbumComment.find({post: id}).populate('user').populate('post').sort({"createdAt": -1})
    res.status(200).json(comments)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: error.message})
  }
}

const addAlbumComment = async (req, res) => {
  const { postId, userId, comment } = req.body;

  if (!postId || !userId || !comment) {
    return res.status(400).json({
      message: "Invalid params provided!"
    });
  }

  const newComment = new AlbumComment({ post: postId, user: userId, comment });
  try {
    const saveComment = await newComment.save();
    if (saveComment) {
      await Album.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });
    }
    res.status(200).json({
      status: 'success',
      comment: saveComment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while adding the comment.'
    });
  }
}

const deleteAlbumComment = async (req, res) => {

}

const updateAlbumComment = async (req, res) => {

}

const likeAlbumComment = async (req, res) => {
  const { id: _id } = req.params;
  const { userId: id } = req.body;

  // if(!req.userId) return res.json({message: 'Unauthenticated'});
  // if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No blog with that id')

  const blog = await AlbumComment.findById(_id);
  const updatedPost = await AlbumComment.findByIdAndUpdate(_id, {user: userId, likeCount: blog.likeCount + 1}, { new: true});

  res.json(updatedPost)
}

module.exports = {getAlbumComments, addAlbumComment, deleteAlbumComment, updateAlbumComment, likeAlbumComment}
