import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

import {FaCartShopping} from "react-icons/fa6"
import { Link } from 'react-router-dom';

const BookCards = ({headline, albums}) => {
  console.log(albums)
    return (
        <div className='my-16 px-4 lg:px-24'>
            <h2 className='text-5xl my-5 font-bold text-center'>{headline}</h2>

            {/* cards */}
            <div className='mt-20'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className=" w-full h-full"
                >
                    {
                        albums.map(al => <SwiperSlide className='text-center flex items-center justify-center' key={al._id}>
                            <Link to={`/album/${al._id}`} className='cursor-pointer'>
                                <div className='bg-gray-100 p-8 rounded-lg relative'>
                                    <img src={al.cover} alt="" className='w-full' />
                                    <div className='absolute top-3 right-3 bg-red hover:bg-black p-2 rounded '>
                                        <FaCartShopping className='w-4 h-4 text-white'/>
                                    </div>
                                </div>

                                <div className='mt-5 mb-8 text-left space-y-2 flex justify-between items-start'>
                                    <div>
                                        <h3 className='text-white font-semibold'>{al?.title}</h3>
                                        <p>{al?.artist?.name}</p>
                                    </div>
                                    <div>
                                        <p className='font-bold text-red'>Free</p>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>)
                    }

                </Swiper>
            </div>

        </div>
    )
}

export default BookCards
