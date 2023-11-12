import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../constants/base_urls';

const PromoBanner = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
      fetch(`${baseUrl}album`).then(res => res.json()).then(data => setAlbums(data.slice(0)))
  }, [])

  return (
    <div className='mt-16 py-12 bg-red px-4 lg:px-24'>
        <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-12'>
            {/* picture */}
            <div>
                <img src={albums[0]?.cover} alt="" className='w-96' />
            </div>
            <div className='md:w-1/2'>
                <h2 className='text-4xl font-bold mb-6 leading-snug'>New and Out!<br /> NdimiDyani - IIndlela ezinzima nangoku</h2>
                <button className='bg-background text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300 '>Explore Now</button>
            </div>
        </div>
    </div>
  )
}

export default PromoBanner
