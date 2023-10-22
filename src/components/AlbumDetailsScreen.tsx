import moment from "moment";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

const AlbumDetailsScreen = ({ album }) => {

  return(
  <div className="relative w-full flex flex-col">
    <div className="flex w-full md:bg-gradient-to-r from-transparent to-black rounded-xl p-2">
      <img
        alt="art"
        src={album?.cover}
      className="sm:w-[500px] md:h-[480px] w-[200px] h-[200px] sm:h-40 rounded-md object-cover"
      />
      <div className="ml-5 text-white">
          <p className="font-bold sm:text-[20px] text-xl">{album?.title}</p>
            <div>
              <p className="text-base mt-2">
                {album?.artist?.name}
              </p>
            </div>
            <p className="text-base mt-2">
              {moment(album?.date).fromNow()}
          </p>
          <p className="text-base mt-2">
              {album?.genre}
          </p>
          <p className="hidden md:block text-base mt-2 max-w-[500px]">
              {album?.description}
          </p>
      </div>
    </div>
    <Helmet>
      <meta property="og:title" content={album?.title} />
      <meta property="og:description" content={album?.description} />
      <meta property="og:image" content={album?.cover} />
    </Helmet>
  </div>
)};

export default AlbumDetailsScreen;
