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
  { name: "Branch", selector: (row) => row.BRANCHNAME },
  { name: "Denomination", selector: (row) => row.DENOMINATION },
  { name: "Currency Number", selector: (row) => row.CURRENCYNUMBER },
  {
    name: "Transaction Date",
    selector: (row) => formatDate(row.INITIATOR_DATE),
  },
  {
    name: "Status",
    selector: (row) =>
      row.STATUS === "1"
        ? "Approved"
        : row.STATUS === "2"
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
      fontSize: "14px",
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
        .get(`${apiURL}/GetAllCounterfeitNoteByInitiator?Initiate_By=${userId}`)
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
                Counterfeit Note Information
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details on the last requests you made
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Link to="/applications/counterfeitNoteForm">
                <div className="w-full h-10 rounded  p-2 bg-[#2B2E35] text-white flex items-center justify-center font-medium">
                  <AiFillFileAdd size={30} />
                  <span className="ml-2">Report Countefeit Notes</span>
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
