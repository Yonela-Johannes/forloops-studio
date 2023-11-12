import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/dataTable/ArtistTable";
import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import axios from "axios";
import { baseUrl } from "../../constants/base_urls";

const Artists = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await axios.get(`${baseUrl}artists`);
      setArtists(response?.data)
    }

    fetchArtists()
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      type: "string",
      headerName: "Name",
      width: 150,
    },
    {
      field: "loveCount",
      type: "string",
      headerName: "Likes",
      width: 150,
    },
    {
      field: "location",
      type: "string",
      headerName: "Location",
      width: 150,
    },
    {
      field: "viewCount",
      type: "string",
      headerName: "Views",
      width: 150,
    },
  ];

  const clientColumns: GridColDef[] = [
    {
      field: "picture",
      type: "string",
      headerName: "Avatar",
      width: 150,
    },
    {
      field: "given_name",
      type: "string",
      headerName: "Name",
      width: 150,
    },
    {
      field: "family_name",
      type: "string",
      headerName: "Last Name",
      width: 150,
    },
    {
      field: "title",
      type: "string",
      headerName: "Title",
      width: 150,
    },
    {
      field: "email",
      type: "string",
      headerName: "Email",
      width: 200,
    }
  ];
  return (
    <div className="flex gap-6">
      <SideBar />
      <div className="relative  z-40 flex flex-col px-4 lg:p-[80px] items-center justify-start gap-8 bg-white w-full pb-20 lg:pt-10 text-text">
        <h1 className="text-cl text-2xl">Manage Artists</h1>
          <div className="flex flex-col gap-20 items-start w-full">
            {artists?.length > 0 && (<DataTable slug="admin" columns={columns} rows={artists} />)}
          </div>
      </div>
    </div>
  );
};

export default Artists;
