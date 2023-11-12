import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from 'react-icons/fi'
import logo from '../assets/fl.png'
import { useSelector } from "react-redux";
import { MdDashboard, MdFeed, MdHome, MdLogin, MdLogout, MdSubject } from "react-icons/md";

const Searchbar = () => {
  const { _id, given_name, family_name, email, isAdmin, picture } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const [searchTerm, setSearchTerm ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`search/${searchTerm}`)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload();
  }

  return (
  <div className="flex items-center justify-between h-[100px] md:px-20 md:p-6 ">
      <Link to='/songs'>
      <div className="flex text-center md:bg-cl items-center text-red font-bold md:pr-3 rounded-full">
          <img src={logo}  alt='logo' className="w-14 h-14 object-center object-cover"/>
          <p className="hidden md:block text-[18px]">forloops Studio</p>
          <p className="md:hidden text-[18px]">fl Studio</p>
      </div>
    </Link>
    <div className="flex items-center gap-8 mr-12 md:mr-0">
    <div className="flex justify-between items-center gap-x-4">
      {isAdmin && (
      <div className="flex gap-x-4 items-center">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="
          text-neutral-300
          font-medium
          w-full
          rounded-full
          bg-black
          border
          border-transparent
          px-3
          py-2
          hover:opacity-75
          transition"
        >
          <div className="md:hidden"><MdDashboard /></div>
          <p className="hidden md:block">Dashboard</p>
        </button>
      </div>
      )}
          <div className="flex gap-x-4 items-center">
            <button
              onClick={() => navigate('/')}
              className="
              text-neutral-300
              font-medium
              w-full
              rounded-full
              bg-black
              border
              border-transparent
              px-3
              py-2
              hover:opacity-75
              transition"
            >
              <div className="md:hidden"><MdHome /></div>
              <p className="hidden md:block">Home</p>
            </button>
          </div>
          <div className="flex gap-x-4 items-center">
            <button
              onClick={() => navigate('/about')}
              className="
              text-neutral-300
              font-medium
              w-full
              rounded-full
              bg-black
              border
              border-transparent
              px-3
              py-2
              hover:opacity-75
              transition"
            >
              <div className="md:hidden"><MdSubject /></div>
              <p className="hidden md:block">About</p>
            </button>
          </div>
          <div className="flex gap-x-4 items-center">
            <button
              onClick={() => navigate('/blogs')}
              className="
              text-neutral-300
              font-medium
              w-full
              rounded-full
              bg-black
              border
              border-transparent
              px-3
              py-2
              hover:opacity-75
              transition"
            >
              <div className="md:hidden"><MdFeed /></div>
              <p className="hidden md:block">Blogs</p>
            </button>
          </div>
        </div>
      <div className="hidden md:block w-[400px]">
        <form autoComplete="off" className="p2" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-start items-center bg-black p-2 rounded-full mx-2">
            <FiSearch className="w-7 h-7" />
            <input
              name="search-field"
              autoComplete="off"
              id="search-field"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='flex-1 border-none outline-none text-base p4 bg-transparent'
            />
          </div>
        </form>
      </div>
        <div className="flex justify-between items-center gap-x-4">
          {_id ? (
            <div className="flex gap-x-4 items-center">
              <button
                onClick={handleLogout}
                className="
                text-white
                font-medium
                w-full
                rounded-full
                bg-black
                border
                border-transparent
                px-3
                py-2
                hover:opacity-75
                transition"
              >
                <div className="md:hidden"><MdLogout /></div>
                <p className="hidden md:block">Sign out</p>
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => navigate('/signin')}
                className="
                  text-white
                  font-medium
                  w-full
                  rounded-full
                  bg-red
                  border
                  border-transparent
                  px-3
                  py-2
                  hover:opacity-75
                  transition
                  cursor-pointer
                ">
                <div className="md:hidden"><MdLogin /></div>
                <p className="hidden md:block">Sign in</p>
              </button>
            </div>
          )}
        </div>
    </div>
  </div>
)};

export default Searchbar;
