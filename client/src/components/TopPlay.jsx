/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { FreeMode } from 'swiper';
import { baseUrl } from '../constants/base_urls';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

import 'swiper/css';
import 'swiper/css/free-mode';
import axios from 'axios';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`flex flex-row items-center hover:bg-cl duration-300 ${activeSong?.title === song?.title ? 'bg-cl' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="hidden md:block font-bold text-sm text-gray-400 mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img className="w-16 h-16 rounded-lg" src={song?.cover} alt={song?.title} />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song?._id}`}>
          <p className="text-md font-semibold text-white">
            {song?.title}
          </p>
        </Link>
        <Link to={`/artist/${song?.artist?._id}`}>
          <p className="text-base text-gray-300 mt-1">
            {song?.artist?.name}
          </p>
        </Link>
      </div>
      <div className="relative hidden md:block">
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
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = []
  const [topPlayCharts, setTopPlayCharts] = useState([]);
  const [artists, setArtists] = useState([]);
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  useEffect(() => {
    const fetchTopCharts = async () => {
      const response = await axios.get(`${baseUrl}songs/songs/top-play`);
      setTopPlayCharts(response?.data?.songs);
    };
    fetchTopCharts();
  }, []);
  useEffect(() => {
    const fetchArtists = async () => {
      const response = await axios.get(`${baseUrl}artists`);
      setArtists(response?.data);
    };
    fetchArtists();
  }, []);

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div ref={divRef} className="hidden 2xl:flex xl:ml-6 ml-0 xl:mb-0 rounded-lg mb-6 w-[240px] md:w-[300px] bg-black flex-col py-8 px-4">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-gray-500 font-bold text-md">Artists</h2>
        </div>

        {/* <div className="mt-4 flex flex-col gap-1">
          {topPlayCharts?.length > 0 && topPlayCharts?.map((song, i) => (
            <TopChartCard
              key={song._id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div> */}
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-md">Artists</h2>
          <Link to="/artists">
            <p className="text-gray-400 text-sm cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          // modules={[FreeMode]}
          className="mt-4"
        >
          {artists?.length > 0 && artists?.slice(0, 5).map((artist) => (
            <SwiperSlide
              key={artist?._id}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artist/${artist?._id}`}>
                <img src={artist?.picture} alt="Name" className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
