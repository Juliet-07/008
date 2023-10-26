import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const BranchInfo = ({ onForm }) => {
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [Branches, setBranches] = useState([]);

  //   handle input change event
  const handleInputChange = (value) => {
    // onMessage(value);
    setValue(value);
  };
  //   handle selection
  const handleChange = (value) => {
    console.log(value, "values");
    onForm(value);
    setSelectedValue(value);
  };
  useEffect(() => {
    let info;
    let branches;
    const getBranches = () => {
      axios
        .get("http://192.168.207.18:8077/api/Branches/GetBranches")
        .then((response) => {
          console.log(response.data.data, "branches");
          info = response.data.data;
          branches = info.map((branch) => {
            return { value: branch.branchCode, label: branch.branchName };
          });
          setBranches(branches);
          console.log(branches, "branches");
        });
    };
    // return info;
    getBranches();
  }, []);
  return (
    <div className="w-full">
      <Select
        options={Branches}
        defaultValue={selectedValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isSearchable
      />
    </div>
  );
};

export default BranchInfo;
