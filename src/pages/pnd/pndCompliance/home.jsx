import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Label from "../../../assets/cardLabel.png";
import DataTable from "react-data-table-component";
import InfoCard from "../../../components/InfoCard";

const column = [
  // { name: "S/N", selector: (row) => row.id },
  { name: "Initiator", selector: (row) => row.relationship_manager },
  { name: "Branch", selector: (row) => row.branch },
  { name: "Acount Name", selector: (row) => row.account_name },
  { name: "Account Number", selector: (row) => row.account_number },
  { name: "Account Type", selector: (row) => row.customerType },
  {
    name: "Status",
    selector: (row) => row.status,
  },
];

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#2b2e35",
      color: "white",
      borderRadius: 8,
    },
  },
  headCells: {
    style: {
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
      // backgroundColor: "#eff4ff",
      borderRadius: 8,
    },
  },
};
const Compliance = () => {
  const [pnds, setPnds] = useState([]);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const _token = JSON.parse(localStorage.getItem("pndUser"));
  let token = _token.token;
  const base_url = import.meta.env.VITE_REACT_APP_PND;
  useEffect(() => {
    const getAllPNDs = () => {
      axios
        .get(`${base_url}PndAccount/GetAllPNDs`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data, "PNDs");
          setPnds(response.data.data);
        });
    };
    const getAllUsers = () => {
      axios
        .get("http://192.168.207.8:2035/api/User/GetAllUsers", {
          headers: {
            ApiKey:
              "hJmEeNA3ktOQAYxqr9sy8vvCihsjtyCvwHNSzV8M0hQLyCiMsYuZJs28tIyB7WMr1BMWEqCRIRuqSYoGIR2hQZ0YzPU0BoBYhwlvmS372x3TFET9P21El4CZZagRhZCVy1x71WOtsXzu6Sq4ITSGhcDTdiETFPR1as1ZSk9v8hfzw9dzxC5LUwKsCcq8ejE0JlCt34eMeoRWYXW8KADLjAvifLhxXhPJO1t1jXVCXICbbR7G8UQMzpnU2fROHBiw",
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data, "users");
          setUsers(response.data.data);
        });
    };
    getAllPNDs();
    getAllUsers();
  }, []);

  const data = [
    {
      title: "All PND",
      count: pnds.length,
      // Icon: BsPeople,
      // stat: 23,
    },
    {
      title: "Total Users",
      count: users.length,
      // Icon: BsPeople,
      // stat: 23,
    },
    {
      title: "Active Users",
      count: users.length,
      // Icon: BsPeople,
      // stat: 23,
    },
  ];
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        {/* summary cards */}
        <div className="flex gap-4 my-6">
          {data.map((info) => {
            const { title, count } = info;
            return (
              <div key={title}>
                <InfoCard
                  title={title}
                  count={count}
                  // icon={<Icon />}
                  // stat={stat}
                />
              </div>
            );
          })}
        </div>
        {/* table */}
        <div className="w-[1155px] h-full bg-white rounded-md p-4">
          <div className="text-2xl font-bold text-[#2b2e35] mb-4 mx-6">
            All PND
          </div>
          <div className="mx-6">
            <DataTable
              columns={column}
              data={pnds}
              customStyles={customStyles}
              pagination
            ></DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compliance;
