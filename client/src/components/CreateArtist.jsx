import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdCloudUpload } from "react-icons/md";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/base_urls";
import { getUser } from "../redux/features/auth/authSlice";

const CreateArtist = () => {
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();
  const { _id, artist } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    name: '',
    userId: '',
    picture: '',
    quote: '',

  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.name) return toast("Name is required");
    if (!inputData.picture) return toast("Image is required");
    if (inputData.name.length < 3)
      return toast("Name should have a minimum of 4 characters");
    if (!_id)
      return toast("Something went wrong: user details missing!");
      setLoading(true);
    const formData = new FormData();
    if (inputData?.picture) {
      formData.append("file", inputData?.picture);
      formData.append("upload_preset", "nomiupload");
      const response = await axios.post("https://api.cloudinary.com/v1_1/globalnomi/image/upload", formData);
      if(response?.data.url){
        toast("Image upload successful");
        await axios.post(`${baseUrl}user/create-artist`, { ...inputData, userId: _id, picture: response?.data.url });
        dispatch(getUser(_id))
      }else{
        toast("Something went wrong!")
      }
      toast("Your artist account created successful");
      setLoading(false);
    } else {
      toast("Something went wrong!")
      setLoading(false);
    }
    setLoading(false);
    setImageSrc(null);
    setInputData({});
    navigate(`/artists/${artist?._id}`);
  }

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
              placeholder="name"
              value={inputData.name}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })}
              className='rounded w-full outline-none text-md  p-2'
            />
          </div>
          <div className='flex flex-col gap-3 pb-10'>
            <textarea
              type='text'
              placeholder="Enter quote"
              value={inputData.quote}
              onChange={(e) =>
                setInputData({ ...inputData, quote: e.target.value })}
              className='rounded w-full outline-none text-md  p-2'
            />
          </div>
            <div className="cursor-pointer text-white">
              <Dropzone
                acceptedFiles=".webp,.png,.vector"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  acceptedFiles.map((file, index) => {
                    const { type } = file;
                    if (
                      type === "image/webp" ||
                      type === "image/png" ||
                      type === "image/vector"
                    ) {
                      setInputData({ ...inputData, picture: file });
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setImageSrc(reader.result);
                      };
                    }
                  })
                }
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div {...getRootProps()} className="p-[1rem]">
                    <input name="banner" {...getInputProps()} />
                    {isDragActive ? (
                      <div className="flex flex-col text-center items-center justify-center">
                        <p className="text-center text-[13px] text-primary">
                          <MdCloudUpload size={22} />{" "}
                        </p>
                        <p className="text-center text-[13px]"> Drop here!</p>
                      </div>
                    ) : imageSrc === null ? (
                      <div className="flex flex-col text-center items-center justify-center">
                        <p className="text-center text-[13px] text-primary">
                          <MdCloudUpload size={22} />
                        </p>
                        <p className="text-center text-[13px]">
                          Drag and Drop here or click to choose
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <div>
                          <img
                            className="h-[200px] w-[200px] object-cover rounded-md"
                            src={imageSrc}
                            alt=""
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <button className="text-white border  w-full p-2 rounded-md cursor-pointerxxz" onClick={handleSubmit}>Create</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateArtist;
