import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Searchbar, Sidebar, MusicPlayer, Loader } from './components';
import { Search, SongDetails } from './pages';
import SongPopup from './components/music/SongPopup';
import Songs from './pages/Songs';
import Albums from './pages/Albums';
import AlbumDetails from './pages/AlbumDetails';
import TopPlay from './components/TopPlay';
import React, { useEffect, useState } from 'react';
import ArtistDetails from './pages/ArtistDetails';
import TopArtists from './pages/TopArtists';
import Signin from './pages/auth/Signin';
import CreateArtistPopup from './pages/CreateArtistPopup';
import routeMiddleware from './routeMiddleware';
import About from './pages/About';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const { _id, isAdmin, picture, artist } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  return (
      <div className="flex-1 flex flex-col text-white bg-background">
          <div className="flex">
            <div className="animate-slideup bg-cl">
              <Sidebar/>
            </div>
            <div className="w-full px-6 h-[calc(100vh)] overflow-y-scroll flex flex-col">
              <Searchbar />
              <div className="flex-1 h-fit pb-40">
                <Routes>
                  <Route path="/" element={<Songs />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/albums" element={<Albums />} />
                  <Route path="/upload-song" element={<SongPopup />} />
                  <Route path="/songs/:songid" element={<SongDetails />} />
                  <Route path="/album/:albumid" element={<AlbumDetails />} />
                  <Route path="/artists" element={<TopArtists />} />
                  <Route path="/create-artist" element={<CreateArtistPopup />} />
                  <Route path="/artists/:id" element={<ArtistDetails />} />
                  <Route path="/search/:searchTerm" element={<Search />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </div>
              <div className="xl:sticky relative top-0 h-fit">
            {/* <TopPlay /> */}
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup md:bg-transparent md:bg-gradient-to-r md:from-black md:backdrop-blur-sm z-10 bg-cl">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
