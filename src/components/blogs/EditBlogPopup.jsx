import { useEffect } from 'react';
import {  MdEdit } from "react-icons/md"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import SideBar from '../../Dashboard/SideBar';
import EditBlog from './EditBlog';

const EditBlogPopup = () => {
  const { isAdmin } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin === false) {
      navigate('/');
    }
  }, []);

  return (
    <div className='flex'>
      <SideBar />
      <div className="relative flex flex-col m-auto my-2 md:my-10 items-center justify-center bg-bg_alt pt-10 pb-4 w-[320px] md:w-[1000px] self-center rounded-lg md:px-10 md:p-20">
        <div  className="absolute top-0 right-5 cursor-pointer flex items-center gap-2 justify-center">
          <MdEdit siz={22} />
          <p>Edit Your blog</p>
        </div>
        <div className="flex flex-col items-center w-[300px] md:w-full">
          <p className="text-center font-bold text-3xl pb-4">Edit your blog</p>
          <p className="text-center text-lighter  text-md">Edit this blog post unique personality and message.<br />
          </p>
        </div>
        <div className="md:w-[550px]">
          <EditBlog />
        </div>
      </div>
    </div>
  )
}

export default EditBlogPopup
