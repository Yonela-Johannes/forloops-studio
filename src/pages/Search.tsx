import { useState, useEffect } from "react";
import { ArtistCard, Error, Loader, SongCard } from '../components'
import { useParams } from 'react-router-dom';
import {  useGetSongsSearchQuery  } from '../redux/services/shazam'
import { useSelector } from 'react-redux'
import axios from "axios";
import { baseUrl } from "../constants/base_urls";
import AlbumCard from "../components/AlbumCard";

const Search = () => {
  const  { searchTerm }  = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(baseUrl + `songs/search/${searchTerm}`)
      setSongs(result?.data)};
    fetchData()
  }, [searchTerm])

    return (
        <div className='flex flex-col text-center'>
            <div className='w-full flex justify-between px-4 items-center sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='text-base md:text-xl text-white'>You are looking for, {searchTerm}</h2>
            </div>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8 md:px-10">
                {songs?.map((song, i) => (
                  <>
                    {song?.quote && (<ArtistCard key={song?._id} artist={song} />)}
                    {song?.description && (<AlbumCard key={song?._id} album={song}  />)}
                    {song?.lyrics && (<SongCard key={song?._id} song={song} activeSong={activeSong} isPlaying={isPlaying} data={songs} i={i}/>)}
                  </>
                ))}
            </div>
        </div>
    )
}
export default Search;
