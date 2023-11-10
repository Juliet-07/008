import React, { useState, useEffect, useRef } from "react";
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
import { toast } from "react-toastify";
import { BiDotsVertical } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoTrashBinSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { FcFilledFilter } from "react-icons/fc";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import Modal from "../../components/Modal";

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

const customStylesPending = {
  headRow: {
    style: {
      backgroundColor: "#D4AF37",
      color: "black",
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

const customStylesAll = {
  headRow: {
    style: {
      backgroundColor: "#008000",
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

export const SupervisorRequests = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_GET_ACCESS_REQUEST;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [requests, setRequests] = useState([]);

  const getMyAccessRequests = async () => {
    let email = user.givenname;
    try {
      await axios
        .get(
          `${apiURL}/GetAllAccessRequestByRequesterEmail?requesterEmail=${email}@premiumtrustbank.com`
        )
        .then((response) => {
          console.log(response.data, "Access Request");
          setRequests(response.data.data);
        });
    } catch (error) {
      console.error("Error fetching access requests:", error);
      setRequests([]);
      toast.error("An error occurred while fetching requests.");
    }
  };

  useEffect(() => {
    getMyAccessRequests();
  }, []);

  return (
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
          <DataTable
            columns={column}
            data={requests}
            customStyles={customStyles}
            pagination
          ></DataTable>
        </div>
      </CardBody>
    </Card>
  );
};

export const SupervisorAssignedRequests = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_GET_ACCESS_REQUEST;
  const formatDate = (value) => {
    return moment(value).format("HH:MM A DD, MM, YYYY");
  };

  const column = [
    { name: "Staff Name", selector: (row) => row.requestorName },
    { name: "Staff Role", selector: (row) => row.staffRole },
    {
      name: "Request Type",
      selector: (row) => row.accessTo,
    },
    {
      name: "Request For",
      selector: (row) => row.accessFor,
    },
    {
      name: "Effective Date",
      selector: (row) => formatDate(row.effectiveDate),
    },
    {
      name: "Status",
      selector: (row) => row.statusDescription,
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "green",
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
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const tableRef = useRef(null);
  const [requests, setRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [details, setDetails] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [comment, setComment] = useState("");
  const [showApprovedRequests, setShowApprovedRequests] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = pendingRequests.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pendingRequests.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const getMyAccessRequests = async () => {
    let email = user.givenname;
    try {
      await axios
        .get(
          `${apiURL}/GetAllAccessRequestBySupervisorEmail?supervisorEmail=${email}@premiumtrustbank.com`
        )
        .then((response) => {
          console.log(response.data, "Pending Request");
          // setRequests(response.data.data);
          const accessRequests = response.data.data;
          if (accessRequests) {
            const pendingRequest = accessRequests.filter(
              (request) => request.supervisorHasApproved === false
            );
            const approvedRequest = accessRequests.filter(
              (request) => request.supervisorHasApproved === true
            );
            setPendingRequests(pendingRequest);
            setApprovedRequests(approvedRequest);
          } else {
            console.error("Invalid data structure in the response");

            setPendingRequests([]);
            setApprovedRequests([]);
            toast.error("Invalid response data structure.");
          }
        });
    } catch (error) {
      console.error("Error fetching access requests:", error);
      setRequests([]);
      toast.error("An error occurred while fetching requests.");
    }
  };

  const toggleApprovedRequests = () => {
    setShowApprovedRequests(!showApprovedRequests);
  };

  useEffect(() => {
    getMyAccessRequests();
  }, []);

  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const url = `${apiURL}/ApproveRejectAccessRequestBySupervisor`;
  const handleAuthorization = async (e, req) => {
    const payload = {
      id: req.id,
      newStatus: "Approved",
      supervisorComment: comment,
      updatedBy: user.name,
      statusCode: "0002",
    };
    console.log(payload, "payload");
    await axios
      .post(url, payload)
      .then(
        (response) => (
          console.log(response, "response from authorizer"),
          toast.success("Authorization Status:" + response.data.responseMessage)
        )
      );
  };
  const handleDecline = async (e, req) => {
    const payload = {
      id: req.id,
      level: "string",
      newStatus: "Rejected",
      comment: comment,
      updatedBy: user.name,
      statusCode: "0003",
    };
    console.log(payload, "payload");
    await axios
      .post(url, payload)
      .then(
        (response) => (
          console.log(response, "response from authorizer"),
          toast.success("Authorization Status:" + response.data)
        )
      );
  };
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              {showApprovedRequests ? "Approved Requests" : "Pending Requests"}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {showApprovedRequests
                ? "These are details of approved requests"
                : "These are details of pending requests that require your attention for approval"}
            </Typography>
          </div>
          <div
            className="w-[100px] h-10 flex items-center justify-center bg-green-600 rounded-lg cursor-pointer"
            onClick={toggleApprovedRequests}
          >
            {/* <FcFilledFilter size={30} /> */}
            <FaFilter
              size={20}
              color="white"
              // color={showApprovedRequests ? "green" : "gray"}
            />
            <span className="ml-2 text-white">Filter</span>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        {showApprovedRequests ? (
          <div className="mx-4">
            <DataTable
              columns={column}
              data={approvedRequests}
              customStyles={customStyles}
              pagination
            ></DataTable>
          </div>
        ) : (
          <div className="rounded-lg px-4">
            <div className="flex flex-col items-center justify-center">
              <table
                ref={tableRef}
                className="table bg-white text-sm text-left text-black px-4 w-full"
              >
                <thead className="bg-[#D4AF37] text-sm text-black font-semibold rounded-lg">
                  <th className="p-4">Staff Name</th>
                  <th className="p-4">Staff Role</th>
                  <th className="p-4">Request Type</th>
                  <th className="p-4">Request For</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Date Requested</th>
                  <th className="p-4">Effective Date</th>
                  <th className="p-4">Action</th>
                  <th className="p-4"></th>
                </thead>
                <tbody>
                  {records.length > 0 ? (
                    records.map((access, index) => {
                      return (
                        <tr>
                          <td className="p-4">{access.requestorName}</td>
                          <td className="p-4">{access.staffRole}</td>
                          <td className="p-4">{access.accessTo}</td>
                          <td className="p-4">{access.accessFor}</td>
                          <td className="p-4">{access.duration}</td>
                          <td className="p-4">{access.dateRequested}</td>
                          <td className="p-4">{access.effectiveDate}</td>
                          {/* <td className="p-4">
                          <div className="flex items-center cursor-pointer">
                            <BsFillCheckCircleFill
                              size={20}
                              color="green"
                                onClick={(e) => handleAuthorization(e, access)}
                            />
                            <IoTrashBinSharp
                              size={20}
                              color="red"
                              className="ml-2"
                                onClick={(e) => handleDecline(e, access)}
                            />
                          </div>
                        </td> */}
                          <td className="p-4 flex items-center justify-center cursor-pointer">
                            <BiDotsVertical
                              onClick={() => {
                                setSelectedRowData(access);
                                return setDetails(true);
                              }}
                            />
                          </td>
                          <Modal
                            isVisible={details}
                            onClose={() => setDetails(false)}
                          >
                            <div className="flex flex-col w-[800px] px-4">
                              <div className="font-semibold text-lg">
                                All Details on this request
                              </div>
                              <div className="my-4">
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                  <div className="font-normal text-[#7b7878]">
                                    Staff Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.requestorName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Staff Email:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.requestorEmail}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Staff Unit:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.requestorUnit}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Staff Role:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.staffRole}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Request Type:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accessTo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Request For:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accessFor}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Functional Priviledges:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.privileges}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Additional Information:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.additionalInformation}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Date Requested:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.dateRequested}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Duration:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.duration}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Effective Date:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.effectiveDate}
                                    </span>
                                  </div>
                                </div>
                                <form>
                                  <div>
                                    <input
                                      className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                      placeholder="Comment"
                                      value={comment}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="flex items-center justify-center mt-4">
                                    <button
                                      onClick={(e) => {
                                        handleAuthorization(e, selectedRowData);
                                      }}
                                      type="submit"
                                      className="w-[150px] h-10 p-2 text-white text-sm font-semibold bg-green-600 rounded mr-4 hover:bg-green-300"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      // onClick={(e) => {
                                      //   handleAuthorization(e, selectedRowData);
                                      // }}
                                      type="submit"
                                      className="w-[150px] h-10 p-2 text-white text-sm font-semibold rounded bg-red-600 hover:bg-red-300"
                                    >
                                      Decline
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </Modal>
                        </tr>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center text-xl font-semibold">
                      No accessCheque Report!
                    </div>
                  )}
                </tbody>
              </table>
              <nav>
                <ul className="flex flex-row items-center">
                  <li>
                    <MdSkipPrevious
                      size={20}
                      onClick={prevPage}
                      className="cursor-pointer"
                    />
                  </li>
                  {numbers.map((n, i) => (
                    <li key={i} className="text-lg p-2">
                      <a href="#" onClick={() => changeCurrentPage(n)}>
                        {n}
                      </a>
                    </li>
                  ))}
                  <li>
                    <MdSkipNext
                      size={20}
                      onClick={nextPage}
                      className="cursor-pointer"
                    />
                  </li>
                </ul>
              </nav>
              {/* <div
              className="flex items-center justify-center cursor-pointer w-[177px] h-[49px] bg-[#db1600] text-white font-semibold rounded"
              onClick={onDownload}
            >
              <AiOutlineDownload size={20} />
              <span> as .xlsx</span>
            </div> */}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
