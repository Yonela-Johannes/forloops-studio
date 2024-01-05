import { useEffect, useState } from 'react'
import { Error, Loader, SongCard } from '../components'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { baseUrl } from '../constants/base_urls'
import AlbumCard from '../components/AlbumCard'

const Albums = () => {
  const [albums, setAlbums]  = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(baseUrl + 'album');
      setAlbums(result?.data)
    }
    fetchData()
  }, [])

  return (
  <div className='flex flex-col text-center'>
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Local Albums</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {albums.length ? albums?.map((album, i) => (
            <AlbumCard
                key={album?._id}
                album={album}
                data={albums}
                i={i}
            />
          )): (
            <Loader />
          )}
      </div>
  </div>
  )
}
export default Albums;
