import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineDownload } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { ImDownload2 } from "react-icons/im";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { useDownloadExcel } from "react-export-table-to-excel";
import { useForm } from "react-hook-form";

const CounterfeitNoteApprovedData = () => {
  const { handleSubmit } = useForm();
  const apiURL = import.meta.env.VITE_REACT_APP_DUDCHEQUE;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const tableRef = useRef(null);
  const [pendingTransaction, setPendingTransaction] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [details, setDetails] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [rangeData, setRangeData] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = pendingTransaction.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pendingTransaction.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const initialValues = {
    startDate: "",
    endDate: "",
  };
  const [downloadInfo, setDownloadInfo] = useState(initialValues);
  const { startDate, endDate } = downloadInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDownloadInfo({ ...downloadInfo, [name]: value });
  };

  const getUserInfo = () => {
    const url = `${apiURL}/GetUserInfor?UserID=${user.givenname}`;
    axios.get(url).then(async (response) => {
      const data = response.data.result;
      console.log({ data }, "user info");
      setUserInfo(data);
      const { branchCode } = data;
      if (branchCode) await getApprovedTransaction(branchCode);
    });
  };

  const getApprovedTransaction = (branchCode) => {
    const url = `${apiURL}/GetCounterfeitNoteApprovedTransaction?BranchCode=${branchCode}`;
    axios.get(url).then((response) => {
      console.log(response.data, "Approved Transaction");
      setPendingTransaction(response.data.result);
    });
  };

  const getApprovedDataByDateRange = () => {
    const url = `${apiURL}/GetCounterfeitNoteApprovedTransactionByDateRange`;
    axios.post(url, downloadInfo).then((response) => {
      console.log(response, "Get Data by time range");
      setRangeData(response.data.result);
      setButtonClicked(true);
    });
  };
  useEffect(() => {
    getUserInfo();
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

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DudChequeData");
    XLSX.writeFile(workbook, "DudChequeData.xlsx");
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "CounterfeitNote Report",
    sheet: "CounterfeitNote Sheet 1",
  });
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="font-bold text-2xl uppercase mb-2">
          approved counterfeit note transaction
        </div>
        <div className="w-full rounded-lg bg-white p-4 max-w-full overflow-x-auto">
          <div className="flex items-center justify-between">
            <form
              className="flex items-center"
              onSubmit={handleSubmit(getApprovedDataByDateRange)}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div class="w-full md:w-1/2 px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="start-date"
                  >
                    Start Date
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded p-2  leading-tight focus:outline-none"
                    id="start-date"
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="end-date"
                  >
                    End Date
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded p-2 leading-tight focus:outline-none"
                    id="end-date"
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center cursor-pointer w-20 h-10 bg-[#db1600] text-white font-semibold rounded mx-3 mt-2"
              >
                Submit
              </button>
            </form>
            <div
              onClick={onDownload}
              className="flex items-center cursor-pointer w-[100px] h-10 bg-green-600 text-white font-semibold rounded p-2"
            >
              <AiOutlineDownload size={20} />
              <span className="pl-2"> as .xlsx</span>
            </div>
          </div>
          {buttonClicked ? (
            <>
              <div className="my-4 font-semibold text-xl underline">
                Results From Search
              </div>
              <div className="flex flex-col items-center justify-center">
                <table
                  ref={tableRef}
                  className="table bg-white text-sm text-left text-black px-4 w-full"
                >
                  <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                    <th className="p-4">Account Branch</th>
                    <th className="p-4">Currency Number</th>
                    <th className="p-4">Denomination</th>
                    <th className="p-4">Initiator</th>
                    <th className="p-4">Date Initiated</th>
                    <th className="p-4">Approved Date</th>
                    <th className="p-4"></th>
                    <th className="p-4"></th>
                  </thead>
                  <tbody>
                    {rangeData.length > 0 ? (
                      rangeData.map((note, index) => {
                        return (
                          <tr>
                            <td className="p-4">{note.BRANCHNAME}</td>
                            <td className="p-4">{note.CURRENCYNUMBER}</td>
                            <td className="p-4">{note.DENOMINATION}</td>
                            <td className="p-4">{note.INITIATOR_BY}</td>
                            <td className="p-4">{note.INITIATOR_DATE}</td>
                            <td className="p-4">{note.APPROVE_DATE}</td>
                            <td className="p-4">
                              <div className="flex items-center cursor-pointer">
                                <ImDownload2
                                  className="mx-4"
                                  color="green"
                                  size={20}
                                  onClick={() => {
                                    // Define a function to gather data for the current row
                                    const rowData = {
                                      BRANCHNAME: note.BRANCHNAME,
                                      CURRENCYNUMBER: note.CURRENCYNUMBER,
                                      DENOMINATION: note.DENOMINATION,
                                      INITIATOR_BY: note.INITIATOR_BY,
                                      INITIATOR_BRANCH: note.INITIATOR_BRANCH,
                                      INITIATOR_DATE: note.INITIATOR_DATE,
                                      APPROVED_BY: note.APPROVED_BY,
                                      APPROVE_DATE: note.APPROVE_DATE,
                                    };

                                    // Call the export function with the data
                                    exportToExcel([rowData]);
                                  }}
                                />
                              </div>
                            </td>
                            {/* <td className="p-4 flex items-center justify-center cursor-pointer">
                          <BiDotsVertical
                            onClick={() => {
                              setSelectedRowData(dud);
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
                              CounterfeitNote Information
                            </div>
                            <div className="my-4">
                              <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="font-normal text-[#7b7878]">
                                  Account Name:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.AccountName}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Account Number:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.AccountNumber}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal> */}
                          </tr>
                        );
                      })
                    ) : (
                      <div className="flex items-center justify-center text-xl font-semibold">
                        No DudCheque Report!
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
                      <li key={i} className="p-2">
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
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <table
                ref={tableRef}
                className="table bg-white text-sm text-left text-black px-4 w-full"
              >
                <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                  <th className="p-4">Account Branch</th>
                  <th className="p-4">Currency Number</th>
                  <th className="p-4">Denomination</th>
                  <th className="p-4">Initiator</th>
                  <th className="p-4">Date Initiated</th>
                  <th className="p-4">Approved Date</th>
                  <th className="p-4"></th>
                  <th className="p-4"></th>
                </thead>
                <tbody>
                  {records.length > 0 ? (
                    records.map((note, index) => {
                      return (
                        <tr>
                          <td className="p-4">{note.BRANCHNAME}</td>
                          <td className="p-4">{note.CURRENCYNUMBER}</td>
                          <td className="p-4">{note.DENOMINATION}</td>
                          <td className="p-4">{note.INITIATOR_BY}</td>
                          <td className="p-4">{note.INITIATOR_DATE}</td>
                          <td className="p-4">{note.APPROVE_DATE}</td>
                          <td className="p-4">
                            <div className="flex items-center cursor-pointer">
                              <ImDownload2
                                className="mx-4"
                                color="green"
                                size={20}
                                onClick={() => {
                                  // Define a function to gather data for the current row
                                  const rowData = {
                                    BRANCHNAME: note.BRANCHNAME,
                                    CURRENCYNUMBER: note.CURRENCYNUMBER,
                                    DENOMINATION: note.DENOMINATION,
                                    INITIATOR_BY: note.INITIATOR_BY,
                                    INITIATOR_BRANCH: note.INITIATOR_BRANCH,
                                    INITIATOR_DATE: note.INITIATOR_DATE,
                                    APPROVED_BY: note.APPROVED_BY,
                                    APPROVE_DATE: note.APPROVE_DATE,
                                  };

                                  // Call the export function with the data
                                  exportToExcel([rowData]);
                                }}
                              />
                            </div>
                          </td>
                          {/* <td className="p-4 flex items-center justify-center cursor-pointer">
                          <BiDotsVertical
                            onClick={() => {
                              setSelectedRowData(dud);
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
                              CounterfeitNote Information
                            </div>
                            <div className="my-4">
                              <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="font-normal text-[#7b7878]">
                                  Account Name:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.AccountName}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Account Number:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.AccountNumber}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal> */}
                        </tr>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center text-xl font-semibold">
                      No DudCheque Report!
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
                    <li key={i} className="p-2">
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
          )}
        </div>
      </div>
    </>
  );
};

export default CounterfeitNoteApprovedData;
