import React, { useEffect, useRef, useState } from "react";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { GoVerified } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillEye,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { loveStory, viewStory } from "../../app/features/videos/videoSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdComment } from "react-icons/md";

const VideoCard = ({
  story: {
    caption,
    user,
    story,
    _id: storyId,
    lovedUsers,
    loveCount,
    viewCount,
    commentCount,
  },
}) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { _id: userId } = useSelector((state) => state.auth);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const handleLike = async () => {
    if (!userId) return toast("Sorry you have to sign in to like post");
    if (!storyId) return toast("Sorry you have to sign in to like post");
    dispatch(loveStory({ storyId, userId }));
  };

  const storyHandler = () => {
    dispatch(viewStory(storyId));
  };

  return (
    <div onClick={storyHandler} className="flex flex-col rounded-xl bg-bg_alt">
      <Toaster />
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <div>
              <div>
                <img
                  className="w-16 h-16 object-center object-cover rounded-full"
                  src={user?.picture}
                  alt="user-profile"
                  layout="responsive"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="flex gap-2 items-center md:text-md font-bold text-secondary">
                {user?.given_name}
                <GoVerified className="text-md" />
              </p>
              <p className="capitalize font-medium text-lighter hidden md:block">
                {user?.given_name} {user?.family_name}
              </p>
            </div>
            <div onClick={() => navigate(`/details/${storyId}`)}>
              <p className="mt-2 font-normal ">{caption}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <div className="relative" onClick={() => navigate(`/details/${storyId}`)}>
            <video
              loop
              muted
              ref={videoRef}
              src={story}
              className="lg:w-[600px] h-[300px] md:h-[400px] object-cover lg:h-[528px] w-[200px] rounded-2xl cursor-pointer"
            ></video>
          </div>
          <div className="absolute bottom-2   py-2 px-2">
            <div className="flex items-center text-base text-white p-1 rounded-b-md left-2 gap-2">
              <div className="flex gap-4">
                <div
                  onClick={handleLike}
                  className={`${
                    lovedUsers?.find((user) => user?._id === userId)
                      ? "text-red"
                      : ""
                  } flex text-[12px] gap-2 items-center hover:text-red duration-300 cursor-pointer`}
                >
                  {loveCount}
                  {lovedUsers?.find((user) => user?._id === userId) ? (
                    <div className="cursor-pointer border border-red rounded-full p-2 hover:bg-green duration-300 hover:text-white">
                      <AiFillHeart size={18} />
                    </div>
                  ) : (
                    <div className="cursor-pointer border border-lighter text-lighter rounded-full p-2 hover:bg-green duration-300 hover:text-white">
                      <AiOutlineHeart size={18} />
                    </div>
                  )}
                </div>
                <div className="flex text-[12px] gap-2 items-center">
                  {viewCount}
                  <div className="cursor-pointer border border-lighter text-lighter rounded-full p-2 hover:bg-green duration-300 hover:text-white">
                    <AiFillEye size={18} />
                  </div>
                </div>
                <div className="flex text-[12px] gap-2 items-center">
                  {commentCount}
                  <div className="cursor-pointer border border-lighter text-lighter rounded-full p-2 hover:bg-green duration-300 hover:text-white">
                    <MdComment size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* {isHover && ( */}
            <div className="absolute bottom-6 cursor-pointer flex gap-4 right-2 w-[100px]">
              {playing ? (
                <div onClick={onVideoPress} className="cursor-pointer text-white rounded-full p-2 bg-green duration-300 hover:text-white">
                  <BsFillPauseFill size={18}/>
                </div>
              ) : (
                <div onClick={onVideoPress} className="cursor-pointer text-white rounded-full p-2 bg-green duration-300 hover:text-white">
                  <BsFillPlayFill size={18}/>
                </div>
              )}
              {isVideoMuted ? (
                <div onClick={() => setIsVideoMuted(false)} className="cursor-pointer text-white rounded-full p-2 bg-green duration-300 hover:text-white">
                  <HiVolumeOff size={18}/>
                </div>
              ) : (
                <div onClick={() => setIsVideoMuted(true)} className="cursor-pointer text-white rounded-full p-2 bg-green duration-300 hover:text-white">
                  <HiVolumeUp size={18}/>
                </div>
              )}
            </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
