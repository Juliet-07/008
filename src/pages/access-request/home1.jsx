import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
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
  { name: "Request Type", selector: (row) => row.accessTo },
  { name: "Date Requested", selector: (row) => row.dateRequested },
  {
    name: "Status",
    selector: (row) => row.statusDescription,
  },
  {
    name: "Effective Date",
    selector: (row) => formatDate(row.effectiveDate),
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

const AccessRequestHomePage = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMyAccessRequests = async () => {
    setLoading(true);
    let email = user.givenname;
    try {
      await axios
        .get(
          `${process.env.REACT_APP_GET_ACCESS_REQUEST}/GetAllAccessRequestByRequesterEmail?requesterEmail=${email}@premiumtrustbank.com`
        )
        .then((response) => {
          console.log(response.data, "Access Request");
          setRequests(response.data.data);
          // Use toast to display the response message
          toast.success(response.data.message);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching access requests:", error);
      setRequests([]);
      toast.error("An error occurred while fetching requests.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyAccessRequests();
  }, []);
  return (
    <div className="p-10">
      <div className="flex items-center mb-6 text-[#2B2E35] text-2xl font-semibold">
        Welcome, {user.name}
      </div>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                Recent Requests
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                These are details about the last requests you made
              </Typography>
            </div>
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <Link to="/access-requestor-form">
                <div className="w-full h-10 rounded  p-2 bg-[#2B2E35] text-white flex items-center justify-center font-medium">
                  <AiFillFileAdd size={30} />
                  <span className="ml-2">Create a new request</span>
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
export default AccessRequestHomePage;
