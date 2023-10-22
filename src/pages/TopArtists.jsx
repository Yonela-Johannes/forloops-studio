import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../constants/base_urls';
import { ArtistCard, Error, Loader } from '../components';

const TopArtists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await axios.get(`${baseUrl}artists`);
      setArtists(response?.data);
    };
    fetchArtists();
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover artists</h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artists?.map((artist) => <ArtistCard key={artist.key} artist={artist} />)}
      </div>
    </div>
  );
};

export default TopArtists;
