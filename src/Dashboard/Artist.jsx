import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../constants/base_urls";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Artist = () => {
  const { _id, isAdmin } = useSelector((state) => state.auth);
  const [artistData, setArtistData] = useState({
    name: '',
    title: '',
    quote: '',
    location: '',
  });

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [artist, setArtist] = useState('');

  useEffect(() => {
    if (id && _id) {
      const fetchUser = async () => {
        const response = await axios.get(`${baseUrl}artists/${id}`);
        setArtist(response?.data?.artist);
      };
      fetchUser();
    } else {
      const fetchUser = async () => {
        const response = await axios.get(`${baseUrl}artists/${id}`);
        setArtist(response?.data?.artist);
      };
      fetchUser();
    }
  }, [id]);

  const updateArtist = async (e) => {
    e.preventDefault();
    if (artistData.name?.trim() > 10) return toast("Your artist name must be less than 10 characers")
    if (artistData.title?.trim() > 12) return toast("Your title must be greater than 5 charaters and less than 12 characters")
    if (artistData.quote?.trim() > 30) return toast("Your quote must be less than 30 characers");

    await axios.patch(`${baseUrl}artists/update/${artist?._id}`, { ...artistData });

    setArtistData({
      name: '',
      title: '',
      quote: '',
      location: '',
    });

    const fetchUser = async () => {
      const res = await axios.get(`${baseUrl}artists/${artist?._id}`);
      setArtist(res?.data?.artist);
    };
    fetchUser();
    toast("Artist profile updated");
  };

  return (
    <div className="flex">
      <Toaster />
      {isAdmin && (<SideBar />)}
      <div className="flex flex-col items-center p-2 md:p-4 w-[300px] md:w-[800px] bg-cl m-auto mt-10 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="flex mb-2 flex-col items-start justify-start gap-2">
            <img src={artist?.picture} alt="" className="object-cover rounded-md" />
          </div>
          <div onClick={() => navigate(`/user/${artist?.user?._id}`)} className="flex mb-2 items-start justify-start gap-2 cursor-pointer">
            <img src={artist?.user?.picture} alt="" className="w-16 h-16 object-cover rounded-full" />
            <div>
              {artist?.user?.name} {artist?.user?.title}
              <p className="text-gray-400"><i>{artist?.quote}</i></p>
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div>
              {artist?.name}
              <p className="text-gray-400"><i>{artist?.quote}</i></p>
            </div>
            <div>
              <p className="text-gray-400 pt-2 pb-3">{artist?.title}</p>
              <p className="text-gray-400"><i>{artist?.location}</i></p>
            </div>
          </div>
        </div>

        {_id === id ? (
          <div className="">
            <div className="flex flex-col gap-4">
              <div className="flex gap-8 justify-between">
                <label className="hidden md:block">Stage name</label>
                <input value={artistData?.name} onChange={(e) => setArtistData({ ...artistData, name: e.target.value })} className="rounded-lg p-2 bg-background" type="text" name="namename" placeholder={artist?.name ? artist?.name : 'Enter your byname'} />
              </div>
              <div className="flex gap-8 justify-between">
                <label className="hidden md:block">Title</label>
                <input value={artistData?.title} onChange={(e) => setArtistData({ ...artistData, title: e.target.value })} className="rounded-lg p-2 bg-background" type="text" name="title" placeholder={artist?.title ? artist?.title : 'Enter title'} />
              </div>
              <div className="flex gap-8 justify-between">
                <label className="hidden md:block">Location</label>
                <input value={artistData?.location} onChange={(e) => setArtistData({ ...artistData, location: e.target.value })} className="rounded-lg p-2 bg-background" type="text" name="town" placeholder={artist?.location ? artist?.location : 'Enter your town'} />
              </div>
              <div className="flex gap-8 justify-between">
                <div className="">
                  <label className="hidden md:block">Favourite quote</label>
                  <p className={`text-sm ${artistData?.quote?.trim()?.length > 30 ? 'text-red' : 'text-gray-400'}`}><i>{artistData?.quote?.trim()?.length}</i></p>
                </div>
                <textarea onChange={(e) => setArtistData({ ...artistData, quote: e.target.value })} value={artistData?.quote} rows={4} className="rounded-lg p-2 bg-background" type="text" name="quote" placeholder={artist?.quote ? artist?.quote : 'Enter your favourite quote'} />
              </div>
              <button onClick={updateArtist}  className="bg-black p-2 rounded-lg cursor-pointer hover:bg-background duration-300">Save</button>
            </div>
          </div>
        ) : (
          ""
        )}

      </div>
    </div>
  );
};

export default Artist;
