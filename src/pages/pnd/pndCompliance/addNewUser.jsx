import React, { useState, useCallback } from "react";
import Navbar from "./Navbar";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Select from "react-select";
import BranchInfo from "../../../components/BranchDetails";

const NewUser = () => {
  const { handleSubmit } = useForm();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Email, setEmaill] = useState("");
  const [Role, setRole] = useState(null);
  const [Branch, setBranch] = useState("");

  const searchUser = () => {
    let data;
    try {
      axios
        .get(
          `${process.env.REACT_APP_AD_BASEURL}/GetUserByEmail?email=${email}@premiumtrustbank.com`,
          {
            headers: {
              ApiKey:
                "hJmEeNA3ktOQAYxqr9sy8vvCihsjtyCvwHNSzV8M0hQLyCiMsYuZJs28tIyB7WMr1BMWEqCRIRuqSYoGIR2hQZ0YzPU0BoBYhwlvmS372x3TFET9P21El4CZZagRhZCVy1x71WOtsXzu6Sq4ITSGhcDTdiETFPR1as1ZSk9v8hfzw9dzxC5LUwKsCcq8ejE0JlCt34eMeoRWYXW8KADLjAvifLhxXhPJO1t1jXVCXICbbR7G8UQMzpnU2fROHBiw",
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
        // .then((res) => res.json())
        .then((userDetails) => {
          console.log(userDetails.data, "confirm here");
          data = userDetails.data.data;
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmaill(data.email);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const options = [
    {
      value: "bsm",
      label: "BSM",
    },
    {
      value: "compliance",
      label: "Compliance",
    },
    {
      value: "customer experience managers",
      label: "Customer Experience Managers",
    },
    {
      value: "divisional and group heads",
      label: "Divisional & Group Heads",
    },
    {
      value: "internal audit",
      label: "Internal Audit",
    },
    {
      value: "mis",
      label: "MIS",
    },
    {
      value: "relationship managers",
      label: "Relationship Managers",
    },
    {
      value: "super admin",
      label: "Super Admin",
    },
    {
      value: "technical admin",
      label: "Technical Admin",
    },
  ];

  const handleSelectChange = (value) => {
    setRole(value.value);
    console.log(value, "values");
  };

  const handleBranchInfo = useCallback((data) => {
    console.log({ data });
    setBranch(data.value);
    // console.log(details, "accountID");
  }, []);
  console.log(Branch, "bbbbbbb");
  console.log(Role, "rrrrr");

  const createUser = () => {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      Email: Email,
      Role: Role,
      Branch: Branch,
    };
    const url = "http://192.168.207.8:2035/api/RegisterUser/UserRegister";
    try {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          ApiKey:
            "hJmEeNA3ktOQAYxqr9sy8vvCihsjtyCvwHNSzV8M0hQLyCiMsYuZJs28tIyB7WMr1BMWEqCRIRuqSYoGIR2hQZ0YzPU0BoBYhwlvmS372x3TFET9P21El4CZZagRhZCVy1x71WOtsXzu6Sq4ITSGhcDTdiETFPR1as1ZSk9v8hfzw9dzxC5LUwKsCcq8ejE0JlCt34eMeoRWYXW8KADLjAvifLhxXhPJO1t1jXVCXICbbR7G8UQMzpnU2fROHBiw",
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        // .then((res) => res.json())
        .then((response) => {
          console.log(response, "response from creating user");
          // window.alert(response.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="w-[594px] my-20 border border-[#9b9ca0] bg-white p-4 rounded-md flex flex-col">
          <div className="font-bold text-2xl text-[#2b2e35] my-4">
            Search User By Email ID
          </div>
          <form onSubmit={handleSubmit(searchUser)}>
            <div className="flex">
              <Input
                size="lg"
                label="Enter User Email ID"
                className="focus:border-black"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="ml-4 bg-[#db1600]">
                Search
              </Button>
            </div>
          </form>
          <div className="w-[530px] border border-[#e2e2e2] my-10"></div>
          <div className="font-bold text-xl text-[#2b2e35] mb-4">
            Create New user
          </div>
          <form onSubmit={handleSubmit(createUser)}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                  for="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  id="grid-first-name"
                  type="text"
                  name="firstName"
                  value={firstName}
                  readOnly
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                  for="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  id="grid-last-name"
                  type="text"
                  name="lastName"
                  value={lastName}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                  for="grid-email"
                >
                  Email Address
                </label>
                <input
                  className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                  id="grid-email"
                  type="email"
                  name="Email"
                  value={Email}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                  for="branch"
                >
                  Branch
                </label>
                <BranchInfo onForm={handleBranchInfo} />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                  for="branch"
                >
                  Role
                </label>
                <Select
                  options={options}
                  defaultValue={Role}
                  onChange={handleSelectChange}
                  isSearchable
                  //   isMulti
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full h-[49px] bg-[#db1600] rounded text-white font-semibold my-10"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewUser;
