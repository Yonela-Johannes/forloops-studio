const mongoose = require('mongoose');
const Song =  require("../models/songModel");
const User = require('../models/userModel');
const Artist = require('../models/artistModel');
const Album = require('../models/albumModel');

const getSongs = async (req, res) => {
  try {
      const song = await Song.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers').populate('album').populate('artist');
      res.status(200).json(song)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const searchSong = async (req, res) => {
  const { searchTerm } = req.params;
  try {
    const songs = await Song.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } }
      ],
    })
      .sort({ createdAt: -1 })
      .populate('lovedUsers')
      .populate('artist')
      .populate('album');

      console.log(songs)
    const artist = await Artist.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } }
      ],
    })
      .sort({ createdAt: -1 })
      .populate('lovedUsers')
    console.log(artist)
      const album = await Album.find({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in the title field
          // Add more fields to search here, e.g., { artist: { $regex: searchTerm, $options: 'i' } }
        ],
      })
        .sort({ createdAt: -1 })
        .populate('lovedUsers')
        .populate('user')
        .populate('artist');
      if(songs?.length > 0){
        res.status(200).json(songs);
      }else if(artist?.length > 0){
        res.status(200).json(artist);
      }else if(album?.length > 0) {
        res.status(200).json(album);
      }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};


const getSongsByArtist = async (req, res) => {
  const { id } = req.params
  console.log(req.params)
  try {
      const song = await Song.find({artist: id}).sort({"createdAt": -1}).populate('lovedUsers').populate('artist');
      res.status(200).json(song)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getNewSongs = async (req, res) => {
  try {
      const song = await Song.find().populate('user').sort({"createdAt": -1}).populate('lovedUsers').limit(10).populate('artist');
      res.status(200).json(song)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const getSong = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const song = await Song.findById(_id).populate('user').populate('lovedUsers').populate('album').populate('artist');
    res.status(200).json(song)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: error.message})
  }
}

const addSong = async (req, res) => {
  const { userId, title, cover, album, lyrics, date, artistId, song } = req.body

  try {
    const newSong = new Song({song, title, cover, album: album ? album : null, lyrics, date, artist: artistId, user: userId })
    await newSong.save();
    res.status(200).json(newSong);
  } catch (error) {
    console.log(error.message)
    res.status(409).json({message: error.message})
  }
}

const getFavorites = async (req, res) => {
  const { userId } = req.params

  if(!userId) res.json({
    message: 'No user provided'
  });

   const findUser = await User.findById(userId);

  if(!findUser) res.json({
    message: 'User does not exist'
  });

  try {
    const song = await Song.find({lovedUsers: userId}).populate('user').populate('lovedUsers').populate('album').populate('artist');
    res.status(200).json(song);
  } catch (error) {
    res.status(409).json({message: error.message})
  }
}

const updateSong = async (req, res) => {
  const { id: _id } = req.params;
  const song = req.body

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No song with that id')
  const updatedSong = await Song.findByIdAndUpdate(_id, {...song, _id}, {new: true});
  res.json(updatedSong)
}

const deleteSong = async (req, res) => {
  const { id: _id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No song with that id')

  await  Song.findByIdAndRemove(_id);
  res.json({message: 'Song deleted successfully'});
}

const loveSong = async (req, res) => {
  const { songId } = req.params;
  const { userId } = req.body

  if (!userId || !songId) {
    return res.json({ message: 'Unauthenticated' });
  }

  try {
    const songData = await Song.findById(songId);
    if (songData) {
      const findSong = songData.lovedUsers.includes(userId);
      console.log({findSong})
      if (findSong) {
        const updatedSong = await Song.findOneAndUpdate(
          { _id: songData._id },
          {
            $inc: { loveCount: findSong.loveCount <= 0 ? 0 : -1 },
            $pull: { lovedUsers: userId }
          }
        ).populate('user').populate('artist');
        res.status(200).json({
          song: updatedSong,
        });
        } else {
          const updatedSong = await Song.findOneAndUpdate(
            { _id: songId },
            {
              $inc: { loveCount: 1 },
              $push: { lovedUsers: userId }
            }
          ).populate('user').populate('artist');
          res.status(200).json({
            song: updatedSong,
          });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const playSong = async (req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);
  const updatedSong = await Song.findByIdAndUpdate(id, {playCount: song.playCount + 1}, { new: true}).populate('artist');
  res.json({song: updatedSong})
}


const downloadSong = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (id) {
    try {
      // Find the existing user data
      const songData = await Song.findById(id);
      if (songData) {
        console.log(songData)
        const findDownloadedUser = songData.downloadedUsers.includes(userId);
         if (!userId) {
           const updatedSong = await Song.findOneAndUpdate(
             { _id: songData._id },
             {
               $inc: { downloadCount: 1 },
             }
           ).populate('user').populate('artist');
           res.status(200).json({
             song: updatedSong,
           });
         } else {
           if (findDownloadedUser === false) {
             const updatedSong = await Song.findOneAndUpdate(
               { _id: songData._id },
               {
                 $inc: { downloadCount: 1 },
                 $push: { downloadedUsers: userId }
               }
             ).populate('user').populate('artist');
             res.status(200).json({
               song: updatedSong,
             });
           } else {
            const updatedSong = await Song.findOneAndUpdate(
              { _id: songData._id },
              {
                $inc: { downloadCount: 1 },
              }
            ).populate('user').populate('artist');
            res.status(200).json({
              song: updatedSong,
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


const viewSong = async (req, res) => {
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No song with that id')

  const song = await Song.findById(id);
  const updatedSong = await Song.findByIdAndUpdate(id, {viewCount: song.viewCount + 1}, { new: true}).populate('user').populate('artist');

  res.json({song: updatedSong})
}

const topPlay = async (req, res) => {
  const songs = await Song.find().sort({'playCount': -1}).populate('artist');
  res.json({songs})
}

const addToPlaylist = async (req, res) => {
  const { songId } = req.params;
  const { userId } = req.body

  try {
    const songData = await Song.findById(songId);
    const userData = await User.findById(userId);
    if (songData) {
      const findSong = userData.playlist.includes(songId);
      if (findSong) {
        const updatedSong = await User.findOneAndUpdate(
          { _id: userData._id },
          {
            $pull: { playlist: findSong._id }
          }
        ).populate('artist');
        res.status(200).json({
          song: updatedSong,
        });
        } else {
          const updatedSong = await User.findOneAndUpdate(
            { _id: userData._id },
            {
              $push: { playlist: songId }
            }
          ).populate('artist');
          res.status(200).json({
            song: updatedSong,
          });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

const getPlaylist = async (req, res) => {
  const { userId } = req.params
  try {
    const userData = await User.findById(userId).populate('playlist').populate('artist');
    res.status(200).json({
      song: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
module.exports = {addToPlaylist, getPlaylist, getFavorites, topPlay, searchSong, getSongsByArtist, addSong, getNewSongs, getSongs, getSong, updateSong, deleteSong , loveSong, playSong, downloadSong, viewSong}
