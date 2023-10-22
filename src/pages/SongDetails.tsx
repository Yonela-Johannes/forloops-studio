import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'
import { DetailsHeader, Loader } from "../components";
import axios from 'axios';
import { baseUrl } from '../constants/base_urls';

const SongDetails = () => {
    const { songid } = useParams()
    const [song, setSong] = useState('')

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(baseUrl + 'songs/' + songid);
        setSong(result?.data)
      }
      fetchData()
    }, [])

    return(
      <div className="flex flex-col">
        <DetailsHeader song={song} />
        <div className="mb-10">
          <h2 className="text-gray-300 mt-2 text-[22px] font-bold">Lyrics:</h2>
          <p className="mt-5 px-20">{song?.lyrics}</p>
        </div>
      </div>
    )
};

export default SongDetails;
