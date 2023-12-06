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
import { Home } from './pages/Home/Home';
import Blog from './pages/blog/Blog';
import { DashboardLayout } from './Dashboard/DashboardLayout';
import AboutPage from './pages/AboutPage';
import Blogs from './pages/blog/Blogs';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import BlogPopup from './components/blogs/BlogPopup';
import Users from './Dashboard/users/Users';
import User from './Dashboard/User';
import UserProfileRoute from './helpers/UserProfileRoute';
import Artists from './Dashboard/users/Artists';
import Artist from './Dashboard/Artist';
import ManageBlogs from './Dashboard/ManageBlogs';
import EditBlogPopup from './components/blogs/EditBlogPopup';

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
                  {/* Dashboard routes */}
                  <Route path="/admin/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>} />
                  <Route path="/admin/dashboard/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                  <Route path="/admin/dashboard/admin/:id" element={<UserProfileRoute><Users /></UserProfileRoute>} />
                  <Route path="/admin/dashboard/user/:id" element={<PrivateRoute><User /></PrivateRoute>} />
                  <Route path="/admin/upload-song" element={<SongPopup />} />
                  <Route path="/admin/dashboard/admin/:id" element={<UserProfileRoute><Users /></UserProfileRoute>} />
                  <Route path="/admin/dashboard/artists" element={<PrivateRoute><Artists /></PrivateRoute>} />
                  <Route path="/admin/dashboard/artist/:id" element={<Artist />} />
                  <Route path="/admin/dashboard/blogs" element={<ManageBlogs />} />
                  <Route path="/admin/dashboard/blog/:id" element={<EditBlogPopup />} />
                  {/* User private routes */}
                  <Route path="/user/:id" element={<UserProfileRoute><User /></UserProfileRoute>} />
                  {/* user/public routers */}
                  <Route path="/songs" element={<Songs />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/create-blog" element={<PrivateRoute><BlogPopup /></PrivateRoute>} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blogs/:id" element={<Blog />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/albums" element={<Albums />} />
                  <Route path="/upload-song" element={<SongPopup />} />
                  <Route path="/songs/:songid" element={<SongDetails />} />
                  <Route path="/album/:albumid" element={<AlbumDetails />} />
                  <Route path="/artists" element={<TopArtists />} />
                  <Route path="/artists/:id" element={<Artist />} />
                  <Route path="/create-artist" element={<CreateArtistPopup />} />
                  <Route path="/artist/:id" element={<ArtistDetails />} />
                  <Route path="/search/:searchTerm" element={<Search />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </div>
        </div>

      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup md:bg-transparent md:bg-gradient-to-r md:from-red md:backdrop-blur-sm z-50 bg-cl">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
