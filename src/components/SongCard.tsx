import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'

const SongCard = ({song, isPlaying, activeSong , i, data}) => {
  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i}))
    dispatch(playPause(true))
  }

  return (
    <div className={`flex flex-col w-[200px] backdrop-blur-sm animate-slideup cursor-pointer text-center rounded-xl border border-cl duration-300`}>
      <div className="relative w-full h-[160px] group align-center justify-center flex">
      <img src={song?.cover} className='rounded-t-xl' />
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex rounded-lg
          ${activeSong?.title === song?.title ? ' bg-opacity-70': 'hidden'}`}>
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
        </div>
      </div>
        <Link to={`/songs/${song._id}`}>
            <p className="text-[14px] text-white font-semibold truncate">{song?.artists}</p>
            <p className="text-[12px] text-white truncate">{song?.title}</p>
        </Link>
      </div>
  )
};

export default SongCard;
