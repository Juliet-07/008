import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Icon from "../../assets/icon.png";
import { useForm } from "react-hook-form";
import { DatePicker } from "antd";
import { Input, Button, Textarea } from "@material-tailwind/react";
import jsPDF from "jspdf";
import Select from "react-select";
import { toast } from "react-toastify";
import ReportTemplate from "../../components/ReportTemplate";

const RequestorForm = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_AD_BASEURL;
  const AR_URL = import.meta.env.VITE_REACT_APP_GET_ACCESS_REQUEST;
  const { handleSubmit } = useForm();
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [supervisor, setSupervisor] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [inputValue, setValue] = useState("");
  const [inputValue1, setValue1] = useState("");
  const [inputValue2, setValue2] = useState("");

  const doc = new jsPDF();
  const reportTemplateRef = useRef(null);
  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });
    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    userDetails(user.givenname);
    getAllEmployees();
    getDepartments();
  }, []);

  const userDetails = async (_email) => {
    if (_email) {
      await axios
        .post(
          `${apiURL}/GetUserInfoByEmail?email=${_email}@premiumtrustbank.com`
        )
        .then((response) => {
          console.log(response.data, "userdetails");
          let info;
          info = response.data.data;
          // setAccessForm({
          //   requestorName: info.fullName,
          //   requestorUnit: info.department,
          //   staffRole: info.title,
          //   requestorEmail: info.email,
          // });
        });
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
        console.log(response.data.data, "users");
        details = response.data.data;
        users = details.map((user) => {
          return { value: user.email, label: user.fullName };
        });
        setEmployees(users);
        setSupervisor(users);
        console.log(users, "users");
      });
  };

  const getDepartments = () => {
    // const url = `${process.env.REACT_APP_AD_BASEURL}/GetUsers`;
    const url = "http://192.168.207.18:8080/api/ActiveDirectory/GetDepartments";
    let details;
    let group;
    axios.get(url).then((response) => {
      console.log(response.data.data, "users");
      details = response.data.data;
      group = details.map((dept) => {
        return { value: dept.email, label: dept.fullName };
      });
      setGroups(group);
      console.log(group, "departments");
    });
  };
  const initialValues = {
    requestorName: "",
    requestorEmail: "",
    requestorUnit: "",
    staffRole: "",
    groupName: "",
    effectiveDate: "",
    duration: "",
    accessTo: "",
    accessFor: "",
    accessToOthers: "",
    privileges: "",
    additionalInformation: "",
    implementerEmail: "",
    implementerName: "",
    supervisorEmail: "",
  };
  const [accessForm, setAccessForm] = useState(initialValues);

  const {
    requestorName,
    staffRole,
    requestorUnit,
    effectiveDate,
    duration,
    accessTo,
    accessFor,
    accessToOthers,
    privileges,
    additionalInformation,
    implementerEmail,
    supervisorEmail,
    requestorEmail,
    groupName,
    implementerName,
  } = accessForm;

  // handleChange for other inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccessForm({ ...accessForm, [name]: value });
  };

  // handleChange for Request AccessFor Dropdown
  const handleSelectItemChange = (e) => {
    setSelectedItem(e.target.value);
    console.log(selectedItem, "access for");
  };

  // handleChange for Request AccessTo Dropdown
  const handleSelectOptionChange = (e) => {
    setSelectedOption(e.target.value);
    console.log(selectedOption, "selPremiumTrustected items");
  };

  //   handle selection for Groups
  const handleGroupInputChange = (value) => {
    setValue(value);
  };
  const handleSelectGroupChange = (value) => {
    console.log(value, "values");
    setSelectedGroup(value);
    console.log(selectedGroup, "departments");
  };

  // handle selection for implementer name
  const handleEmployeeInputChange = (value) => {
    setValue1(value);
  };
  const handleSelectEmployee = (value) => {
    console.log(value, "values");
    setSelectedEmployee(value);
    console.log(selectedEmployee, "implementer");
  };

  // handle selection for supervisor
  const handleSupervisorInputChange = (value) => {
    setValue2(value);
  };
  const handleSelectSupervisor = (value) => {
    console.log(value, "values");
    setSelectedSupervisor(value);
    console.log(selectedSupervisor, "supervisor");
  };

  // To ensure the selected item is immediately captured
  useEffect(() => {
    console.log(selectedGroup, "useeffect");
    console.log(selectedItem, "item");
    console.log(selectedOption, "option");
    console.log(selectedEmployee, "implementer");
    console.log(selectedSupervisor, "supervisor");
  }, [
    selectedGroup,
    selectedItem,
    selectedOption,
    selectedEmployee,
    selectedSupervisor,
  ]);

  const postRequest = () => {
    const url = `${AR_URL}/RequestNewAccess`;
    const payload = {
      ...accessForm,
      accessTo: selectedItem,
      accessFor: selectedOption,
      groupName: selectedGroup.label,
      implementerEmail: selectedGroup.value,
      implementerName: selectedEmployee.label,
      supervisorEmail: selectedSupervisor.value,
      requestorEmail: "Jesupelumi.Oluwole@premiumtrustbank.com",
    };
    console.log(payload);
    axios.post(url, payload).then((response) => {
      console.log(response, "response from posting request");
      toast.success(response.data.responseMessage);
    });
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-[600px] md:w-[600px] bg-white shadow-xl border rounded-xl mt-8">
          <div className="flex items-center justify-around my-2">
            <p className="font-semibold text-lg">
              Information System Access Control Form
            </p>
            <img src={Icon} alt="icon" className="w-10 h-10" />
          </div>
          <div className="w-[550px] my-2 mx-6 flex items-center justify-center">
            <form
              onSubmit={handleSubmit(postRequest)}
              className="w-full max-w-lg flex flex-col gap-6"
            >
              <Input
                size="lg"
                label="FullName"
                name="requestorName"
                value={requestorName}
                onChange={handleChange}
                // disabled
              />
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <Input
                    size="lg"
                    label="Role"
                    name="staffRole"
                    value={staffRole}
                    onChange={handleChange}
                    // disabled
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <Input
                    size="lg"
                    label="Department"
                    name="requestorUnit"
                    value={requestorUnit}
                    onChange={handleChange}
                    // disabled
                  />
                </div>
              </div>
              {/* <DatePicker
                onChange={onChange}
                placeholder="Effective Date"
                value={effectiveDate}
              /> */}
              <div className="w-full">
                <label
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                  for="grid-number"
                >
                  Effective Date
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  id="grid-number"
                  type="date"
                  name="effectiveDate"
                  value={effectiveDate}
                  onChange={handleChange}
                />
              </div>
              <Input
                size="lg"
                label="Duration (Hours, Weeks, Months)"
                name="duration"
                value={duration}
                onChange={handleChange}
              />
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3">
                  <select
                    className="block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    value={selectedItem}
                    onChange={handleSelectItemChange}
                  >
                    <option selected>This request is for access to</option>
                    <option value="Database">Database</option>
                    <option value="OBIEE">OBIEE</option>
                    <option value="Server">Server</option>
                    <option value="VPN">VPN</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <select
                    className="block w-full text-gray-700 bg-white p-4 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    value={selectedOption}
                    onChange={handleSelectOptionChange}
                  >
                    <option selected>This request is for</option>
                    <option>Creating a new user</option>
                    <option>Modifying an exisiting user</option>
                    <option>Disabling a user</option>
                    <option>Replacing a user</option>
                  </select>
                </div>
              </div>
              {selectedItem === "Others" && (
                <Input
                  size="lg"
                  label="If others, specify"
                  name="accessToOthers"
                  value={accessToOthers}
                  onChange={handleChange}
                />
              )}
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3">
                  <Textarea
                    label="Funtional Privileges (Indicate the functional roles required)"
                    name="privileges"
                    value={privileges}
                    onChange={handleChange}
                    className="p-4"
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <Textarea
                    label="Additional informtion to justify the access request"
                    name="additionalInformation"
                    value={additionalInformation}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3">
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label className="text-[#2b2e35] text-sm font-medium mb-2">
                    Implementer Email
                  </label>
                  <Select
                    options={groups}
                    defaultValue={selectedGroup}
                    onChange={handleSelectGroupChange}
                    onInputChange={handleGroupInputChange}
                    isSearchable
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label className="block text-gray-700 text-sm mb-2">
                    Implementer Name
                  </label>
                  <Select
                    options={employees}
                    defaultValue={selectedEmployee}
                    onChange={handleSelectEmployee}
                    onInputChange={handleEmployeeInputChange}
                    isSearchable
                  />
                </div>
              </div>
              <div className="w-full -mx-3 px-3 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Supervisor
                  </label>
                  <Select
                    options={supervisor}
                    defaultValue={selectedSupervisor}
                    onChange={handleSelectSupervisor}
                    onInputChange={handleSupervisorInputChange}
                    isSearchable
                  />
                </div>
              </div>
              <Button type="submit" className="my-4 bg-red-600" fullWidth>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestorForm;
