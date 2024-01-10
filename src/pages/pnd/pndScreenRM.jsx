import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import { Input, Button, Textarea, Checkbox } from "@material-tailwind/react";
import { Menu, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import Select from "react-select";
import moment from "moment";
import { toast } from "react-toastify";

const formatDate = (value) => {
  return moment(value).format("HH:MM A DD, MM, YYYY");
};

const column = [
  { name: "Initiator", selector: (row) => row.relationship_manager },
  { name: "Reason", selector: (row) => row.reason },
  {
    name: "Status",
    selector: (row) => row.status,
  },
  {
    name: "Date",
    selector: (row) => formatDate(row.created_at),
  },
];

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "red",
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

const PNDScreenRM = () => {
  const { handleSubmit } = useForm();
  const [accountNumberModel, setAccountNumberModel] = useState("");
  const [history, setHistory] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [docx, setDocx] = useState({});
  const [compliance, setCompliance] = useState(false);
  const [assignee, setAssignee] = useState("");
  const [others, setOthers] = useState(false);
  const [reason, setReason] = useState("");

  const user = JSON.parse(localStorage.getItem("userInfo"));
  const _token = JSON.parse(localStorage.getItem("pndUser"));
  let token = _token.token;
  const base_url = `${process.env.REACT_APP_PND}`;

  const GetCustomerInfo = () => {
    const url = `${base_url}CustomerInfo/GetCustomerInfo`;
    const payload = {
      accountNumberModel: accountNumberModel,
    };
    let result;
    let pndData;
    let list;
    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        console.log(res.data);
        result = res.data;
        pndData = result.data;
        list = result.pndAccountHistories;
        // alert(res.data.message);
        toast.success("Details fetched Successfully");
        setPndDetails(pndData);
        setHistory(list);
      })
      .catch((err) => console.log(err));
  };

  const handleCheckBox = (event) => {
    setCompliance(event.target.checked);
    setAssignee("compliance");
    console.log(compliance, "checkbox");
  };

  const handleCheckBoxChange = (event) => {
    setOthers(event.target.checked);
    setAssignee("bsm");
    console.log(others, "checkbox");
  };

  const initialValues = {
    initiator: "",
    branch: "",
    email: "",
    phonenumber: "",
    accountname: "",
    accountnumber: "",
    tin: "",
    customeR_TYPE: "",
    address: "",
    Reason: "",
  };
  const [pndDetails, setPndDetails] = useState(initialValues);
  const {
    initiator,
    branch,
    email,
    phonenumber,
    accountname,
    accountnumber,
    bvn,
    tin,
    customeR_TYPE,
    address,
    Reason,
  } = pndDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPndDetails({ ...pndDetails, [name]: value });
  };

  const fileUploadHandler = (e) => {
    console.log(e.target.files);
    const docx = e.target.files[0];
    setDocx(docx);
  };

  const placeAccountOnPND = () => {
    const url = `${base_url}PndAccount/PndCustomerAccount`;
    const formData = new FormData();
    formData.append("initiator", initiator);
    formData.append("branch", branch);
    formData.append("email", email);
    formData.append("phonenumber", phonenumber);
    formData.append("account_name", accountname);
    formData.append("account_number", accountnumber);
    formData.append("bvn", bvn);
    formData.append("customerType", customeR_TYPE);
    formData.append("address", address);
    formData.append("reason", reason);
    formData.append("reason", Reason);
    formData.append("userEmail", userEmail);
    formData.append("formFile", docx);
    formData.append("tin", tin);
    formData.append("assignee", assignee);
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data, "place account on PND");
        alert(res.data.data)
        toast.success(res.data.message)
      });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserEmail(`${user.givenname}@premiumtrustbank.com`);
  }, []);

  const options = [
    {
      value: "court order",
      label: "Court Order",
    },
    {
      value: "fraud",
      label: "Fraud",
    },
    {
      value: "garnishee order",
      label: "Garnishee Order",
    },
    {
      value: "incomplete documentation",
      label: "Incomplete Documentation",
    },
    {
      value: "investigation",
      label: "Investigation",
    },
    {
      value: "law enforcement agent",
      label: "Law Enforcement Agent",
    },
    {
      value: "regulatory reason",
      label: "Regulatory Reason",
    },
    {
      value: "suspicious transaction",
      label: "Suspicious Transaction",
    },
  ];

  const handleSelectChange = (value) => {
    setReason(value.value);
    console.log(value, "values");
  };
  return (
    <>
      <div className="flex items-center justify-center font-bold text-xl my-4">
        PND ACCOUNT RELATIONSHIP MANAGER
      </div>
      <div className="w-full h-screen flex">
        {/* form section */}
        <div className="w-[50%] flex justify-end">
          <div className="w-[550px] h-[800px] border border-[#9b9ca0] shadow-lg shadow-[#9b9ca0] rounded-xl mr-4 py-4 px-6">
            <div className="font-bold text-xl">Search Customer</div>
            <form onSubmit={handleSubmit(GetCustomerInfo)}>
              <div className="flex my-4">
                <input
                  type="text"
                  placeholder="Enter customer account number"
                  className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-[#9b9ca0]leading-tight focus:outline-none focus:shadow-outline"
                  value={accountNumberModel}
                  onChange={(e) => setAccountNumberModel(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-red-600 rounded w-[100px] h-[48px] py-3 px-6 mx-4 text-white font-semibold text-lg"
                >
                  Find
                </button>
              </div>
            </form>
            <div className="w-[500px] border border-[#e2e2e2] mt-8"></div>
            <div className="uppercase font-bold text-xl my-4">pnd account</div>
            <form onSubmit={handleSubmit(placeAccountOnPND)}>
              <div className="w-full max-w-lg h-full flex flex-col gap-6">
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Input
                      size="lg"
                      label="Initiator"
                      name="initiator"
                      value={initiator}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <Input
                      size="lg"
                      label="Initiator's Branch"
                      name="branch"
                      value={branch}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Input size="lg" label="Email" value={email} />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <Input size="lg" label="phonenumber" value={phonenumber} />
                  </div>
                </div>
                <Input size="lg" label="Account Name" value={accountname} />
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Input
                      size="lg"
                      label="Account Number"
                      value={accountnumber}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <Input size="lg" label="BVN" value={bvn} />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <Input
                      size="lg"
                      label="Account Type"
                      value={customeR_TYPE}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <Input
                      size="lg"
                      label="Address"
                      value={address}
                      className="truncate text-ellipsis"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/2 px-3 md:mb-0">
                    <Checkbox
                      label="Complaince"
                      type="radio"
                      name="assignee"
                      value={assignee}
                      onChange={handleCheckBox}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <Checkbox
                      label="Others"
                      type="radio"
                      name="assignee"
                      // value={bsm}
                      onChange={handleCheckBoxChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    {compliance && (
                      <Select
                        options={options}
                        defaultValue={reason}
                        onChange={handleSelectChange}
                        isSearchable
                      />
                    )}
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    {others && (
                      <Textarea
                        size="lg"
                        label="Reason"
                        name="Reason"
                        value={Reason}
                        onChange={handleChange}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3">
                  <input
                    type="file"
                    name="docx"
                    onChange={fileUploadHandler}
                    multiple
                    className="px-3"
                  />
                </div>
                <Button type="submit" className="bg-red-600 h-[50px]" fullWidth>
                  Initiate PND
                </Button>
              </div>
            </form>
          </div>
        </div>
        {/* table section */}
        <div className="w-[50%]">
          <div className="bg-[#2b2e35] w-[300px] xl:w-[320px] h-[54px] rounded py-4 px-3 xl:px-10 text-white font-semibold">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex items-center">
                  View Customer PND History
                  <FiChevronDown
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-left absolute left-0 mt-6 w-[700px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-20">
                  <div>
                    <Menu.Item>
                      <div className="mr-4">
                        <DataTable
                          columns={column}
                          data={history}
                          customStyles={customStyles}
                          pagination
                        ></DataTable>
                      </div>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default PNDScreenRM;
