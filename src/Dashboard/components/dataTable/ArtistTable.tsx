import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const DataTable = ( rows ) => {
  const navigate = useNavigate()

  const imageColumn: GridColDef = {
    field: "picture",
    headerName: "Avatar",
    width: 80,
    renderCell: (params) => {
      console.log(params)
      return (
        <img src={params?.row?.picture}  className="w-12 h-12 object-cover rounded-full" />
      );
    },
  };

  const quoteColumn: GridColDef = {
    field: "quote",
    headerName: "Quote",
    width: 200,
    renderCell: (params) => {
      console.log(params)
      return (
        <p>{params?.row?.quote?.length > 60 ? params?.row?.quote?.slice(0, 60) + '...' : params?.row?.quote} </p>
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
          <div onClick={() => navigate(`/admin/dashboard/artist/${params?.id}`)}>
            <AiOutlineEdit size={16} />
          </div>
        </div>
      );
    },
  };


  return (
    <div className="flex flex-col gap-8 w-full h-[400px]">
      <div className="flex items-center justify-between w-full">
        <h1 className='text-[20px] text-cl'>Artist</h1>
      </div>
      <DataGrid
        className="w-full"
        rows={rows?.rows}
        getRowId={(row) => row?._id}
        columns={[imageColumn, ...rows?.columns, quoteColumn, actionColumn]}
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
