import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';
import { FaDownload } from 'react-icons/fa';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { baseUrl } from '../constants/base_urls';

const SongBar = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick, albumid, setSongs }) => {

  const handleDownload = async () => {
    // Create a new Blob object from the audio URL.
    fetch(song?.song)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);

        // Create an invisible anchor element for downloading.
        const link = document.createElement('a');
        link.href = url;
        link.download = song.title; // Set the desired file name.
        link.style.display = 'none';

        // Append the anchor to the document and trigger the download.
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the anchor element.
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading the audio:', error);
      })
      await axios.patch(baseUrl + '/songs/download/' + song?._id);
      const result = await axios.get(baseUrl + '/album/songs/' + albumid);
      setSongs(result?.data);
  };

  return (
    <div className={`w-full flex flex-row items-center ${activeSong?.title === song?.title ? 'border-b border-black' : 'bg-transparent'} py-2 md:p-4 cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-gray-600 px-1">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.cover}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
            <Link to={`/songs/${song._id}`}>
              <p className="text-xl font-bold text-white">
                {song?.title}
              </p>
            </Link>
            <p className="text-xl font-bold text-white">
              {song?.genre}
            </p>
          <p className="text-base text-white mt-1">
            {song?.artists}
          </p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-8 items-center text-gray-600">
        <div className="flex gap-2">
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick(song, i)}
          />
          <p className='text-gray-200'>{song?.playCount}</p>
        </div>

        <div className="flex gap-2" onClick={handleDownload}>
          <FaDownload size={22} />
          <p className='text-gray-200'>{song?.downloadCount}</p>
        </div>
      </div>
      {/* Add the Helmet section for Open Graph meta tags */}
      <Helmet>
        <meta property="og:title" content={song.title} />
        <meta property="og:description" content={song.description} />
        <meta property="og:image" content={song.cover} />
      </Helmet>
    </div>
  )
};

export default SongBar;
