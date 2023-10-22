import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

const LikeButton = ({songId}) => {

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {

  }, []);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {

  }

  return (
    <button
      className="
        cursor-pointer
        hover:opacity-75
        transition
      "
      onClick={handleLike}
    >
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  );
}

export default LikeButton;
