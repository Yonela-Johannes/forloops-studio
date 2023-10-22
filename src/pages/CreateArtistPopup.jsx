import { useSelector } from 'react-redux';
import CreateArtist from '../components/CreateArtist';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CreateArtistPopup = () => {
  const { isAdmin } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, []);
  return (
      <div className="flex flex-col m-auto my-2 md:my-10 items-center justify-center bg-bg_alt pt-10 pb-4 w-[320px] md:w-[1000px] self-center rounded-lg md:px-10 md:p-20">
        <div className="flex flex-col items-center w-[300px] md:w-full">
          <p className='text-center font-bold text-3xl pb-4'>Create your artist accoumt</p>
          <p className="text-center text-lighter   text-md">Customize your artist's unique personality.
          </p>
        </div>
        <div>
          <CreateArtist />
        </div>
      </div>
  )
}

export default CreateArtistPopup
