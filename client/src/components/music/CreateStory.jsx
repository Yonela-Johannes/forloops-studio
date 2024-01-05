import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Dropzone from "react-dropzone";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/base_urls";
import { useSelector } from "react-redux";
import React from 'react'
import Select from 'react-select'

const CreateSong = () => {
  const { _id } = useSelector((state) => state.auth);
  const [user, setUser] = useState()
  const [imageSrc, setImageSrc] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [songLink, setSongLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [options, setOptions] = useState([]);
  const [songSrc, setSongSrc] = useState(null);
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    userId: '',
    artistId: '',
    cover: '',
    title: '',
    album: '',
    artists: '',
    lyrics: '',
    song: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`${baseUrl}user/user/${_id}`);
      setUser(response?.data?.user);
    };
    fetchUser();
  }, [_id]);

  useEffect(() => {
    if (user?.artist?._id) {
      const fetchAlbums = async () => {
        const response = await axios.get(`${baseUrl}album/artist-albums/${user?.artist?._id}`);
        setAlbums(response?.data);
      };
      fetchAlbums();
    }
  }, [_id, user]);

  useEffect(() => {
    const option = [];
    albums?.map((album) => (
      option.push({ label: album?.title, value: album?._id })));
    setOptions(option);
  }, [albums]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!inputData.userId) return toast("Enter you identity code!");
    // if (!inputData.title.length < 13) return toast("Identity invalid");
    // if (!inputData.title) return toast("Song title is required");
    // if (!inputData.lyrics) return toast("Song lyrics is required");
    // if (!inputData.lyrics.length < 100) return toast("Song lyrics too short");

    const formData = new FormData();
    if (inputData?.cover && inputData?.song) {
      formData.append("file", inputData?.cover);
      formData.append("upload_preset", "nomiupload");
      setLoading(true);
      const imageResponse = await axios
      .post(
        "https://api.cloudinary.com/v1_1/globalnomi/image/upload",
        formData
      )

      formData.append("file", inputData?.song);
      formData.append("upload_preset", "nomiupload");
      setLoading(true);
      const res = await axios
      .post(
        "https://api.cloudinary.com/v1_1/globalnomi/video/upload",
        formData
      )

      if (!imageResponse || !imageResponse?.data?.url) {
        setLoading(false)
        return toast("Error uploading image");
      }
      if (!res || !res?.data?.url) {
        setLoading(false)
        return toast("Error uploading song");
      }

      if(imageResponse && res){
          const response = await axios.post(baseUrl + 'songs',{
            ...inputData,
            cover: imageResponse?.data?.url,
            song: res && res?.data?.url,
            userId: _id,
            artistId: user?.artist?._id
          })
          toast("Song successully saved");
          setLoading(false)
          const result = await axios.get(`${baseUrl}songs/${response?.data?._id}`);
          if(result){
            toast("New song upload successful")
            setLoading(false);
            setSongSrc(null)
            setImageSrc('')
            setImageLink('')
            setSongLink('')
            setInputData({});
            navigate(`/songs/${result?.data?._id}`);
          }else {
            toast("Error, we could not fetch song")
          }
      }else {
        toast("Something went wrong contact developer, @johannesyonela@gmail.com")
      }
    } else {
      toast("Song or cover missing!")
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      {loading ? (
        <FallingLines
          color="#5A2E98"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      ) : (
        <div className="text-black my-20 w-[300px] md:w-full md:p-10">
          <div>
          <div className='flex flex-col gap-3 pb-10'>
          <input
              type='text'
              placeholder="Enter title"
              value={inputData.title}
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
              className='rounded w-full outline-none text-md  p-2'
            />
          <Select
            placeholder="Select Album/EP"
            onChange={(e) => setInputData({ ...inputData, album: e.value })}
            options={options}
            />
          <input
              type='date'
              placeholder="Release date"
              value={inputData.date}
              onChange={(e) =>
                setInputData({ ...inputData, date: e.target.value })
              }
              className='rounded w-full outline-none text-md  p-2'
            />
            <textarea
              type='text'
              placeholder="Enter lyrics"
              value={inputData.lyrics}
              onChange={(e) =>
                setInputData({ ...inputData, lyrics: e.target.value })}
              className='rounded w-full outline-none text-md  p-2'
            />
          </div>
          <div className="cursor-pointer text-white">
              <Dropzone
                acceptedFiles=".mp3,.wav,.flac"
                multiple={false}
                onDrop={(acceptedFiles) => acceptedFiles.map((file) => {
                    const { type } = file;
                    if (
                      type === "image/png" ||
                      type === "image/webp" ||
                      type === "image/vector"
                    ) {
                      setInputData({ ...inputData, cover: file });
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setImageSrc(reader.result);
                      };
                    }
                  })}
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div {...getRootProps()} className="p-[1rem]">
                    <input name="banner" {...getInputProps()} />
                    {isDragActive ? (
                      <div className="flex flex-col text-center items-center justify-center">
                        <p className="text-center text-[13px] text-primary">
                          <MdCloudUpload size={22} />{" "}
                        </p>
                        <p className="text-center text-[13px]"> Drop cover here!</p>
                      </div>
                    ) : imageSrc === null ? (
                      <div className="flex flex-col text-center items-center justify-center">
                        <p className="text-center text-[13px] text-primary">
                          <MdCloudUpload size={22} />
                        </p>
                        <p className="text-center text-[13px]">
                          Drag and Drop cover here or click to choose
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <div>
                          <img
                            className="h-[200px] w-[200px] object-cover rounded-md"
                            src={imageSrc}
                            controls
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="cursor-pointer text-white">
              <Dropzone
                acceptedFiles=".mp3,.wav,.flac"
                multiple={false}
                onDrop={(acceptedFiles) => acceptedFiles.map((file) => {
                    const { type } = file;
                    if (
                      type === "audio/mpeg" ||
                      type === "audio/wav" ||
                      type === "audio/flac"
                    ) {
                      setInputData({ ...inputData, song: file });
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setSongSrc(reader.result);
                      };
                    }
                  })}
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div {...getRootProps()} className="p-[1rem]">
                    <input name="banner" {...getInputProps()} />
                    {isDragActive ? (
                      <div className="flex flex-col text-center items-center justify-center">
                        <p className="text-center text-[13px] text-primary">
                          <MdCloudUpload size={22} />{" "}
                        </p>
                        <p className="text-center text-[13px]"> Drop cover here!</p>
                      </div>
                    ) : songSrc === null ? (
                      <div className="flex flex-col text-center items-center justify-center">
                        <p className="text-center text-[13px] text-primary">
                          <MdCloudUpload size={22} />
                        </p>
                        <p className="text-center text-[13px]">
                          Drag and Drop song here or click to choose
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <div>
                          <audio
                            className=""
                            src={songSrc}
                            controls
                          >
                            <source src={songSrc} />
                          </audio>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <button className="rounded-md w-full border border-cl p-4 hover:bg-cl duration-300 cursor-pointer hover:text-white" onClick={handleSubmit}>Upload song</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateSong;
