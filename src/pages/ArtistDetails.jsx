import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader, RelatedSongs } from '../components';
import ArtistDetailsHeader from '../components/ArtistDetailsHeader';
import axios from 'axios';
import { baseUrl } from '../constants/base_urls';
import AlbumCard from '../components/AlbumCard';
import { useParams } from 'react-router-dom';

const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [artist, setArtist] = useState({});
  const [songs, setSongs] = useState([]);
  const [albums, setAlbum] = useState([]);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchArtist = async () => {
      const response = await axios.get(`${baseUrl}artists/${id}`);
      setArtist(response?.data?.artist);
    };
    fetchArtist();
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await axios.get(`${baseUrl}songs/artist-song/${id}`);
      setSongs(response?.data);
    };
    fetchSongs();
  }, []);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await axios.get(`${baseUrl}album/artist-albums/${id}`);
      setAlbum(response?.data);
    };
    fetchAlbums();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="justify-between">
        <ArtistDetailsHeader
          artistId={id}
          artist={artist}
        />
      </div>
      <div className="flex flex-col md:flew-row justify-between md:w-[1000px]">
      <div className='flex flex-col text-center'>
        <h2 className="font-bold text-xl text-white text-left mt-4 mb-10">{artist?.name}&rsquo;s Albums</h2>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {albums?.map((album, i) => (
            <AlbumCard
              key={album?._id}
              album={album}
              // activeSong={activeSong}
              // isPlaying={isPlaying}
              data={albums}
              i={i}
            />
          ))}
        </div>
        </div>
        <RelatedSongs
          artist={artist}
          data={songs}
          artistId={id}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
      </div>
    </div>
  );
};

export default ArtistDetails;
