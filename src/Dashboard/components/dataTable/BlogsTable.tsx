import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const DataTable = ( rows ) => {
  const navigate = useNavigate();

  const imageColumn: GridColDef = {
    field: "image",
    headerName: "Image",
    width: 200,
    renderCell: (params) => {
      console.log(params)
      return (
        <img src={params?.row?.image}  className="w-16 h-16 object-cover rounded-lg" />
      );
    },
  };

  const titleColumn: GridColDef = {
    field: "title",
    headerName: "Title",
    width: 200,
    renderCell: (params) => {
      console.log(params)
      return (
        <p className="">{params?.row?.title?.slice(0, 20) + "..."}</p>
      );
    },
  };

  const subtitleColumn: GridColDef = {
    field: "subtitle",
    headerName: "Description",
    width: 250,
    renderCell: (params) => {
      console.log(params)
      return (
        <p className="">{params?.row?.subtitle?.slice(0, 50) + "..."}</p>
      );
    },
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex items-center gap-4 cursor-pointer">
          <div onClick={() => navigate(`/admin/dashboard/blog/${params?.id}`)}>
            <AiOutlineEdit size={16} />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="flex flex-col gap-8 w-full h-[400px]">
      <div className="flex items-center justify-between w-full">
        <h1 className='text-[20px] text-cl'>Blogs</h1>
      </div>
      <DataGrid
        className="w-full"
        rows={rows?.rows}
        getRowId={(row) => row?._id}
        columns={[imageColumn, titleColumn, subtitleColumn, ...rows?.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[1]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
