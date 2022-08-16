import { Box, SimpleGrid } from "@chakra-ui/react";
import UsersTable from "./components/UsersTable";
import React, { useEffect, useState } from "react";
import api from "../../../api";
import Loader from "../../../components/loader/loader";
import RentalsTable from "./components/RentalsTable";
import moment from "moment";
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
const rentalColumns = [
  {
    Header: "NAME",
    accessor: "userName",
  },
  {
    Header: "PHONE",
    accessor: "holdingUser.phoneNumber",
  },
  {
    Header: "TOTAL PRICE",
    accessor: "currentPrice",
  },
  {
    Header: "START STATION",
    accessor: "startStation.title",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await api.users.getAllUsers();
        const mappedUsers = fetchedUsers.map((user) => ({
          ...user,
          pbNum: user.rentals.length,
        }));
        setUsers(mappedUsers);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    const fetchCurrentRentals = async () => {
      setLoading(true);
      try {
        const fetchedRentals = await api.rentals.getCurrentRentals();
        console.log(fetchedRentals);
        const mappedRentals = fetchedRentals.map((rental) => ({
          ...rental,
          currentPrice:
            (Math.ceil(
              moment().diff(moment(rental.startedAt), "seconds") / 3600
            ) *
              rental.basePrice) /
            100,
          userName: `${rental.holdingUser.firstName} ${rental.holdingUser.lastName}`,
        }));
        setRentals(mappedRentals);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetchUser();
    fetchCurrentRentals();
  }, []);
  const handleRemoveUser = (userId) => async () => {
    setLoading(true);
    try {
      console.log(userId);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  const handleRemoveRental = (userId) => async () => {
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
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <UsersTable
          columnsData={columns}
          tableData={users}
          handleRemove={handleRemoveUser}
        />
        <RentalsTable
          columnsData={rentalColumns}
          tableData={rentals}
          handleRemove={handleRemoveRental}
        />
      </SimpleGrid>
    </Box>
  );
}
