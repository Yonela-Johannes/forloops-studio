import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../constants/base_urls";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const User = () => {
  const {_id, isAdmin } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    given_name: '',
    family_name: '',
    nick: '',
    title: '',
    quote: '',
    role: '',
  });

  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [user, setUser] = useState('');

  useEffect(() => {
    if (id && _id) {
      const fetchUser = async () => {
        const response = await axios.get(`${baseUrl}user/user/${id}`);
        setUser(response?.data?.user);
      };
      fetchUser();
    } else {
      navigate('/signin');
    }
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    if (userData.given_name?.trim() > 10) return toast("Your byname must be less than 11 characers")
    if (userData.given_name?.trim() > 11) return toast("Your name must be greater than 5 charaters and less than 12 characters")
    if (userData.family_name?.trim() > 11) return toast("Your last name must be greater than 5 charaters and less than 12 characters")
    if (userData.title?.trim() > 19) return toast("Your byname must be less than 20 characers");

    await axios.patch(`${baseUrl}user/update/${_id}`, { ...userData });

    setUserData({
      given_name: '',
      family_name: '',
      nick: '',
      title: '',
      quote: '',
      role: '',
    });

    const fetchUser = async () => {
      const res = await axios.get(`${baseUrl}user/user/${_id}`);
      setUser(res?.data?.user);
    };
    fetchUser();
    toast("Profile updated")
  };

  return (
    <div className="flex">
      <Toaster />
      {isAdmin && (<SideBar />)}
      <div className="flex flex-col items-center p-2 md:p-4 w-[300px] md:w-[500px] bg-cl m-auto mt-10 rounded-lg">
        <div className="flex gap-2">
          <div className="flex mb-2 flex-col items-start justify-start gap-2">
            <img src={user?.picture} alt="" className=" w-26 h-26 object-cover rounded-full" />
          </div>
          <div className="flex-1">
            {user?.nick} {user?.given_name} {user?.family_name}
            <p className="text-gray-400"><i>{user?.quote}</i></p>
          </div>
        </div>
            <p className="text-gray-400 pt-2 pb-3">{user?.title} {isAdmin && `/${user?.role}`}</p>
        <div className="">
          <div className="flex flex-col gap-4">
            <div className="flex gap-8 items-center justify-between">
              <label className="hidden md:block">Nick Name</label>
              <input value={userData?.nick} onChange={(e) => setUserData({ ...userData, nick: e.target.value })} className="rounded-lg p-2 bg-background" type="text" name="nickname" placeholder={user?.nick ? user?.nick : 'Enter your byname'} />
            </div>
            <div className="flex gap-8 items-center justify-between">
              <label className="hidden md:block">Username</label>
              <input value={userData?.given_name} onChange={(e) => setUserData({ ...userData, given_name: e.target.value })} className="rounded-lg p-2 bg-background" type="text" name="name" placeholder={user?.given_name ? user?.given_name : 'Enter you name'} />
            </div>
            <div className="flex gap-8 items-center justify-between">
              <label className="hidden md:block">Last Name</label>
              <input value={userData?.family_name} onChange={(e) => setUserData({ ...userData, family_name: e.target.value })} className="rounded-lg p-2 bg-background" type="text" name="lastname" placeholder={user?.family_name ? user?.family_name : "Enter your last name"} />
            </div>
            <div className="flex gap-8 items-center justify-between">
              <label className="hidden md:block">Title</label>
              <input value={userData?.title} onChange={(e) => setUserData({ ...userData, title: e.target.value })} className="rounded-lg p-2 bg-background" type="text" name="title" placeholder={user?.title ? user?.title : 'Enter title'} />
            </div>
            {isAdmin && (
              <div className="flex gap-8 items-center justify-between">
                <label className="hidden md:block">Role</label>
                <input value={userData?.role} onChange={(e) => setUserData({ ...userData, role: e.target.value })} className="rounded-lg p-2 bg-background" type="text" name="role" placeholder={user?.role ? user?.role : 'Enter role'} />
              </div>
            )}
            <div className="flex gap-8 items-center justify-between">
              <label className="hidden md:block">Favourite quote</label>
              <textarea onChange={(e) => setUserData({ ...userData, quote: e.target.value })} value={userData?.quote} rows={4} className="rounded-lg p-2 bg-background" type="text" name="quote" placeholder={user?.quote ? user?.quote : 'Enter your favourite quote'} />
            </div>
            <button onClick={updateUser}  className="bg-black p-2 rounded-lg cursor-pointer hover:bg-background duration-300">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
