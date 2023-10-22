import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Dropzone from "react-dropzone";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import { FallingLines } from "react-loader-spinner";
import { baseUrl } from "../../constants/base_urls";
import { useSelector } from "react-redux";

const CreateAlbum = ({ setAlbumPopup }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const { _id, artist } = useSelector((state) => state.auth);
  const [imageLink, setImageLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    userId: '',
    artistId: '',
    cover: '',
    title: '',
    date: '',
    artists: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputData.title) return toast('Album title is required');
    if (inputData.title.length < 3) return toast('Album title is too short!');

    const formData = new FormData();
    if (inputData?.cover) {
      formData.append('file', inputData?.cover);
      formData.append('upload_preset', 'nomiupload');
      setLoading(true);
      await axios
      .post(
        'https://api.cloudinary.com/v1_1/globalnomi/image/upload',
        formData
      )
      .then((res) => {
      toast('Cover Image upload successful');
      setLoading(false);
      setImageLink(res?.data.url);
    })
    .catch(error => {
        console.log(error);
        toast('Error creating post');
        setLoading(false);
      })

      formData.append('file', inputData?.album);
      formData.append('upload_preset', 'nomiupload');
      setLoading(true);
      await axios
      .post(
        'https://api.cloudinary.com/v1_1/globalnomi/image/upload',
        formData
      )
      .then((res) => {
      toast('Album upload successful');
      setLoading(false);
      setImageLink(res?.data.url);
    })
    .catch((error) => {
        console.log(error);
        toast('Error creating album');
        setLoading(false);
      });

      if(imageLink){
          await axios.post(baseUrl + 'album',{
            ...inputData,
            cover: imageLink,
            userId: _id,
            artistId: artist?._id,
          })
          .then((res) => {
            console.log(res)
            toast('Album successully saved');
            setAlbumPopup(false)
          })
          .catch(error => {
              console.log(error)
              toast('Error creating album')
              setLoading(false)
            })
          toast('New album created successful')
          setLoading(false);
          setImageSrc('')
          setImageLink('')
          setInputData({});
          setAlbumPopup(false)
      }else {
        toast('Something went wrong contact developer, @johannesyonela@gmail.com')
      }
    } else {
      toast("Cover missing!")
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
        <div className="text-black my-20 w-[300px] md:w-full rounded-md md:p-10">
          <div className="w-full">
          <div className='flex flex-col gap-3 pb-10'>
          <input
              type='text'
              placeholder="Enter title"
              value={inputData.title}
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
              className='rounded w-full outline-none text-md  p-2 bg-white'
            />

          <input
              placeholder="Release date"
              value={inputData.date}
              type="date"
              onChange={(e) =>
                setInputData({ ...inputData, date: e.target.value })
              }
              className='rounded w-full outline-none text-md  p-2 bg-white'
            />
          <textarea
            placeholder="Description"
            value={inputData.description}
            onChange={(e) =>
              setInputData({ ...inputData, description: e.target.value })
            }
            className='rounded w-full outline-none text-md  p-2 bg-white'
          />
          </div>
          <div className="cursor-pointer text-white">
              <Dropzone
                acceptedFiles=".png,.webp,.vector"
                multiple={false}
                onDrop={(acceptedFiles) => acceptedFiles.map((file) => {
                    const { type } = file;
                    console.log(type)
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
            <button className="rounded-xl w-full text-gray-400 border border-cl p-4 hover:bg-cl duration-300 cursor-pointer hover:text-white" onClick={handleSubmit}>Create album</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAlbum;
