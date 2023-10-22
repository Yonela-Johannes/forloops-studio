import { Link } from "react-router-dom";

const ArtistDetailsHeader = ({ artist }) => {

  return(
  <div className="relative w-full flex flex-col">
    <div className="flex w-full md:bg-gradient-to-l from-transparent to-black rounded-lg p-6">
      <img
        alt="art"
        src={artist?.picture}
      className="sm:w-80 sm:h-80 w-[140px] h-[140px] rounded-lg md:ml-2 object-cover"
      />
      <div className="ml-5 text-white">
          <p className="font-bold sm:text-[20px] text-xl">{artist?.name}</p>
            <Link to={`/artists/${artist?.artists}`}>
              <p className="text-base mt-2">
                {artist?.name}
              </p>
            </Link>
          <p className="text-base mt-2 text-white">
              {artist?.quote}
          </p>
      </div>
    </div>
  </div>
)};

export default ArtistDetailsHeader;
