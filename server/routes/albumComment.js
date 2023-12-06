const express = require("express");
const { likeAlbumComment, updateAlbumComment, deleteAlbumComment, addAlbumComment, getAlbumComments } = require("../controllers/albumCommentController");

const albumCommentRouter = express.Router();

albumCommentRouter.get('/all-comments/:id', getAlbumComments);
albumCommentRouter.post('/', addAlbumComment);
albumCommentRouter.delete('/:id', deleteAlbumComment);
// albumCommentRouter.update('/:id', updateAlbumComment)
albumCommentRouter.patch('/:id', likeAlbumComment)

module.exports = albumCommentRouter
