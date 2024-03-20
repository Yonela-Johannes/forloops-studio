import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import logo from '../assets/fl.png'
import { useSelector } from 'react-redux';
import { MdOutlineFeed } from 'react-icons/md';

const links = [
  { name: 'Songs', to: '/songs', icon: HiOutlineHome },
  { name: 'Albums', to: '/albums', icon: HiOutlinePhotograph },
  { name: 'Artists', to: '/artists', icon: HiOutlineUserGroup },
];

const NavLinks = ({ handleClick }) => (
  <div className="flex flex-col mt-2">
    {links.map((item) => (
      <NavLink
        to={item.to}
        key={item.name}
        className="flex flex-row justify-start items-center gap-1 my-5 text-sm font-medium text-gray-400 hover:bg-cl p-2 rounded-full duration-300"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        <p className='text-[16px]'>{item.name}</p>
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { _id, isAdmin, picture, artist } = useSelector((state) => state.auth)

  return (
    <div className='flex flex-col items-center justify-between mb-10'>
      <div className='h-full w-full'>
        <div className="md:flex hidden flex-col w-[240px] py-4 px-4 bg-black">
          <div onClick={() => navigate('/songs')} className="cursor-pointer">
            <img src={logo} alt="logo" className="w-full h-24 object-contain" />
          </div>
          <NavLinks />
        </div>

        {/* Mobile sidebar */}
        <div className="absolute md:hidden block top-6 text-white right-3">
          {!mobileMenuOpen ? (
            <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
          ) : (
            <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
          )}
        </div>

        <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-red backdrop-blur-lg z-40 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
          <img src={logo} alt="logo" className="w-full h-20 object-contain" />
          <NavLinks handleClick={() => setMobileMenuOpen(false)} />
          <div onClick={() => navigate(`/user/${_id}`)} className="flex justify-center md:block w-18 h-16 items-center">
            {_id && (<img src={picture} className="w-11 h-11 object-center object-cover rounded-full" />)}
          </div>
        </div>
      </div>
      {isAdmin && (
        <div className="hidden md:flex flex-col gap-8 mt-8 mb-12">
          {artist &&
          (
            <button onClick={() => navigate('/create-artist')} className="text-neutral-300 font-medium cursor-pointer rounded-full bg-black border border-transparent px-3 py-2 hover:opacity-75 transition">
              <p>Create Artist</p>
            </button>
          )}

          {artist && (<button onClick={() => navigate('/upload-song')} className="text-neutral-300 font-medium cursor-pointer rounded-full bg-black border border-transparent px-3 py-2 hover:opacity-75 transition">
              <p>Create new song</p>
            </button>)}
        </div>
      )}
      <div onClick={() => navigate(`/user/${_id}`)} className="hidden md:block w-18 h-16 mt-4 cursor-pointer duration-300">
        {picture && (<img src={picture} className="w-14 h-14 object-center object-cover rounded-full" />)}
      </div>
    </div>
  );
};

export default Sidebar;
