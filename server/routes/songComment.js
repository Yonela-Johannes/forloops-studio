const express = require("express");
const { likeSongComment, updateSongComment, deleteSongComment, addSongComment, getSongComments } = require("../controllers/songCommentController");

const songCommentRouter = express.Router();

songCommentRouter.get('/all-comments/:id', getSongComments);
songCommentRouter.post('/', addSongComment);
songCommentRouter.delete('/:id', deleteSongComment);
// songCommentRouter.update('/:id', updateSongComment)
songCommentRouter.patch('/:id', likeSongComment)

module.exports = songCommentRouter
