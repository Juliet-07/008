import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDownloadExcel } from "react-export-table-to-excel";
import { AiOutlineDownload } from "react-icons/ai";
import { BiDotsVertical, BiRightArrow, BiDownArrow } from "react-icons/bi";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";

const CounterfeitNoteReport = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_DUDCHEQUE;
  const tableRef = useRef(null);
  const { handleSubmit } = useForm();
  const [branches, setBranches] = useState([]);
  const [rangeData, setRangeData] = useState([]);
  const [showBranchType, setShowBranchType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [buttonClicked, setButtonClicked] = useState(false);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = branches.slice(firstIndex, lastIndex);
  const npages = Math.ceil(branches.length / recordsPerPage);
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

  const getCounterfeitNote = () => {
    const url = `${apiURL}/GetCounterfeitNote`;
    axios.get(url).then((response) => {
      console.log(response.data, "CounterfeitNote Report");
      let branches = response.data.result.branch;
      setBranches(branches);
      setShowBranchType(
        new Array(response.data.result.branch.length).fill(false)
      );
    });
  };

  const getCounterfeitNoteDataByDateRange = () => {
    const url = `${apiURL}/GetCounterfeitNoteByDateRange`;
    axios.post(url, downloadInfo).then((response) => {
      console.log(response, "Get Data by time range");
      setRangeData(response.data.result);
      setButtonClicked(true);
    });
  };

  useEffect(() => {
    getCounterfeitNote();
  }, []);

  const toggleBranchType = (index) => {
    const updatedShowBranchTypes = [...showBranchType];
    updatedShowBranchTypes[index] = !updatedShowBranchTypes[index];
    setShowBranchType(updatedShowBranchTypes);
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

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "CounterfeitNote Report",
    sheet: "All Report",
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-2xl uppercase my-4">
          counterfeitNote report
        </div>
        {/* individual accounts */}
        <div className="w-[1080px] 2xl:w-[1200px] rounded-lg bg-white p-4">
          <div className="flex items-end justify-between">
            <form
              className="flex items-center"
              onSubmit={handleSubmit(getCounterfeitNoteDataByDateRange)}
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
              className="flex items-center justify-center cursor-pointer w-[150px] h-[45px] bg-green-600 text-white font-semibold rounded mb-3"
              onClick={onDownload}
            >
              <AiOutlineDownload size={20} />
              <span>Export as .xlsx</span>
            </div>
          </div>

          {buttonClicked ? (
            <div className="w-[1080px] 2xl:w-[1190px] flex flex-col items-center justify-center">
              <table
                ref={tableRef}
                className="table bg-white text-sm text-left text-black px-4 w-full"
              >
                <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                  <th className="p-4">Denomination</th>
                  <th className="p-4">Currency Number</th>
                  <th className="p-4">Initiator</th>
                  <th className="p-4">Date Initiated</th>
                  <th className="p-4">Approver</th>
                  <th className="p-4">Date Approved</th>
                  <th className="p-4">User Branch</th>
                  <th className="p-4"></th>
                  <th className="p-4"></th>
                </thead>
                <tbody>
                  {rangeData.length > 0 ? (
                    rangeData.map((note) => {
                      return (
                        <tr>
                          <td className="p-4">{note.DENOMINATION}</td>
                          <td className="p-4">{note.CURRENCYNUMBER}</td>
                          <td className="p-4">{note.INITIATOR_BY}</td>
                          <td className="p-4">{note.INITIATOR_DATE}</td>
                          <td className="p-4">{note.APPROVED_BY}</td>
                          <td className="p-4">{note.APPROVE_DATE}</td>
                          <td className="p-4 flex items-center justify-center">
                            {note.BRANCH}
                          </td>

                          {/* <td className="p-4">
                            <div className=" flex items-center justify-center cursor-pointer">
                              <ImDownload2
                                className="mx-4"
                                color="green"
                                size={20}
                                onClick={() => {
                                  
                                  const rowData = {
                                    AccountNumber: note.accountNo,
                                    AccountName: note.accountName,
                                    AccountBranch: note.accountBranch,
                                    AccountOpenDate: note.accountOpenDate,
                                    AccountCurrency: note.ac_Ccy,
                                    Amount: note.amount,
                                    CustomerNumber: note.customerNo,
                                    
                                    
                                  };

                                  
                                  exportToExcel([rowData]);
                                }}
                              />

                              <ImDownload2
                                color="red"
                                size={20}
                                onClick={() => {
                                  
                                  const rowData = {
                                    accountNo: note.accountNo,
                                    accountName: note.accountName,
                                    accountBranch: note.accountBranch,
                                    accountOpenDate: note.accountOpenDate,
                                    ac_Ccy: note.ac_Ccy,
                                    amount: note.amount,
                                    customerNo: note.customerNo,
                        
                                    
                                  };

                                 
                                  exportToPDF([rowData]);
                                }}
                              />
                            </div>
                          </td> */}
                          {/* <td className="p-4 flex items-center justify-center cursor-pointer">
                            <BiDotsVertical
                              onClick={() => {
                                setSelectedRowData(note);
                                return setDetails(true);
                              }}
                            />
                          </td>
                          <Modal
                            isVisible={details}
                            onClose={() => setDetails(false)}
                          >
                            <div className="flex flex-col w-[900px] px-4">
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
                                    Account Open Date:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.accountOpenDate}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Account Currency:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.ac_Ccy}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Amount:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.amount}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Cheque Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.chqNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Cheque Issued Date:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.chq_iss_date}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    MICR Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.micrNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Issuer Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.issuerName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Issuer Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.issuerNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Transaction Date:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.trn_date}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Transaction Date:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.trn_date}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Transaction Reference Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.trnRefNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Payee:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.payee}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Settled:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.settled}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Settlement Date:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.settlmtDate}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Sort Code:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.sortCode}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Email:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.Email}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Business Category:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.busCategory}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Business Corporation Type:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.busCorpType}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Business Identification Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.busIdNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Business Name
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.busName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Date Of Incorporation:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.dateOfIncorp}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Business Office Address Line 1:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.busOfficeAddressLine1}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Business Office Address Line 2:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.busOfficeAddressLine2}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Tax Identification:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.taxID}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    City:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.city}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    State:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.state}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Country:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.country}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Secondary Address City:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.secAddressCity}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Secondary Address State:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.secAddressState}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Secondary Address Country:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.secAddressCountry}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Secondary Phone Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.secPhone}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Secondary Address Line 1:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.secAddressLine1}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Secondary Address Line 2:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.secAddressLine2}
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
                      No noteCheque Report!
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <table
                ref={tableRef}
                className="table bg-white text-sm text-left text-black px-4 w-full"
              >
                <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                  <th className="p-4">Branch</th>
                  <th className="p-4">Volume</th>
                  {/* <th className="p-4">Action</th> */}
                </thead>
                <tbody>
                  {records.length > 0 ? (
                    branches.map((branch, index) => {
                      return (
                        <tr key={branch.branchcode}>
                          <td className="p-4 flex items-center">
                            {branch.branchname}
                            <span
                              className="ml-2 cursor-pointer"
                              onClick={() => toggleBranchType(index)}
                            >
                              {showBranchType[index] ? (
                                <BiDownArrow />
                              ) : (
                                <BiRightArrow />
                              )}
                            </span>
                          </td>
                          <td className="p-4">
                            {showBranchType[index] ? (
                              <table className="table bg-white text-sm text-left text-black px-4 w-full">
                                <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                                  <th className="p-4">Denomination</th>
                                  <th className="p-4">Currency Number</th>
                                  <th className="p-4">Initiator</th>
                                  <th className="p-4">Date Initiated</th>
                                  <th className="p-4">Approver</th>
                                  <th className="p-4">Date Approved</th>
                                  <th>
                                    <div
                                      className="flex items-center justify-center cursor-pointer w-20 h-10 bg-[#db1600] text-white rounded"
                                      onClick={onDownload}
                                    >
                                      <AiOutlineDownload size={20} />
                                      <span className="pl-2"> as .xlsx</span>
                                    </div>
                                  </th>
                                </thead>
                                <tbody>
                                  {branch.branchtype.map((branchType) => (
                                    <tr key={branchType.id}>
                                      {/* <td>{branchType.branchcode}</td> */}
                                      <td className="p-2">
                                        {branchType.denomination}
                                      </td>{" "}
                                      <td className="p-2">
                                        {" "}
                                        {branchType.currencynumber}
                                      </td>{" "}
                                      <td className="p-2">
                                        {branchType.initiatoR_BY}
                                      </td>{" "}
                                      <td className="p-2">
                                        {branchType.initiatoR_DATE}
                                      </td>{" "}
                                      <td className="p-2">
                                        {branchType.approveD_BY}
                                      </td>{" "}
                                      <td className="p-2">
                                        {branchType.approvE_DATE}
                                      </td>{" "}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <p className="p-4">{branch.branchtype.length}</p>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div className="flex items-center justify-center text-xl font-semibold">
                      No CounterfeitNote Report!
                    </div>
                  )}
                </tbody>
                {/* <tbody>
                {records.length > 0 ? (
                  records.map((note) => {
                    return (
                      <tr>
                        <td className="p-4">{note.BRANCH}</td>
                        <td className="p-4">{note.DENOMINATION}</td>
                        <td className="p-4">
                          <BiDotsVertical size={20} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center text-xl font-semibold">
                    No CounterfeitNote Report!
                  </div>
                )}
              </tbody> */}
              </table>
              <nav>
                <ul className="flex flex-row items-center">
                  <li>
                    <MdSkipPrevious
                      size={30}
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
                      size={30}
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

export default CounterfeitNoteReport;
