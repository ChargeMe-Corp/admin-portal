import { Box, SimpleGrid } from "@chakra-ui/react";
import UsersTable from "./components/UsersTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React, { useEffect, useState } from "react";
import api from "../../../api";
import Loader from "../../../components/loader/loader";
const columns = [
  {
    Header: "FIRST NAME",
    accessor: "firstName",
  },
  {
    Header: "LAST NAME",
    accessor: "lastName",
  },
  {
    Header: "PHONE",
    accessor: "phoneNumber",
  },
  {
    Header: "CURRENT PB",
    accessor: "pbNum",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await api.users.getAllUsers();
        const mappedUsers = fetchedUsers.map((user) => ({
          ...user,
          pbNum: user.powerbanks.length,
        }));
        setUsers(mappedUsers);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  const handleRemove = (userId) => async () => {
    setLoading(true);
    try {
      console.log(userId);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Loader loading={loading} />
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <UsersTable
          columnsData={columns}
          tableData={users}
          handleRemove={handleRemove}
        />
      </SimpleGrid>
    </Box>
  );
}
