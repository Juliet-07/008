import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDownloadExcel } from "react-export-table-to-excel";
import { AiOutlineDownload } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { ImDownload2 } from "react-icons/im";
import Modal from "../../components/Modal";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

const DudChequeReportCorp = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_DUDCHEQUE;
  const tableRef = useRef(null);
  const { handleSubmit } = useForm();
  const [corpDudCheque, setCorpDudCheque] = useState([]);
  const [rangeData, setRangeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [details, setDetails] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = corpDudCheque.slice(firstIndex, lastIndex);
  const npages = Math.ceil(corpDudCheque.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  const initialValues = {
    startDate: "",
    endDate: "",
    branchCode: "",
  };
  const [downloadInfo, setDownloadInfo] = useState(initialValues);
  const { startDate, endDate, branchCode } = downloadInfo;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDownloadInfo({ ...downloadInfo, [name]: value });
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

  const getCorpDudCheque1 = () => {
    const url = `${process.env.REACT_APP_DUDCHEQUE}/GetCorpDudCheque`;
    axios.get(url).then((response) => {
      console.log(response.data, "Corp DudCheque Report");
      const result = response.data.result;

      // Check if result is an array before applying reduce
      if (Array.isArray(result)) {
        const branchData = result.reduce((acc, record) => {
          const { Initiate_Branch } = record;
          const existingBranch = acc.find(
            (item) => item.Initiate_Branch === Initiate_Branch
          );

          if (existingBranch) {
            existingBranch.volume++;
          } else {
            acc.push({ Initiate_Branch, volume: 1 });
          }
          return acc;
        }, []); // Initialize as an empty array

        branchData.sort((a, b) =>
          a.Initiate_Branch.localeCompare(b.Initiate_Branch)
        );

        setCorpDudCheque(branchData);
      } else {
        console.error("Result is not an array:", result);
      }
    });
  };

  const getCorpDudCheque = () => {
    const url = `${apiURL}/GetCorpDudCheque`;
    axios.get(url).then((response) => {
      console.log(response.data, "Corp DudCheque Report");
      setCorpDudCheque(response.data.result);
    });
  };

  const getCorpDataByDateRange = () => {
    const url = `${apiURL}/GetCorpDudChequeWithDateRange`;
    axios.post(url, downloadInfo).then((response) => {
      console.log(response, "Get Data by time range");
      setRangeData(response.data.result);
      setButtonClicked(true);
    });
  };

  useEffect(() => {
    getCorpDudCheque();
  }, []);

  // export individual row to excel
  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DudChequeData");
    XLSX.writeFile(workbook, "DudChequeData.xlsx");
  };

  // export individual row to pdf
  const exportToPDF = (data) => {
    const doc = new jsPDF();
    let yPos = 10; // Initial Y position
    data.forEach((row) => {
      // Add data to the PDF, including hidden data
      doc.text(`Account Number: ${row.accountNo}`, 10, yPos);
      doc.text(`Cheque Number: ${row.chqNo}`, 10, yPos + 10);
      doc.text(`Amount: ${row.amount}`, 10, yPos + 20);
      // Add other hidden data fields here
      // Move to the next row
      yPos += 30;
      if (yPos >= 270) {
        doc.addPage(); // Start a new page if the content exceeds the page height
        yPos = 10; // Reset Y position
      }
    });
    // Save or download the PDF
    doc.save("DudChequeData.pdf");
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "DudCheque Report",
    sheet: "Corp Report",
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full rounded-lg bg-white p-4">
          {/* Download by range */}
          <div className="flex items-center justify-between">
            <form
              className="flex items-center"
              onSubmit={handleSubmit(getCorpDataByDateRange)}
            >
              <div className="flex flex-wrap -mx-3 mb-3">
                <div class="w-full md:w-1/3 px-3">
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
                <div className="w-full md:w-1/3 px-3">
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
                <div className="w-full md:w-1/3 px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="branch"
                  >
                    Branch Code
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded p-2 leading-tight focus:outline-none"
                    id="branch"
                    type="text"
                    name="branchCode"
                    value={branchCode}
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
            <div className="w-[1190px] flex flex-col items-center justify-center">
              <table className="table bg-white text-sm text-left text-black px-4 w-full">
                <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                  <th className="p-4">Account Number</th>
                  <th className="p-4">Cheque Number</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Initiator</th>
                  <th className="p-4">Date Initiated</th>
                  <th className="p-4">Approver</th>
                  <th className="p-4">Date Approved</th>
                  <th className="p-4">User Branch</th>
                  <th className="p-4"></th>
                  <th className="p-4"></th>
                  <th className="p-4 hidden">Account Name</th>
                  <th className="p-4 hidden">Account Branch</th>
                  <th className="p-4 hidden">MICR Number</th>
                  <th className="p-4 hidden">Issuer Number</th>
                  <th className="p-4 hidden">Issuer Name</th>
                  <th className="p-4 hidden">Account Currency</th>
                  <th className="p-4 hidden">Acount Open Date</th>
                  <th className="p-4 hidden">Cheque Issued Date</th>
                  <th className="p-4 hidden">Customer Number</th>
                  <th className="p-4 hidden">Payee</th>
                  <th className="p-4 hidden">Settled</th>
                  <th className="p-4 hidden">Settlement Date</th>
                  <th className="p-4 hidden">Sort Code</th>
                  <th className="p-4 hidden">Transaction Date</th>
                  <th className="p-4 hidden">Transaction Reference Number</th>
                </thead>
                <tbody>
                  {rangeData.length > 0 ? (
                    rangeData.map((dud) => {
                      return (
                        <tr>
                          <td className="p-4">{dud.accountNo}</td>
                          <td className="p-4">{dud.chqNo}</td>
                          <td className="p-4">
                            #{dud.amount.toLocaleString()}
                          </td>
                          <td className="p-4">{dud.Initiator_name}</td>
                          <td className="p-4">{dud.InitiatorDate}</td>
                          <td className="p-4">{dud.Approval_name}</td>
                          <td className="p-4">{dud.Approval_Date}</td>
                          <td className="p-4">{dud.Initiate_Branch}</td>
                          <td className="p-4 hidden">{dud.accountName}</td>
                          <td className="p-4 hidden">{dud.accountBranch}</td>
                          <td className="p-4 hidden">{dud.micrNo}</td>
                          <td className="p-4 hidden">{dud.issuerNo}</td>
                          <td className="p-4 hidden">{dud.issuerName}</td>
                          <td className="p-4 hidden">{dud.ac_Ccy}</td>
                          <td className="p-4 hidden">{dud.accountOpenDate}</td>
                          <td className="p-4 hidden">{dud.chq_iss_date}</td>
                          <td className="p-4 hidden">{dud.customerNo}</td>
                          <td className="p-4 hidden">{dud.payee}</td>
                          <td className="p-4 hidden">{dud.settled}</td>
                          <td className="p-4 hidden">{dud.settlmtDate}</td>
                          <td className="p-4 hidden">{dud.sortCode}</td>
                          <td className="p-4 hidden">{dud.trn_date}</td>
                          <td className="p-4 hidden">{dud.trnRefNo}</td>
                          <td className="p-4">
                            <div className=" flex items-center justify-center cursor-pointer">
                              <ImDownload2
                                className="mx-4"
                                color="green"
                                size={20}
                                onClick={() => {
                                  // Define a function to gather data for the current row
                                  const rowData = {
                                    accountNo: dud.accountNo,
                                    chqNo: dud.chqNo,
                                    amount: dud.amount,
                                    // Include all the hidden data fields here
                                  };

                                  // Call the export function with the data
                                  exportToExcel([rowData]);
                                }}
                              />

                              <ImDownload2
                                color="red"
                                size={20}
                                onClick={() => {
                                  // Define a function to gather data for the current row
                                  const rowData = {
                                    accountNo: dud.accountNo,
                                    chqNo: dud.chqNo,
                                    amount: dud.amount,
                                    // Include all the hidden data fields here
                                  };

                                  // Call the export function with the data
                                  exportToPDF([rowData]);
                                }}
                              />
                            </div>
                          </td>
                          <td className="p-4 flex items-center justify-center cursor-pointer">
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
                                All Details on this transaction
                              </div>
                              <div className="my-4">
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                  <div className="font-normal text-[#7b7878]">
                                    Account Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accountNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Account Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accountName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Account Branch:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accountBranch}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Cheque Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.chqNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Amount:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.amount}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    MICR Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.micrNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Issuer Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.issuerNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Issuer Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.issuerName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Account Currency:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.ac_Ccy}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Account Open Date:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accountOpenDate}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Cheque Issued Date:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.chq_iss_date}
                                    </span>
                                  </div>
                                </div>
                                <form>
                                  <div className="flex items-center justify-center mt-4">
                                    <button
                                      // onClick={(e) => {
                                      //   handleAuthorization(e, selectedRowData);
                                      // }}
                                      type="submit"
                                      className="w-[150px] h-10 p-2 text-white text-sm font-semibold rounded bg-red-600 hover:bg-red-300"
                                    >
                                      Download
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
                      No DudCheque Report!
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="w-[1190px] flex flex-col items-center justify-center">
              <table className="table bg-white text-sm text-left text-black px-4 w-full">
                <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                  <th className="p-4">Account Number</th>
                  <th className="p-4">Cheque Number</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Initiator</th>
                  <th className="p-4">Date Initiated</th>
                  <th className="p-4">Approver</th>
                  <th className="p-4">Date Approved</th>
                  <th className="p-4">User Branch</th>
                  <th className="p-4"></th>
                  <th className="p-4"></th>
                  <th className="p-4 hidden">Account Name</th>
                  <th className="p-4 hidden">Account Branch</th>
                  <th className="p-4 hidden">MICR Number</th>
                  <th className="p-4 hidden">Issuer Number</th>
                  <th className="p-4 hidden">Issuer Name</th>
                  <th className="p-4 hidden">Account Currency</th>
                  <th className="p-4 hidden">Acount Open Date</th>
                  <th className="p-4 hidden">Cheque Issued Date</th>
                  <th className="p-4 hidden">Customer Number</th>
                  <th className="p-4 hidden">Payee</th>
                  <th className="p-4 hidden">Settled</th>
                  <th className="p-4 hidden">Settlement Date</th>
                  <th className="p-4 hidden">Sort Code</th>
                  <th className="p-4 hidden">Transaction Date</th>
                  <th className="p-4 hidden">Transaction Reference Number</th>
                </thead>
                <tbody>
                  {records.length > 0 ? (
                    records.map((dud) => {
                      return (
                        <tr>
                          <td className="p-4">{dud.accountNo}</td>
                          <td className="p-4">{dud.chqNo}</td>
                          <td className="p-4">
                            #{dud.amount.toLocaleString()}
                          </td>
                          <td className="p-4">{dud.Initiator_name}</td>
                          <td className="p-4">{dud.InitiatorDate}</td>
                          <td className="p-4">{dud.Approval_name}</td>
                          <td className="p-4">{dud.Approval_Date}</td>
                          <td className="p-4">{dud.Initiate_Branch}</td>
                          <td className="p-4 hidden">{dud.accountName}</td>
                          <td className="p-4 hidden">{dud.accountBranch}</td>
                          <td className="p-4 hidden">{dud.micrNo}</td>
                          <td className="p-4 hidden">{dud.issuerNo}</td>
                          <td className="p-4 hidden">{dud.issuerName}</td>
                          <td className="p-4 hidden">{dud.ac_Ccy}</td>
                          <td className="p-4 hidden">{dud.accountOpenDate}</td>
                          <td className="p-4 hidden">{dud.chq_iss_date}</td>
                          <td className="p-4 hidden">{dud.customerNo}</td>
                          <td className="p-4 hidden">{dud.payee}</td>
                          <td className="p-4 hidden">{dud.settled}</td>
                          <td className="p-4 hidden">{dud.settlmtDate}</td>
                          <td className="p-4 hidden">{dud.sortCode}</td>
                          <td className="p-4 hidden">{dud.trn_date}</td>
                          <td className="p-4 hidden">{dud.trnRefNo}</td>
                          <td className="p-4">
                            <div className=" flex items-center justify-center cursor-pointer">
                              <ImDownload2
                                className="mx-4"
                                color="green"
                                size={20}
                                onClick={() => {
                                  // Define a function to gather data for the current row
                                  const rowData = {
                                    accountNo: dud.accountNo,
                                    chqNo: dud.chqNo,
                                    amount: dud.amount,
                                    // Include all the hidden data fields here
                                  };

                                  // Call the export function with the data
                                  exportToExcel([rowData]);
                                }}
                              />

                              <ImDownload2
                                color="red"
                                size={20}
                                onClick={() => {
                                  // Define a function to gather data for the current row
                                  const rowData = {
                                    accountNo: dud.accountNo,
                                    chqNo: dud.chqNo,
                                    amount: dud.amount,
                                    // Include all the hidden data fields here
                                  };

                                  // Call the export function with the data
                                  exportToPDF([rowData]);
                                }}
                              />
                            </div>
                          </td>
                          <td className="p-4 flex items-center justify-center cursor-pointer">
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
                                All Details on this transaction
                              </div>
                              <div className="my-4">
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                  <div className="font-normal text-[#7b7878]">
                                    Account Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accountNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Account Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accountName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Account Branch:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accountBranch}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Cheque Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.chqNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Amount:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.amount}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    MICR Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.micrNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Issuer Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.issuerNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Issuer Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.issuerName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Account Currency:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.ac_Ccy}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Account Open Date:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accountOpenDate}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Cheque Issued Date:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.chq_iss_date}
                                    </span>
                                  </div>
                                </div>
                                <form>
                                  {/* <div>
                                  <input
                                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                                    placeholder="Comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  />
                                </div> */}
                                  <div className="flex items-center justify-center mt-4">
                                    {/* <button
                                    onClick={(e) => {
                                      handleAuthorization(e, selectedRowData);
                                    }}
                                    type="submit"
                                    className="w-[150px] h-10 p-2 text-white text-sm font-semibold bg-green-600 rounded mr-4 hover:bg-green-300"
                                  >
                                    Approve
                                  </button> */}
                                    <button
                                      // onClick={(e) => {
                                      //   handleAuthorization(e, selectedRowData);
                                      // }}
                                      type="submit"
                                      className="w-[150px] h-10 p-2 text-white text-sm font-semibold rounded bg-red-600 hover:bg-red-300"
                                    >
                                      Download
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
                    <li key={i} className="text-lg p-2">
                      <a href="#" onClick={() => changeCurrentPage(npages)}>
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

export default DudChequeReportCorp;
