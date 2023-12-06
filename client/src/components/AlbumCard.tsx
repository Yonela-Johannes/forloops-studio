import { Link } from "react-router-dom";

const AlbumCard = ({album}) => {

  return (
    <Link to={`/album/${album?._id}`} className={`flex flex-col w-[240px] backdrop-blur-sm animate-slideup cursor-pointer text-center rounded-sm border border-cl duration-300`}>
      <div className="relative w-full h-[200px] group align-center justify-center flex">
      <img src={album?.cover} className='rounded-t-sm w-full' />
      </div>
        <div>
            <p className="text-[14px] text-white font-semibold truncate">{album?.artists}</p>
            <p className="text-[12px] text-white truncate">{album?.title}</p>
        </div>
      </Link>
  )
};

export default AlbumCard;
