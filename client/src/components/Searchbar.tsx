import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from 'react-icons/fi'
import logo from '../assets/fl.png'
import { useSelector } from "react-redux";
import { MdDashboard, MdFeed, MdHome, MdLogin, MdLogout, MdSubject } from "react-icons/md";

const Searchbar = () => {
  const { _id, given_name, family_name, email, isAdmin, picture } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`search/${searchTerm}`)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload();
  }

  return (
    <div className="flex items-center justify-between h-[120px] mb-10 mt-5 md:px-20 md:p-6 ">
      <Link to='/songs'>
        <div className="flex text-center items-center text-red font-bold md:pr-3 rounded-full">
          <img src={logo} alt='logo' className="hidden lg:block w-14 h-14 object-center object-cover" />
        </div>
      </Link>
      <div className="flex items-center gap-4 justify-start lg:justify-end w-full lg:mr-12 md:mr-0">
        <div className="flex justify-between items-center gap-x-4">
          <Link to='/songs'>
            <div className="flex md:hidden text-center md:bg-cl items-center text-red font-bold rounded-full bg-black">
              <img src={logo} alt='logo' className="w-[34px] h-[34px] object-center object-cover" />
            </div>
          </Link>
          {isAdmin && (
            <div className="gap-x-4 items-center hidden 2xl:flex">
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
          lg:px-3
          lg:py-2
          p-2
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
              lg:px-3
              lg:py-2
              p-2
              hover:opacity-75
              transition"
            >
              <div className="md:hidden"><MdHome /></div>
              <p className="hidden md:block">Home</p>
            </button>
          </div>
        </div>
        <div className="hidden 2xl:block w-[400px]">
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
        <div className="flex justify-between items-center">
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
                lg:px-3
                lg:py-2
                p-2
                hover:opacity-75
                transition"
              >
                <div className="md:hidden"><MdLogout /></div>
                <p className="hidden md:block">Sign out</p>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/signin')}
              className="
                  text-white
                  font-medium
                  w-full
                  rounded-full
                  bg-cl
                  border
                  border-transparent
                  lg:px-3
                  lg:py-2
                  p-2
                  m-0
                  hover:opacity-75
                  transition
                  cursor-pointer
                ">
              <div className="md:hidden"><MdLogin /></div>
              <p className="hidden md:block">Sign in</p>
            </button>
          )}
        </div>
      </div>
    </div>
  )
};

export default Searchbar;
