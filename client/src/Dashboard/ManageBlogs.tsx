import { GridColDef } from "@mui/x-data-grid";
import DataTable from "./components/dataTable/BlogsTable";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import axios from "axios";
import { baseUrl } from "../constants/base_urls";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(`${baseUrl}blog`);
      setBlogs(response?.data)
    }

    fetchBlogs()
  }, []);

  const columns: GridColDef[] = [
    {
      field: "loveCount",
      type: "string",
      headerName: "Likes",
      width: 150,
    },
    {
      field: "viewCount",
      type: "string",
      headerName: "Views",
      width: 150,
    },
  ];

  return (
    <div className="flex gap-6">
      <SideBar />
      <div className="relative  z-40 flex flex-col px-4 lg:p-[80px] items-center justify-start gap-8 bg-white w-full pb-20 lg:pt-10 text-text">
        <h1 className="text-cl text-2xl">Manage Blogs</h1>
          <div className="flex flex-col gap-20 items-start w-full ">
            {blogs?.length > 0 && (<DataTable slug="admin" columns={columns} rows={blogs} />)}
          </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
