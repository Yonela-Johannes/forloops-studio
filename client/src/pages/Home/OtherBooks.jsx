import React, { useEffect, useState } from 'react'
import BookCards from '../shared/BookCards';
import { baseUrl } from '../../constants/base_urls';

const OtherBooks = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}album`).then(res => res.json()).then(data => setAlbums(data.slice(0)))
    }, [])

    return (
        <div className='mt-24'>
            <BookCards albums={albums} headline={"Other Albums"} />
        </div>
    )
}

export default OtherBooks
