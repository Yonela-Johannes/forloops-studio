import { useState, useEffect } from "react";
import { Spinner } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { baseUrl } from "../../constants/base_urls";
import moment from "moment/moment";
import ReactHtmlParser from 'react-html-parser';
import { AiFillEye, AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { RiFileListFill, RiFileListLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const Blogs = () => {
  const { _id } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await axios.get(`${baseUrl}blog`);
      setBlogs(response?.data);
    };
    fetchAlbums();
  }, []);

  const viewPost = async (data) => {
    await axios.patch(`${baseUrl}blog/view/${data?._id}`, {
      userId: _id,
    });
    const response = await axios.get(`${baseUrl}blog`);
    setBlogs(response?.data?.blog);
    navigate(`/blogs/${data?._id}`);
  };

  return (
    <div>
      <div className="bg-white py-4 sm:py-10">
        <div className="mx-auto max-w-7xl px-3 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Focal point</h2>
            <p className="text-base mt-2 md:text-lg leading-8 text-gray-600">
            Uncovering the Latest in News, Blogs, Articles, and Inspirational Biographies in local music.
            </p>
          </div>
          <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-4 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {blogs?.map((blog) => (
              <article onClick={() => viewPost(blog)} key={blog._id} className="flex max-w-xl flex-col items-start justify-between cursor-pointer">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={blog?.createdAt} className="text-gray-500">
                    {moment(blog?.createdAt).fromNow()}
                  </time>
                  <p
                    href={blog?.category?.title}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {blog?.category.title}
                  </p>
                </div>
                 <img src={blog?.image} alt="display" className="md:w-[300px] md:h-[250px] object-cover rounded-md" />
                  <div className="flex justify-between w-full">
                    <div className="group relative">
                      <h3 className="mt-1 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <span className="absolute inset-0" />
                          {blog?.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{ReactHtmlParser(blog?.subtitle.slice(0, 250) + '...')}</p>
                    </div>
                    <div className="group relative">
                      <div className="flex mt-1 justify-end text-lg font-semibold leading-6 text-gray-900">
                        <div className={`flex items-center justify-center rounded-full  p-1  gap-1 text-sm`} >
                          {blog?.lovedUsers?.includes(_id) ? (<AiFillHeart size={18} />) : (<AiOutlineHeart size={18} />)}
                          {blog?.loveCount}
                        </div>
                        <div className={`flex items-center justify-center rounded-full  p-1  gap-1 text-sm`} >
                          {blog?.viewedUsers?.includes(_id) ? (<AiFillEye size={18} />) : (<AiOutlineEye size={18} />)}
                          {blog?.viewCount}
                        </div>
                      </div>
                      <div className={`flex items-center justify-end text-gray-500 p-1  gap-1 text-sm`} >
                          {blog?.commentedCount?.includes(_id) ? (<RiFileListFill size={16} />) : (<RiFileListLine size={16} />)}
                          <p className="hidden md:block">comments </p>{blog?.commentsCount}
                      </div>
                    </div>
                  </div>

                <div className="relative mt-3 flex items-center gap-x-4">
                  <img src={blog?.user?.picture} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0" />
                        {blog?.user?.given_name} {blog?.user?.family_name}
                    </p>
                    <p className="text-gray-600">{blog?.user?.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blogs
