import React, { useState } from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { Input, Button, Textarea } from "@material-tailwind/react";

const BulkPND = () => {
  const { handleSubmit } = useForm();
  const [file, setFile] = useState({});
  const [bulkData, setBulkData] = useState([]);
  const [userEmail, setUserEmail] = useState(
    "compliance1@Premiumtrustbank.com"
  );
  const [reason, setReason] = useState("");

  const uploadHandler = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    console.log(file, "file");
    setFile(file);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("bulkFormFile", file);
    formData.append("userEmail", userEmail);
    try {
      fetch("http://192.168.207.8:2035/api/BulkPND/UploadBulkAcc", {
        method: "POST",
        body: formData,
        headers: {
          ApiKey:
            "hJmEeNA3ktOQAYxqr9sy8vvCihsjtyCvwHNSzV8M0hQLyCiMsYuZJs28tIyB7WMr1BMWEqCRIRuqSYoGIR2hQZ0YzPU0BoBYhwlvmS372x3TFET9P21El4CZZagRhZCVy1x71WOtsXzu6Sq4ITSGhcDTdiETFPR1as1ZSk9v8hfzw9dzxC5LUwKsCcq8ejE0JlCt34eMeoRWYXW8KADLjAvifLhxXhPJO1t1jXVCXICbbR7G8UQMzpnU2fROHBiw",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response, "bulk PND");
          alert(response.message);
          setBulkData(response.data);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleBulkPNDUpload = () => {
    let payload = {
      BulkAccounts: bulkData,
      reason: reason,
      userEmail: userEmail,
    };
    try {
      fetch("http://192.168.207.8:2035/api/BulkPND/bulkpndAll", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          ApiKey:
            "hJmEeNA3ktOQAYxqr9sy8vvCihsjtyCvwHNSzV8M0hQLyCiMsYuZJs28tIyB7WMr1BMWEqCRIRuqSYoGIR2hQZ0YzPU0BoBYhwlvmS372x3TFET9P21El4CZZagRhZCVy1x71WOtsXzu6Sq4ITSGhcDTdiETFPR1as1ZSk9v8hfzw9dzxC5LUwKsCcq8ejE0JlCt34eMeoRWYXW8KADLjAvifLhxXhPJO1t1jXVCXICbbR7G8UQMzpnU2fROHBiw",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response, "bulk PND");
          alert(response.message);
        });
    } catch (err) {
      console.log(err.message);
    }
    // console.log("form info");
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center my-10">
        <form onSubmit={handleSubmit(handleFileUpload)}>
          <div className="flex items-center justify-center w-[500px]">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-red-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  TXT (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                name="file"
                onChange={uploadHandler}
              />
            </label>
          </div>
          <Button type="submit" className="mt-2 bg-[#db1600]">
            upload
          </Button>
        </form>
        {/* bulk form */}
        <div className="flex flex-col items-center justify-center mt-10">
          <form onSubmit={handleSubmit(handleBulkPNDUpload)}>
            <table className="table bg-white text-sm text-left text-black px-4">
              <thead className="bg-[#db1600] text-sm text-white font-semibold">
                <tr>
                  <th className="p-4">Account Name</th>
                  <th className="p-4">Account Number</th>
                  <th className="p-4">Account Type</th>
                  <th className="p-4">Account Status</th>
                </tr>
              </thead>
              <tbody className="bg-[#eff4ef]">
                {bulkData.length > 0 ? (
                  bulkData.map((bulk) => {
                    return (
                      <tr>
                        <td className="p-4">{bulk.custName}</td>
                        <td className="p-4">{bulk.custNumber}</td>
                        <td className="p-4">{bulk.customerType}</td>
                        <td className="p-4">{bulk.accountStatus}</td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center text-xl font-semibold p-4 bg-white">
                    No Data!
                  </div>
                )}
              </tbody>
            </table>
            <div className="flex flex-col items-center justify-center">
              <Textarea
                label="Reason"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <Button className="mt-4 bg-red-600" fullWidth type="submit">
                Upload BulkPND
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BulkPND;
