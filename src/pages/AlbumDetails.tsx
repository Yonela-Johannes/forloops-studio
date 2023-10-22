import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
import { baseUrl } from '../constants/base_urls';
import AlbumDetailsScreen from '../components/AlbumDetailsScreen';
import { SongBar } from '../components';
import { playPause, setActiveSong } from '../redux/features/playerSlice'

const AlbumDetails = () => {
    const dispatch = useDispatch()
    const { albumid } = useParams()
    const [album, setAlbum] = useState([]);
    const [songs, setSongs] = useState([])
    const data = []
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(baseUrl + 'album/' + albumid);
        setAlbum(result?.data)
      }
      fetchData()
    }, [])

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(baseUrl + 'album/songs/' + albumid);
        setSongs(result?.data)
      }
      fetchData()
    }, [album])

    const handlePauseClick = async () => {
      dispatch(playPause(false))
      await axios.patch(baseUrl + 'songs/play/' + song?._id);
      const result = await axios.get(baseUrl + 'album/songs/' + albumid);
      setSongs(result?.data)
    }

    const handlePlayClick = async (song, i) => {
      dispatch(setActiveSong({ song, data, i}))
      dispatch(playPause(true))
      await axios.patch(baseUrl + 'songs/play/' + song?._id);
      const result = await axios.get(baseUrl + 'album/songs/' + albumid);
      setSongs(result?.data)
    }

    return(
      <div className="flex gap-3 md:gap-0 flex-col w-full rounded-lg">
        <div className="flex-1">
          <AlbumDetailsScreen album={album} />
        </div>
        <div className="md:w-[700px] md:pl-4 rounded-r-xl">
            {songs?.map((song, i) => (
              <SongBar
                song={song}
                key={song?._id}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
                albumid={albumid}
                setSongs={setSongs}
              />
            ))}
          </div>
        </div>
    )
};

export default AlbumDetails;
