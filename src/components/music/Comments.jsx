import React, { useState, useEffect } from "react";
import { baseUrl } from "../../constants/base_urls";
import { GoVerified } from "react-icons/go";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Comments = ({
  storyId,
  userId,
  setCommentsCount,
}) => {
  const { _id, email, admin } = useSelector(
    (state) => state.auth
  );
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if (storyId) {
      const fetchComments = async () => {
        try {
          const response = await fetch(
            `${baseUrl}story-comment/all-comments/${storyId}`
          );
          if (response.ok) {
            const data = await response.json();
            setData(data);
          } else {
            console.error(`Error: ${response.status}`);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchComments();
      setCommentsCount(data?.length);
    }
  }, [storyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!_id) return toast("Please login to comment");
    if (!comment) return toast("Required comment field");
    if (comment.length < 10)
      return toast("Comment should have a minimum of 10 characters");
    setLoading(true);
    const response = await axios.post(`${baseUrl}story-comment`, {
      storyId,
      userId: _id,
      comment,
    });
    if (response?.data?.status === "success") {
      setLoading(false);
      setComment("");
      return toast("Your comment has been added");
    } else {
      setLoading(false);
      setComment("");
      return toast("Comment add failed");
    }
  };

  return (
    <div className="pt-4 px-10 mt-4 lg:pb-0">
      <Toaster />
      {email && (
        <div className="pb-2 px-2 overflow-hidden">
          <div className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-primary px-6 py-4 text-md font-medium w-[250px] md:w-[700px] lg:w-[350px] focus:outline-none flex-1 rounded-lg"
              placeholder="Add comment.."
            />
            <button className="text-md border-none" onClick={handleSubmit}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </div>
        </div>
      )}
      <div className="pt-4 overflow-y-scroll lg:h-[360px]">
        {data?.length > 0 ? (
          data?.map((item, idx) => (
            <div className="p-2 items-center" key={idx}>
              <div>
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14">
                    <img
                      className="w-12 h-12 object-center object-cover rounded-full cursor-pointer"
                      src={item?.user?.picture}
                      alt="user-profile"
                      layout="responsive"
                    />
                  </div>
                  <p className={`flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary`}>
                    {item?.user?.given_name}{" "}{item?.user?.family_name}
                    {item?.user?.isAdmin &&(
                      <GoVerified />
                    )}
                  </p>
                </div>
              </div>
              <div>
                <p className="-mt-5 ml-16 text-[16px] mr-8">{item?.comment}</p>
              </div>
            </div>
          ))
        ) : (
          "No Comments Yet! Be First to do add the comment."
        )}
      </div>
    </div>
  );
};

export default Comments;
