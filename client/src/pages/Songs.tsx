import { useEffect, useState } from 'react'
import { Loader, SongCard } from '../components'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../constants/base_urls'
import TopPlay from '../components/TopPlay'

const Songs = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [songs, setSongs]  = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${baseUrl}songs`);
      setSongs(result?.data)
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-col items-center md:items-start md:flex-row gap-8">
      <div className='flex flex-grow flex-col text-center'>
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Songs</h2>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
              {songs?.length ? songs?.map((song, i) => (
                <SongCard
                    key={song?._id}
                    song={song}
                    activeSong={activeSong}
                    isPlaying={isPlaying}
                    data={songs}
                    i={i}
                />
              )): (
                <Loader title="Loading music" />
              )}
          </div>
      </div>
      <TopPlay />
    </div>
  )
}
export default Songs;
