const mongoose = require('mongoose');
const Album =  require("../models/albumModel");
const User = require('../models/userModel');
const Song = require('../models/songModel');
const Artist = require('../models/artistModel');

const getAlbums = async (req, res) => {
  try {
      const album = await Album.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers').populate('songs').populate('artist');
      res.status(200).json(album)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getAlbumByArtist = async (req, res) => {
  const { id } = req.params
  try {
      const album = await Album.find({artist: id}).sort({"createdAt": -1}).populate('lovedUsers').populate('user').populate('songs').populate('artist');
      res.status(200).json(album)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getNewAlbums = async (req, res) => {
  try {
      const album = await Album.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers').populate('songs').limit(10);
      res.status(200).json(album)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getAlbum = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const album = await Album.findById(_id).populate('user').populate('lovedUsers').populate('songs').populate('artist');
      res.status(200).json(album)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getAlbumSongs = async (req, res) => {
  const { id: _id } = req.params;
  try {
      const song = await Song.find({album: _id}).populate('user').populate('lovedUsers').populate('album');
      res.status(200).json(song)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const createAlbum = async (req, res) => {
  const { userId, title, date, cover, songs, artistId, description } = req.body

  const findUser = await User.findById(userId);
  const findArtist = await Artist.findById(artistId);

  try {
    const newAlbum = new Album({date, cover, songs, title, artist: artistId, description, user: userId, createdAt: new Date().toISOString()})
    await newAlbum.save();
    res.status(200).json(newAlbum);
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

const updateAlbum = async (req, res) => {
  const { id: _id } = req.params;
  const album = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No album with that id')
  const updatedSong = await Album.findByIdAndUpdate(_id, {...album, _id}, {new: true});
  res.json(updatedSong)
}

const deleteAlbum = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No album with that id')

  await  Album.findByIdAndRemove(_id);
  res.json({message: 'Album deleted successfully'});
}

const loveAlbum = async (req, res) => {
  const { albumId, userId } = req.body;

  if (!userId || !albumId) {
    return res.json({ message: 'Unauthenticated' });
  }

  try {
    const album = await Album.findById(albumId);

    if (!album) {
      return res.json({ message: 'Album not found' });
    }

    const index = album.lovedUsers.findIndex((id) => id === userId);

    if (index === -1) {
      // User hasn't loved the album album yet, add the user to the list of lovedUsers
      album.lovedUsers.push(userId);
      album.loveCount += 1;

      const updatedSong = await album.save();

      return res.json(updatedSong);
    } else {
      return res.json({ message: 'User already liked album album' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPlaysCount = async (req, res) => {
  const { id: _id } = req.params;
  console.log(req.params)
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No album with that id')

  const album = await Album.findById(_id);
  const updatedSong = await Album.findByIdAndUpdate(_id, {playCount: album.playCount + 1}, { new: true});

  res.json(updatedSong)
}

const getDownloadsCount = async (req, res) => {
  const { id: _id } = req.params;
  console.log(req.params)
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No album with that id')

  const album = await Album.findById(_id);
  const updatedSong = await Album.findByIdAndUpdate(_id, {downloadCount: album.downloadCount + 1}, { new: true});

  res.json(updatedSong)
}


module.exports = {getAlbumByArtist, createAlbum, getNewAlbums, getAlbums, getAlbum, updateAlbum, deleteAlbum , loveAlbum, getPlaysCount, getDownloadsCount, getAlbumSongs}
