import React, { useEffect, useState } from 'react'
import BookCards from '../shared/BookCards';
import { baseUrl } from '../../constants/base_urls';

const BestSeller = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch(`${baseUrl}album`).then(res => res.json()).then(data => setAlbums(data.slice(0, 8)))
    }, [])

    return (
        <>
            <BookCards albums={albums} headline={"Featured Albums"} />
        </>
    )
}

export default BestSeller
