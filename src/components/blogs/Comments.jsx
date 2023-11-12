import React, { useState, useEffect } from "react";
import { GoVerified } from "react-icons/go";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { AiFillLike, AiOutlineClose, AiOutlineEdit, AiOutlineLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { baseUrl } from "../../constants/base_urls";

const Comments = ({
  postId,
  blogUserId,
  setBlog,
}) => {
  const { _id, email } = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [activeEditComment, setActiveEditComment] = useState(false);
  const [editCommentId, setEditCommentId] = useState('');
  const [editComment, setEditComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (postId) {
      const fetchComments = async () => {
        const response = await axios.get(`${baseUrl}blog-comment/${postId}`);
        setComments(response?.data?.comments);
      };
      fetchComments();
    }
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!_id) return toast("Please login to comment");
    if (!comment) return toast("Required comment field");
    if (comment.length < 10)
      return toast("Comment should have a minimum of 10 characters");
    setLoading(true);
    await axios.post(`${baseUrl}blog-comment/comment/${postId}`, {
      postId,
      userId: _id,
      comment,
    });
    const response = await axios.get(`${baseUrl}blog-comment/${postId}`);
    setComments(response?.data?.comments);
    setLoading(false);
    setComment('');
    const res = await axios.get(`${baseUrl}blog/${postId}`);
    setBlog(res?.data?.blog);
    return toast("Your comment has been added");
  };

  const handleComment = (e) => {
    setComment(e.target.value);
    setActiveEditComment(false);
    setEditComment('');
  };

  const handleEditComment = (data) => {
    setActiveEditComment(true);
    setEditComment(data?.comment);
    setEditCommentId(data?._id);
  };

  const handleCloseComment = () => {
    setActiveEditComment(false);
    setEditComment('');
    setEditCommentId('')
  };

  const handleUpdate = async (data) => {
    if (!_id) return toast("Please login to comment");
    setLoading(true);
    await axios.patch(`${baseUrl}blog-comment/update/${data?._id}`, {
      userId: _id,
      comment: editComment,
    });
    const response = await axios.get(`${baseUrl}blog-comment/${postId}`);
    setComments(response?.data?.comments);
    setLoading(false);
    setComment('');
    setActiveEditComment(false);
    setEditComment('');
    setEditCommentId('')
    return toast("Your comment has been updated");
  };

  const likePost = async (data) => {
    await axios.patch(`${baseUrl}blog-comment/like/${data?._id}`, {
      userId: _id,
    });
    const response = await axios.get(`${baseUrl}blog-comment/${postId}`);
    setComments(response?.data?.comments);
    return toast("You reacted to comment");
  };

  return (
    <div className="md:w-[450px] p-4 text-black bg-gray-100 mt-4">
      <Toaster />
      {email && (
        <div className="pb-2 px-2">
          <div className="flex gap-4">
            {!activeEditComment ? (
              <div className="flex flex-col md:flex-row gap-4">
                <textarea
                  value={comment}
                  onChange={handleComment}
                  className="bg-primary md:px-6 p-2 md:py-4 text-md font-medium bg-gray-200 w-full focus:outline-none flex-1 rounded-lg"
                  placeholder="Add comment.."
                />
                <button className="bg-gray-400 h-min rounded-md p-2 text-md border-none" onClick={handleSubmit}>
                  Comment
                </button>
              </div>
            ) : (
              <div
                onClick={handleComment}
                className="cursor-pointer bg-primary px-6 py-4 text-md font-medium w-[250px] bg-gray-200 md:w-full h-[80px] focus:outline-none flex-1 rounded-lg"
              ></div>
            )}
          </div>
        </div>
      )}
      <div className="pt-4 overflow-y-scroll lg:h-[700px] bg-gray-100">
        {comments?.length > 0 ? (
          comments?.map((com, idx) => (
            <div className="p-2 items-center" key={idx}>
              <div>
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14">
                    <img
                      className="w-12 h-12 object-center object-cover rounded-full cursor-pointer"
                      src={com?.user?.picture}
                      alt="user-profile"
                      layout="responsive"
                    />
                  </div>
                  <p className={`flex cursor-pointer gap-1 items-center text-sm md:text-[18px] md:font-bold leading-6 text-primary`}>
                    {com?.user?.given_name} {com?.user?.family_name}
                    {com?.user?.isAdmin && (
                      <GoVerified />
                    )}
                    {com?.user?._id === blogUserId && (
                      <BiComment />
                    )}
                  </p>
                </div>
              </div>
              <div className="flex -mt-5 items-start justify-between">
                {activeEditComment && com?._id === editCommentId ? (
                  <div className="">
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="bg-primary md:px-6 p-2 md:py-4 text-md font-medium  bg-gray-200 w-full focus:outline-none flex-1 rounded-lg"
                      placeholder="Add comment.."
                  />
              <button className="bg-slate-500 p-1 text-sm md:py-2 md:px-4 rounded-md md:text-md border-none" onClick={() => handleUpdate(com)}>
                Save
              </button>
                  </div>
                ) : (<p className="ml-16 text-sm md:text-[16px] md:mr-8">{com?.comment}</p>)}
                <div className="flex flex-col gap-4">
                  <div onClick={() => likePost(com)} className={`flex items-center justify-center rounded-full ${_id ? 'hover:bg-gray-300 duration-300 cursor-pointer' : ''}  p-1  gap-1 text-sm`} >
                    {com?.lovedUsers?.includes(_id) ? (<AiFillLike size={18} />) : (<AiOutlineLike size={18} />)}
                    {com?.loveCount}
                  </div>
                  {_id && (
                    com?.user?._id === _id && (
                      activeEditComment && com?._id === editCommentId ? (
                        <div className="flex items-center justify-center rounded-full hover:bg-gray-300 duration-300 p-1 cursor-pointer" title="edit comment" onClick={() => handleCloseComment(com)}>
                          <AiOutlineClose size={18} />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center rounded-full hover:bg-gray-300 duration-300 p-1 cursor-pointer" title="edit comment" onClick={() => handleEditComment(com)}>
                          <AiOutlineEdit size={18} />
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 font-semibold">No comments yet, <br /> Be the first to do add a comment.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
