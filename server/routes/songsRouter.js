const express = require("express");
const {
  getSongs,
  getSong,
  addSong,
  deleteSong,
  loveSong,
  updateSong,
  playSong,
  getNewSongs,
  downloadSong,
  viewSong,
  getSongsByArtist,
  searchSong,
  topPlay,
  getFavorites,
  recentPlay,
 } = require("../controllers/songsController");

const songsRouter = express.Router();

songsRouter.get('/', getSongs)
songsRouter.get('/search/:searchTerm', searchSong)
songsRouter.get('/artist-song/:id', getSongsByArtist)
songsRouter.get('/favorites/:userId', getFavorites)
songsRouter.get('/recent', getNewSongs)
songsRouter.get('/:id', getSong)
songsRouter.post('/', addSong);
songsRouter.delete('/:id', deleteSong);
songsRouter.patch('/like/:songId', loveSong);
songsRouter.patch('/:id', updateSong);
songsRouter.patch('/view/:id', viewSong);
songsRouter.patch('/play/:id', playSong);
songsRouter.patch('/download/:id', downloadSong);
songsRouter.get('/songs/top-play', topPlay)

module.exports = songsRouter;
