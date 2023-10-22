import { useEffect } from 'react';
import { MdAdd } from "react-icons/md"
import CreateSong from "./CreateStory"
import { useState } from "react"
import CreateAlbum from "./CreateAlbum"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

const SongPopup = () => {
  const { isAdmin } = useSelector((state) => state.auth)
  const [albumPopup, setAlbumPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      setAlbumPopup(false);
    }
  }, []);

  return (
      <div className="relative flex flex-col m-auto my-2 md:my-10 items-center justify-center bg-bg_alt pt-10 pb-4 w-[320px] md:w-[1000px] self-center rounded-lg md:px-10 md:p-20">
        <div onClick={() => setAlbumPopup(!albumPopup)} className="absolute top-0 right-5 cursor-pointer flex items-center gap-2 justify-center">
          <MdAdd siz={22} />
          {albumPopup ? (<p>Upload song</p>) : (<p>Create album</p>)}
        </div>
        <div className="flex flex-col items-center w-[300px] md:w-full">
          <p className='text-center font-bold text-3xl pb-4'>Customize your {albumPopup ? 'album' : 'new song'}</p>
          <p className="text-center text-lighter   text-md">Customize your {albumPopup ? "album's" : "song's"} unique personality and message.<br /> And remember, you can always update it as your {albumPopup ? 'album' : 'song'} as time goes
          </p>
        </div>
        <div className="md:w-[550px]">
          {albumPopup ? (<CreateAlbum setAlbumPopup={setAlbumPopup} />) : (<CreateSong />)}
        </div>
      </div>
  )
}

export default SongPopup
