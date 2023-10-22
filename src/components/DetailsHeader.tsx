import { useEffect, useState } from 'react'
import moment from "moment";
import { Link } from "react-router-dom";
import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from 'react-helmet';
import { baseUrl } from '../constants/base_urls';
import { FaDownload, FaPlay } from 'react-icons/fa';
import axios from 'axios';

const DetailsHeader = ({ song }) => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song }))
    dispatch(playPause(true))
  }

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
  };

  return(
  <div className="relative w-full flex flex-col">
    <div className="flex flex-col pt-5 md:pt-0 md:flex-row w-full md:bg-gradient-to-l from-transparent to-black rounded-lg sm:h-[320px]">
      <div className="flex flex-col md:flex-row flex-1 mt-2 px-4">
        <div className={`flex flex-col w-[200px] md:w-[330px] backdrop-blur-sm animate-slideup cursor-pointer text-center rounded-xl border border-cl duration-300`}>
          <div className="w-full md:w-[320px] md:h-[300px] group align-center justify-center flex">
            <img src={song?.cover} className='rounded-xl ' />
            <div className={`absolute inset-0 justify-center items-center group-hover:flex rounded-lg
              ${activeSong?.title === song?.title ? ' bg-opacity-70': 'hidden'}`}>
                <PlayPause
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  song={song}
                  handlePause={handlePauseClick}
                  handlePlay={handlePlayClick}
                />
            </div>
          </div>
        </div>
        <div className="ml-5 text-white">
            <p className="font-bold sm:text-[20px] text-xl">{song?.title}</p>
              <Link  to={`/artists/${song?.artist?._id}`}>
              <p className="text-[14px] text-white font-semibold">{song?.artist?.name}</p>
                <p className="text-base mt-2">
                  {song?.artists}
                </p>
              </Link>
              <p className="text-base mt-2 text-white">
                {moment(song?.date).fromNow()}
            </p>
            <p className="text-base mt-2 text-white">
                {song?.genre}
            </p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-4">
        <button  onClick={handleDownload} className='bg-black py-2 px-4 rounded-full cursor-pointer font-bold'>Download {song?.title}</button>
        <div className="flex gap-4 items-center text-gray-500 pt-4">
          <div className="flex gap-2 items-center">
            <FaPlay size={16} />
            <p className=''>{song?.playCount}</p>
          </div>
          <div className="flex gap-2 items-center">
              <FaDownload size={16} />
              <p className=''>{song?.downloadCount}</p>
          </div>
        </div>
      </div>
    </div>
          {/* Add the Helmet section for Open Graph meta tags */}
      <Helmet>
        <meta property="og:title" content={song.title} />
        <meta property="og:description" content={song.description} />
        <meta property="og:image" content={song.cover} />
      </Helmet>
  </div>
)};

export default DetailsHeader;
