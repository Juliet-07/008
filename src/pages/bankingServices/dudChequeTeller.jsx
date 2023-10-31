import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import DataTable from "react-data-table-component";
import moment from "moment";

const formatDate = (value) => {
  return moment(value).format("HH:MM A DD, MM, YYYY");
};

const column = [
  // { name: "Account Name", selector: (row) => row.AccountName },
  { name: "Account Number", selector: (row) => row.AccountNumber },
  { name: "Account Branch", selector: (row) => row.BranchCode },
  { name: "Account Type", selector: (row) => row.CustomerType },
  { name: "Amount", selector: (row) => row.Amount },
  { name: "Payee", selector: (row) => row.Payee },
  {
    name: "Transaction Date",
    selector: (row) => formatDate(row.TransactionDate),
  },
  {
    name: "Status",
    selector: (row) =>
      row.Status === "1"
        ? "Approved"
        : row.Status === "2"
        ? "Declined"
        : "Pending",
  },
];

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#2B2E35",
      color: "white",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "600",
      textTransform: "uppercase",
    },
  },
  cells: {
    style: {
      fontSize: "13px",
    },
  },
};

const TellerHomePage = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_DUDCHEQUE;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyTransactions = async () => {
    setLoading(true);
    let userId = user.name;
    try {
      await axios
        .get(`${apiURL}/GetAllDudChequeTransaction?Initialised_Name=${userId}`)
        .then((response) => {
          console.log(response.data, "My Transactions");
          setRequests(response.data.result);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching access requests:", error);
      setRequests([]);
      alert("An error occurred while fetching requests.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyTransactions();
  }, []);

  return (
    <div className="2xl:p-10">
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Logged DudCheque Information
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details on the last requests you made
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Link to="/DudChequeForm">
                <div className="w-full h-10 rounded  p-2 bg-[#2B2E35] text-white flex items-center justify-center font-medium">
                  <AiFillFileAdd size={30} />
                  <span className="ml-2">Log DudCheque</span>
                </div>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <div className="mx-4">
            {loading ? (
              "Loading..."
            ) : (
              <DataTable
                columns={column}
                data={requests}
                customStyles={customStyles}
                pagination
              ></DataTable>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
export default TellerHomePage;
