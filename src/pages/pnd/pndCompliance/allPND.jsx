import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import DataTable from "react-data-table-component";

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

const AllPND = () => {
  const [pnds, setPnds] = useState([]);
  useEffect(() => {
    const getAllPND = () => {
      axios
        .get(
          "http://192.168.207.8:2035/api/PndAccount/GetAllPNDs",
          {
            headers: {
              ApiKey:
                "hJmEeNA3ktOQAYxqr9sy8vvCihsjtyCvwHNSzV8M0hQLyCiMsYuZJs28tIyB7WMr1BMWEqCRIRuqSYoGIR2hQZ0YzPU0BoBYhwlvmS372x3TFET9P21El4CZZagRhZCVy1x71WOtsXzu6Sq4ITSGhcDTdiETFPR1as1ZSk9v8hfzw9dzxC5LUwKsCcq8ejE0JlCt34eMeoRWYXW8KADLjAvifLhxXhPJO1t1jXVCXICbbR7G8UQMzpnU2fROHBiw",
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
        .then((response) => {
          console.log(response.data, "PNDs");
          setPnds(response.data.data);
        });
    };
    getAllPND();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center m-4">
        <div className="w-[1240px] rounded-md bg-white flex flex-col p-4">
          <div className="text-2xl font-bold text-[#2b2e35] my-6 mx-6">
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

export default AllPND;
