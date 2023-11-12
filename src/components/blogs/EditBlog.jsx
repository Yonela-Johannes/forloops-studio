import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Dropzone from "react-dropzone";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import { FallingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../constants/base_urls";
import { useSelector } from "react-redux";
import React from 'react'
import Select from 'react-select'
import SunEditor, { buttonList } from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';

const EditBlog = () => {
  const { _id } = useSelector((state) => state.auth);
  const [blog, setBlog] = useState({});
  const params = useParams();
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const { id } = params;
  const [inputData, setInputData] = useState({
    userId: _id,
    title: '',
    category: '',
    image: '',
    post: '',
    subtitle: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(`${baseUrl}category`);
      setCategories(response?.data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(`${baseUrl}blog/${id}`);
      setBlog(response?.data?.blog);
    };
    fetchBlog();
  }, []);

  useEffect(() => {
    setImageSrc(blog?.image);
  }, [blog]);

  useEffect(() => {
    const option = [];
    categories?.map((category) => (
      option.push({ label: category?.title, value: category?._id })));
    setOptions(option);
  }, [categories]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (inputData?.image === '') {
      setInputData({...inputData, image: blog?.image})
    }
    if (inputData?.image) {
      formData.append("file", inputData?.image);
      formData.append("upload_preset", "nomiupload");
      setLoading(true);
      const result = await axios
      .post(
        "https://api.cloudinary.com/v1_1/globalnomi/image/upload",
        formData
      )
      const response = await axios.patch(`${baseUrl}blog/update/${blog?._id}`,{
        ...inputData,
        image: result?.data?.url,
      });

      toast("Post updated")

      const res = await axios.get(`${baseUrl}blog/${id}`);
      setBlog(res?.data)
      setLoading(false);
      setImageSrc('')
      setInputData({});
      navigate(`/blogs/${blog?._id}`);
    } else {
      toast("Select Image")
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
          <Select
            placeholder={blog?.category?.title}
            onChange={(e) => setInputData({ ...inputData, category: e.value })}
            options={options}
            />
              <input
                  type='text'
                  placeholder={blog?.title}
                  onChange={(e) =>
                    setInputData({ ...inputData, title: e.target.value })
                  }
                  className='rounded w-full outline-none text-md  p-2'
                />
                <textarea
                  type='text'
                  placeholder={blog?.subtitle}
                  onChange={(e) =>
                    setInputData({ ...inputData, subtitle: e.target.value })
                  }
                  className='rounded w-full outline-none text-md  p-2'
                />
                  <SunEditor
                    height="400"
                    defaultValue={blog?.post}
                    setContents={blog?.post}
                    placeholder="Please type here..."
                    onChange={(content) => setInputData({...inputData, post: content})}
                  />
                <div className="cursor-pointer text-white">
                    <Dropzone
                      multiple={false}
                      onDrop={(acceptedFiles) => acceptedFiles.map((file) => {
                          const { type } = file;
                          if (
                            type === "image/png" ||
                            type === "image/webp" ||
                            type === "image/vector" ||
                            type === "image/jpeg"
                          ) {
                            setInputData({ ...inputData, image: file });
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
                <button className="rounded-md w-full border border-cl p-4 hover:bg-cl duration-300 cursor-pointer hover:text-white" onClick={handleUpdate}>Update</button>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBlog;
