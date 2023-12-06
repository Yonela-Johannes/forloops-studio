const express = require("express");
const {
  getArtists,
  getArtist,
  deleteArtist,
  loveArtist,
  updateArtist,
  viewArtist,
  supportArtist,
  getSupportArtist,
 } = require("../controllers/artistsController");

const artistsRouter = express.Router();

artistsRouter.get('/', getArtists)
artistsRouter.get('/:id', getArtist)
artistsRouter.delete('/:id', deleteArtist);
artistsRouter.patch('/love', loveArtist);
artistsRouter.patch('/update/:artistId', updateArtist);
artistsRouter.patch('/view/:id', viewArtist);
artistsRouter.get('/support/:userId', getSupportArtist);
artistsRouter.patch('/support/:artistId', supportArtist);

module.exports = artistsRouter;
