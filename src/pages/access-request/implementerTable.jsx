import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import moment from "moment";
import { toast } from "react-toastify";
import { BiDotsVertical } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";
import Modal from "../../components/Modal";
import Select from "react-select";

const formatDate = (value) => {
  return moment(value).format("HH:MM A DD, MM, YYYY");
};

export const ImplementerTable = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const apiURL = import.meta.env.VITE_REACT_APP_GET_ACCESS_REQUEST;
  const { handleSubmit } = useForm();
  const tableRef = useRef(null);
  const [requests, setRequests] = useState([]);
  const [details, setDetails] = useState(false);
  const [formDetails, setFormDetails] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [selectedRowDataForForm, setSelectedRowDataForForm] = useState({});
  const [value, setValue] = useState("");
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeeUnit, setEmployeeUnit] = useState("");
  const [value1, setValue1] = useState("");
  const [employee1, setEmployee1] = useState([]);
  const [selectedEmployee1, setSelectedEmployee1] = useState("");
  const [employeeUnit1, setEmployeeUnit1] = useState("");
  const [value2, setValue2] = useState("");
  const [employee2, setEmployee2] = useState([]);
  const [selectedEmployee2, setSelectedEmployee2] = useState("");
  const [employeeUnit2, setEmployeeUnit2] = useState("");
  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = requests.slice(firstIndex, lastIndex);
  const npages = Math.ceil(requests.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const getRequestsToImplement = async () => {
    // let email = user.givenname;
    // let name = user.name
    // let email = "IT Infrastructure";
    let name = "Damilola Falonipe";
    // let name = "Kenneth Nwanze"
    // let name = "Christian.Nnabuife"
    try {
      await axios
        .get(
          `${apiURL}/GetAllAccessRequestByImplementerEmail?implementerEmail="email"@premiumtrustbank.com&implementerName=${name}&statusCode=0002`
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

  const getAllEmployees = () => {
    // const url = `${process.env.REACT_APP_AD_BASEURL}/GetUsers`;
    const url = "http://192.168.207.18:8080/api/ActiveDirectory/GetUsers";
    let details;
    let users;
    axios
      .get(url, {
        headers: {
          ApiKey:
            "2OxMxgdjV6hxuW3ySpxPWHHDjQTCcd2FFbh7fXVkekiVH1E29f0hoCoqEBIuvmIZFOc02P5jQCVZf7PijhDfh9zsoB6pw2GFBpUSSuRy2yOamUznbJyhNEheAgl5d6fP",
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((response) => {
        details = response.data.data;
        users = details.map((user) => {
          return { value: user.email, label: user.fullName };
        });
        setEmployee(users);
        setEmployee1(users);
        setEmployee2(users);
        // setSupervisor(users);
        console.log(users, "users");
      });
  };

  const handleEmployeeInputChange = (value) => {
    setValue(value);
  };

  const handleEmployeeInputChange1 = (value) => {
    setValue1(value);
  };

  const handleEmployeeInputChange2 = (value) => {
    setValue2(value);
  };
  const handleSelectEmployee = (value) => {
    console.log(value, "values");
    setSelectedEmployee(value);
    console.log(selectedEmployee, "Approval One");
  };
  const handleSelectEmployee1 = (value) => {
    console.log(value, "values");
    setSelectedEmployee1(value);
    console.log(selectedEmployee1, "Approval Two");
  };
  const handleSelectEmployee2 = (value) => {
    console.log(value, "values");
    setSelectedEmployee2(value);
    console.log(selectedEmployee2, "Approval Three");
  };

  useEffect(() => {
    getRequestsToImplement();
    getAllEmployees();
  }, [selectedEmployee, selectedEmployee1, selectedEmployee2]);

  const handleImplementerApproval = () => {
    const url = `${apiURL}/UpdateAccessRequestApprovalsByImplementer`;
    const payload = {
      id: selectedRowData.id,
      approvalLevel: 3,
      approvalOneEmail: selectedEmployee.value,
      approvalTwoEmail: selectedEmployee1.value,
      approvalThreeEmail: selectedEmployee2.value,
      approvalOneUnit: employeeUnit,
      approvalTwoUnit: employeeUnit1,
      approvalThreeUnit: employeeUnit2,
    };
    console.log(payload);
    axios.post(url, payload).then((response) => {
      console.log(response, "response from approving implementation");
      toast.success(response.data.responseMessage);
    });
  };
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Pending Requests
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details of requests you are to Implement.
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
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
                {/* <th className="p-4">Duration</th> */}
                <th className="p-4">Effective Date</th>
                <th className="p-4">View Details</th>
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
                        {/* <td className="p-4">{access.duration}</td> */}
                        {/* <td className="p-4">{access.dateRequested}</td> */}
                        <td className="p-4">{access.effectiveDate}</td>
                        <td className="p-4 flex items-center justify-center cursor-pointer">
                          <BiDotsVertical
                            size={20}
                            onClick={() => {
                              setSelectedRowData(access);
                              return setDetails(true);
                            }}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center cursor-pointer">
                            <BsFillCheckCircleFill
                              size={20}
                              color="green"
                              onClick={() => {
                                setSelectedRowDataForForm(access);
                                return setFormDetails(true);
                              }}
                            />
                            <IoTrashBinSharp
                              size={20}
                              color="red"
                              className="ml-2"
                              // onClick={(e) => handleDecline(e, access)}
                            />
                          </div>
                        </td>

                        <Modal
                          isVisible={details}
                          onClose={() => setDetails(false)}
                        >
                          <div className="flex flex-col w-full px-4">
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
                              {/* <form>
                                <div>
                                  <input
                                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                    placeholder="Comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
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
                                    type="submit"
                                    className="w-[150px] h-10 p-2 text-white text-sm font-semibold rounded bg-red-600 hover:bg-red-300"
                                  >
                                    Decline
                                  </button>
                                </div>
                              </form> */}
                            </div>
                          </div>
                        </Modal>

                        <Modal
                          isVisible={formDetails}
                          onClose={() => setFormDetails(false)}
                        >
                          <div className="flex flex-col items-center justify-center w-[800px]">
                            <div className="font-semibold text-lg">
                              Form to send approval levels
                            </div>
                            <form
                              onSubmit={handleSubmit(handleImplementerApproval)}
                              className="w-[700px] my-6"
                            >
                              {/* <div className="flex flex-wrap -mx-3">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                  <label
                                    htmlFor="approvalOne"
                                    className=" text-gray-800 "
                                  >
                                    Approval One Email
                                  </label>
                                  <input
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name="approverOne"
                                    value={
                                      selectedRowDataForForm.supervisorEmail
                                    }
                                  />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                  <label
                                    htmlFor="approvalOne"
                                    className=" text-gray-800"
                                  >
                                    Approval One Unit
                                  </label>
                                  <input
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name="approvalOneUnit"
                                    value={selectedRowDataForForm.requestorUnit}
                                  />
                                </div>
                              </div> */}
                              <div className="flex flex-wrap -mx-3 mt-4">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                  <label
                                    htmlFor="userName"
                                    className=" text-gray-800 mb-2"
                                  >
                                    Approval One Email
                                  </label>
                                  <Select
                                    options={employee}
                                    defaultValue={selectedEmployee}
                                    onChange={handleSelectEmployee}
                                    onInputChange={handleEmployeeInputChange}
                                    isSearchable
                                  />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                  <label
                                    htmlFor="password"
                                    className=" text-gray-800"
                                  >
                                    Approval One Unit
                                  </label>
                                  <input
                                    type="text"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name="employeeUnit"
                                    value={employeeUnit}
                                    onChange={(e) =>
                                      setEmployeeUnit(e.target.value)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="flex flex-wrap -mx-3 mt-4">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                  <label
                                    htmlFor="approvalTwo"
                                    className=" text-gray-800 "
                                  >
                                    Approval Two Email
                                  </label>
                                  <Select
                                    options={employee1}
                                    defaultValue={selectedEmployee1}
                                    onChange={handleSelectEmployee1}
                                    onInputChange={handleEmployeeInputChange1}
                                    isSearchable
                                  />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                  <label
                                    htmlFor="password"
                                    className=" text-gray-800"
                                  >
                                    Approval Two Unit
                                  </label>
                                  <input
                                    type="text"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name="employeeUnit1"
                                    value={employeeUnit1}
                                    onChange={(e) =>
                                      setEmployeeUnit1(e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="flex flex-wrap -mx-3 mt-4">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                  <label
                                    htmlFor="userName"
                                    className=" text-gray-800 "
                                  >
                                    Approval Three Email
                                  </label>
                                  <Select
                                    options={employee2}
                                    defaultValue={selectedEmployee2}
                                    onChange={handleSelectEmployee2}
                                    onInputChange={handleEmployeeInputChange2}
                                    isSearchable
                                  />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                  <label
                                    htmlFor="text"
                                    className=" text-gray-800"
                                  >
                                    Approval Three Unit
                                  </label>
                                  <input
                                    type="text"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    name="employeeUnit2"
                                    value={employeeUnit2}
                                    onChange={(e) =>
                                      setEmployeeUnit2(e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div className="mt-10">
                                <button
                                  type="submit"
                                  className="w-full p-4 font-medium tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        </Modal>
                      </tr>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center text-lg">
                    No Requests!
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
                  <li key={i} className="text-sm p-2">
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
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
