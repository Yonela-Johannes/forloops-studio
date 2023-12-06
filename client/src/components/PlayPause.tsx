
import  {FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({isPlaying, activeSong, song, handlePause, handlePlay }) => (isPlaying && activeSong?.title === song?.title ? (
  <FaPauseCircle
    size={25}
    onClick={handlePause}
  />
): (
  <FaPlayCircle
    size={25}
    onClick={handlePlay}
  />
))

export default PlayPause;
