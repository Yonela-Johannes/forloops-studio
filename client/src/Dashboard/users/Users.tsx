import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/dataTable/DataTable";
import { useEffect, useState } from "react";
import ClientDataTable from "../components/dataTable/ClientDataTable";
import SideBar from "../SideBar";
import axios from "axios";
import { baseUrl } from "../../constants/base_urls";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${baseUrl}user`);
      setUsers(response?.data?.users)
    }

    fetchUsers()
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${baseUrl}user/admins`);
      setAdmins(response?.data?.admins)
    }

    fetchUsers()
  }, []);

  const columns: GridColDef[] = [
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
      width: 200,
    },
    {
      field: "title",
      type: "string",
      headerName: "Title",
      width: 200,
    },
    {
      field: "role",
      type: "string",
      headerName: "Role",
      width: 200,
    },
    {
      field: "email",
      type: "string",
      headerName: "Email",
      width: 200,
    },
  ];

  const clientColumns: GridColDef[] = [
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
      width: 200,
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
        <h1 className="text-cl text-2xl">Manage Users</h1>
          <div className="flex flex-col gap-20 items-start w-full">
            {admins?.length > 0 && (<DataTable slug="admin" columns={columns} rows={admins} />)}
            {users?.length > 0 && (<ClientDataTable slug="users" columns={clientColumns} rows={users} />)}
          </div>
      </div>
    </div>
  );
};

export default Users;
