import { useEffect } from 'react';
import { MdAdd } from "react-icons/md"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import CreateBlog from './CreateBlog';
import CreateCategory from './CreateCategory';
import SideBar from '../../Dashboard/SideBar';

const BlogPopup = () => {
  const { isAdmin } = useSelector((state) => state.auth)
  const [categoryPopup, setCategoryPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin === false) {
      navigate('/');
      setCategoryPopup(false);
    }
  }, []);

  return (
    <div className='flex'>
      <SideBar />
      <div className="relative flex flex-col m-auto my-2 md:my-10 items-center justify-center bg-bg_alt pt-10 pb-4 w-[320px] md:w-[1000px] self-center rounded-lg md:px-10 md:p-20">
        <div onClick={() => setCategoryPopup(!categoryPopup)} className="absolute top-0 right-5 cursor-pointer flex items-center gap-2 justify-center">
          <MdAdd siz={22} />
          {categoryPopup ? (<p>Create blog</p>) : (<p>Add category</p>)}
        </div>
        <div className="flex flex-col items-center w-[300px] md:w-full">
          <p className='text-center font-bold text-3xl pb-4'>Customize your {categoryPopup ? 'blog category' : 'blog'}</p>
          <p className="text-center text-lighter   text-md">Customize your {categoryPopup ? "album's" : "blog's"} unique personality and message.<br /> And remember, you can always update it as your {categoryPopup ? "blog's category" : 'blog'} as time goes
          </p>
        </div>
        <div className="md:w-[550px]">
          {categoryPopup ? (<CreateCategory setCategoryPopup={setCategoryPopup} />) : (<CreateBlog setCategoryPopup={setCategoryPopup} />)}
        </div>
      </div>
    </div>
  )
}

export default BlogPopup
