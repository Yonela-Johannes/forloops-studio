// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../constants/base_urls';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// banner card styles
import './bannerCard.css'

// import required modules
import { EffectCards } from 'swiper/modules';

function BannerCard() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await axios.get(`${baseUrl}artists`);
      setArtists(response?.data);
    };
    fetchArtists();
  }, []);

  return (
    <div className='banner-card'>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
      {artists?.map((artist) => (
        <SwiperSlide><img src={artist?.picture} className='rounded-md' alt="slide" /></SwiperSlide>
      ))}
      </Swiper>
    </div>
  )
}

export default BannerCard
