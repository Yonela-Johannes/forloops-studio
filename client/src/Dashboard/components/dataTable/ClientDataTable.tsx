import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

const ClientDataTable = (rows) => {

  const imageColumn: GridColDef = {
    field: "picture",
    headerName: "Avatar",
    width: 80,
    renderCell: (params) => {
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
      return (
        <p>{params?.row?.quote?.length > 60 ? params?.row?.quote?.slice(0, 60) + '...' : params?.row?.quote} </p>
      );
    },
  };

  return (
    <div className="flex flex-col gap-8 w-full pt-2  h-[600px]">
      <div className="flex items-center justify-between w-full">
        <h1 className='text-[20px] text-cl'>Users</h1>
      </div>
      <DataGrid
        className="w-full"
        rows={rows?.rows}
        getRowId={(row) => row?._id}
        columns={[imageColumn, ...rows?.columns, quoteColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
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

export default ClientDataTable;
