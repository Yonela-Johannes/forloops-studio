import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment/moment';
import { AiFillEye, AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { RiFileListFill, RiFileListLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Comments from "../../components/blogs/Comments";
import { baseUrl } from "../../constants/base_urls";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const params = useParams();
  const { _id } = useSelector((state) => state.auth);
  const { id } = params;

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await axios.get(`${baseUrl}blog/${id}`);
      setBlog(response?.data?.blog);
    };
    fetchAlbums();
  }, [id]);

  const likePost = async (data) => {
    await axios.patch(`${baseUrl}blog/like/${data?._id}`, {
      userId: _id,
    });
    const response = await axios.get(`${baseUrl}blog/${id}`);
    setBlog(response?.data?.blog);
    return toast("You reacted to post");
  };

  return (
    <div>
      <Toaster />
      <div className="flex flex-col md:flex-row p-1 bg-white pb-24 sm:pb-32 ">
        <div className=" lg:flex-1 md:p-4">
          <img src={blog?.image} alt="" className="md:h-[700px] h-[300px] mb-4 object-contain md:object-cover w-full bg-gray-50" />
          <div className="flex justify-between items-start">
            <div className="">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">{blog?.title}</h2>
              <p className="mt-2 text-md leading-8 text-gray-600">
                {blog?.subtitle}
              </p>
            </div>
            <div className="group">
              <div className="flex mt-1 justify-end text-lg font-semibold leading-6 text-gray-900">
                <div onClick={() => likePost(blog)} className={`flex items-center justify-center rounded-full ${_id ? 'hover:bg-gray-300 duration-300 cursor-pointer' : ''}  p-1  gap-1 text-sm`}>
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
          <div className="mt-2 max-w-2xl pt-2 gap-x-8 gap-y-16 border-t border-gray-200 sm:mt-4 lg:mx-0 lg:max-w-none">
              <article key={blog?._id} className="flex w-full flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={blog?.createdAt} className="text-gray-500">
                    {moment(blog?.createdAt).fromNow()}
                  </time>
                  <p
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {blog?.category?.title}
                  </p>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <p>
                      <span className="absolute inset-0" />
                      {blog?.title}
                    </p>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-mdp
                  leading-6 text-black">{ReactHtmlParser(blog?.post)}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={blog?.user?.picture} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <p>
                        <span className="absolute inset-0" />
                        {blog?.user?.given_name} {blog?.user?.family_name}
                      </p>
                    </p>
                    <p className="text-gray-600">{blog?.user?.role}</p>
                  </div>
                </div>
              </article>
          </div>
        </div>
        <Comments postId={id} blogUserId={blog?.user?._id} setBlog={setBlog} />
      </div>
    </div>
  )
}

export default Blog;
