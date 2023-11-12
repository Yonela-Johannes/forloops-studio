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

const CreateCategory = ({setCategoryPopup}) => {
  const { _id } = useSelector((state) => state.auth);
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    userId: _id,
    title: '',
    image: '',
    preImage: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputData.title) return toast("Title is required");
    if (inputData.title.length > 15) return toast("Title too long!");

    const formData = new FormData();
    if (inputData?.preImage) {
      formData.append("file", inputData?.preImage);
      formData.append("upload_preset", "nomiupload");
      setLoading(true);
      const result = await axios
      .post(
        "https://api.cloudinary.com/v1_1/globalnomi/image/upload",
        formData
      )

      toast("Image upload successful")
      setLoading(false);

      await axios.post(baseUrl + 'category',{
        title: inputData?.title,
        image: result?.data?.url,
        userId: _id,
      });
      await axios.get(`${baseUrl}category`);

      toast("Category added successful")
      setLoading(false);
      setImageSrc('')
      setInputData({});
      setCategoryPopup(false);
    }
    toast("Image is requiresd!")
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
          </div>
          <div className="cursor-pointer text-white">
              <Dropzone
                multiple={false}
                onDrop={(acceptedFiles) => acceptedFiles.map((file) => {
                    const { type } = file;
                    console.log(type)
                    if (
                      type === "image/png" ||
                      type === "image/webp" ||
                      type === "image/vector" ||
                      type === "image/jpeg"
                    ) {
                      setInputData({ ...inputData, preImage: file });
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setImageSrc(reader.result);
                      };
                    }else{
                      toast("Invalid image format. Choose another image instead.")
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

            <button className="rounded-md w-full border border-cl p-4 hover:bg-cl duration-300 cursor-pointer hover:text-white" onClick={handleSubmit}>Upload song</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCategory;
