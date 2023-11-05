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

const DudChequeReportIndv = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_DUDCHEQUE;
  const tableRef = useRef(null);
  const { handleSubmit } = useForm();
  const [indvDudCheque, setIndvDudCheque] = useState([]);
  const [rangeData, setRangeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [details, setDetails] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = indvDudCheque.slice(firstIndex, lastIndex);
  const npages = Math.ceil(indvDudCheque.length / recordsPerPage);
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

  const getIndvDudCheque = () => {
    const url = `${apiURL}/GetIndvDudCheque`;
    axios.get(url).then((response) => {
      console.log(response.data, "Indv DudCheque Report");
      setIndvDudCheque(response.data.result);
    });
  };

  //   const getIndvDudCheque1 = () => {
  //     const url = `${process.env.REACT_APP_DUDCHEQUE}/GetIndvDudCheque`;
  //     axios.get(url).then((response) => {
  //       console.log(response.data, "Indv DudCheque Report");
  //       const result = response.data.result;

  //       // Check if result is an array before applying reduce
  //       if (Array.isArray(result)) {
  //         const branchData = result.reduce((acc, record) => {
  //           const { initiate_Branch } = record;
  //           const existingBranch = acc.find(
  //             (item) => item.initiate_Branch === initiate_Branch
  //           );

  //           if (existingBranch) {
  //             existingBranch.volume++;
  //           } else {
  //             acc.push({ initiate_Branch, volume: 1 });
  //           }
  //           return acc;
  //         }, []); // Initialize as an empty array

  //         branchData.sort((a, b) =>
  //           a.initiate_Branch.localeCompare(b.initiate_Branch)
  //         );

  //         setIndvDudCheque(branchData);
  //       } else {
  //         console.error("Result is not an array:", result);
  //       }
  //     });
  //   };

  const getIndvDataByDateRange = () => {
    const url = `${apiURL}/GetIndvDudChequeByDataRange`;
    axios.post(url, downloadInfo).then((response) => {
      console.log(response, "Get Data by time range");
      setRangeData(response.data.result);
      setButtonClicked(true);
    });
  };

  useEffect(() => {
    getIndvDudCheque();
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
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(10);
    const columnWidth = 60;
    let xPos = 10;
    let yPos = 10; // Initial Y position
    data.forEach((row) => {
      // Add data to the PDF, including hidden data
      doc.text(`Account Name: ${row.accountName}`, xPos, yPos + 10);
      doc.text(`Account Number: ${row.accountNo}`, xPos, yPos);
      doc.text(`Account Branch: ${row.accountBranch}`, xPos, yPos + 20);
      doc.text(`Account Open Date: ${row.accountOpenDate}`, xPos, yPos + 30);
      doc.text(`Account Currency: ${row.ac_Ccy}`, xPos, yPos + 40);
      doc.text(`Amount: ${row.amount}`, xPos, yPos + 50);
      doc.text(`Customer Number: ${row.customerID}`, xPos, yPos + 60);
      doc.text(`Cheque Number: ${row.chqNo}`, xPos, yPos + 70);
      doc.text(`Cheque Issued Date: ${row.chq_iss_date}`, xPos, yPos + 80);
      doc.text(`MICR Number: ${row.micrNo}`, xPos, yPos + 90);
      doc.text(`Issuer Name: ${row.issuerName}`, xPos, yPos + 100);
      doc.text(`Issuer Number: ${row.issuerNo}`, xPos, yPos + 110);
      doc.text(`Transaction Date: ${row.trn_date}`, xPos, yPos + 120);
      doc.text(
        `Transaction Reference Number: ${row.trnRefNo}`,
        xPos,
        yPos + 130
      );
      doc.text(`Payee: ${row.payee}`, xPos, yPos + 140);
      doc.text(`Settled: ${row.settled}`, xPos, yPos + 150);
      doc.text(`Settlement Date: ${row.settlmtDate}`, xPos, yPos + 160);
      doc.text(`Sort Code: ${row.sortCode}`, xPos, yPos + 170);
      doc.text(`Initiator:${row.initiator_name}`, xPos, yPos + 180);
      doc.text(`Date Initiated:${row.initiatorDate}`, xPos, yPos + 190);
      doc.text(`Approver:${row.approval_name}`, xPos, yPos + 200);
      doc.text(`Date Approved:${row.approval_Date}`, xPos, yPos + 210);
      doc.text(`User Branch:${row.initiate_Branch}`, xPos, yPos + 220);
      doc.text(`First Name:${row.firstName}`, xPos, yPos + 230);
      doc.text(`Last Name:${row.surname}`, xPos, yPos + 240);
      doc.text(`Middle Name:${row.middleName}`, xPos, yPos + 250);
      doc.text(`Date Of Birth:${row.dateOfBirth}`, xPos, yPos + 260);
      doc.text(`Gender:${row.gender}`, xPos, yPos + 270);
      doc.text(`Phone Number:${row.mobile}`, xPos, yPos + 280);
      doc.text(`Marital Status:${row.maritalStatus}`, xPos, yPos + 290);
      doc.text(`Nationality:${row.nationality}`, xPos, yPos + 300);
      doc.text(`Employment Status:${row.employmentStatus}`, xPos, yPos + 310);
      doc.text(`Occupation:${row.occupation}`, xPos, yPos + 320);
      doc.text(`BVN:${row.bvn}`, xPos, yPos + 330);
      doc.text(
        `Identification Type:${row.identificationType}`,
        xPos,
        yPos + 340
      );
      doc.text(
        `Identification Number:${row.identificationNumber}`,
        xPos,
        yPos + 350
      );
      doc.text(`Business Sector:${row.busSector}`, xPos, yPos + 360);
      doc.text(`Borrower Type:${row.borrowerType}`, xPos, yPos + 370);
      doc.text(
        `Primary Address Line 1:${row.priAddressLine1}`,
        xPos,
        yPos + 380
      );
      doc.text(
        `Primary Address Line 2:${row.priAddressLine2}`,
        xPos,
        yPos + 390
      );
      doc.text(`Primary City:${row.priCity}`, xPos, yPos + 400);
      doc.text(`Primary State:${row.priState}`, xPos, yPos + 410);
      doc.text(`Primary Country:${row.priCountry}`, xPos, yPos + 420);
      // Add other hidden data fields here
      // Move to the next row
      xPos += columnWidth;
      // yPos += 30;

      if ((xPos, yPos >= 270)) {
        doc.addPage(); // Start a new page if the content exceeds the page height
        xPos = 10;
        yPos = 10; // Reset Y position
      }

      // if (xPos >= 200) {
      //   xPos = 10; // Reset X position
      //   yPos += 60; // Adjust Y position to start a new row
      // }
    });
    // Save or download the PDF
    doc.save("DudChequeData.pdf");
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "DudCheque Report",
    sheet: "Indv Report",
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full rounded-lg p-4">
          {/* Download by range */}
          <div className="flex items-center justify-between">
            <form
              className="flex items-center"
              onSubmit={handleSubmit(getIndvDataByDateRange)}
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
            <div className="w-[1080px] 2xl:w-[1190px] flex flex-col items-center justify-center">
              <table
                ref={tableRef}
                className="table bg-white text-sm text-left text-black px-4 w-full"
              >
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
                  <th className="p-4 hidden">First Name</th>
                  <th className="p-4 hidden">Middle Name</th>
                  <th className="p-4 hidden">Last Name</th>
                  <th className="p-4 hidden">Date Of Birth</th>
                  <th className="p-4 hidden">Gender</th>
                  <th className="p-4 hidden">Phone Number</th>
                  <th className="p-4 hidden">Marital Status</th>
                  <th className="p-4 hidden">Nationality</th>
                  <th className="p-4 hidden">Employment Status</th>
                  <th className="p-4 hidden">Occupation</th>
                  <th className="p-4 hidden">BVN</th>
                  <th className="p-4 hidden">Identification Type</th>
                  <th className="p-4 hidden">Identification Number</th>
                  <th className="p-4 hidden">Business Sector</th>
                  <th className="p-4 hidden">Borrower Type</th>
                  <th className="p-4 hidden">Primary Address Line 1</th>
                  <th className="p-4 hidden">Primary Address Line 2</th>
                  <th className="p-4 hidden">Primary City</th>
                  <th className="p-4 hidden">Primary State</th>
                  <th className="p-4 hidden">Primary Country</th>
                </thead>
                <tbody>
                  {rangeData.length > 0 ? (
                    rangeData.map((dud) => {
                      return (
                        <tr>
                          <td className="p-4">{dud.accountNo}</td>
                          <td className="p-4 flex items-center justify-center">
                            {dud.chqNo}
                          </td>
                          <td className="p-4">#{dud.amount}</td>
                          <td className="p-4">{dud.initiator_name}</td>
                          <td className="p-4 flex items-center justify-center">
                            {dud.initiatorDate}
                          </td>
                          <td className="p-4">{dud.approval_name}</td>
                          <td className="p-4">{dud.approval_Date}</td>
                          <td className="p-4 flex items-center justify-center">
                            {dud.initiate_Branch}
                          </td>
                          <td className="p-4 hidden"></td>
                          <td className="p-4 hidden"></td>
                          <td className="p-4 hidden">{dud.accountName}</td>
                          <td className="p-4 hidden">{dud.accountBranch}</td>
                          <td className="p-4 hidden">{dud.micrNo}</td>
                          <td className="p-4 hidden">{dud.issuerNo}</td>
                          <td className="p-4 hidden">{dud.issuerName}</td>
                          <td className="p-4 hidden">{dud.ac_Ccy}</td>
                          <td className="p-4 hidden">{dud.accountOpenDate}</td>
                          <td className="p-4 hidden">{dud.chq_iss_date}</td>
                          <td className="p-4 hidden">{dud.customerID}</td>
                          <td className="p-4 hidden">{dud.payee}</td>
                          <td className="p-4 hidden">{dud.settled}</td>
                          <td className="p-4 hidden">{dud.settlmtDate}</td>
                          <td className="p-4 hidden">{dud.sortCode}</td>
                          <td className="p-4 hidden">{dud.trn_date}</td>
                          <td className="p-4 hidden">{dud.trnRefNo}</td>
                          <td className="p-4 hidden">{dud.firstName}</td>
                          <td className="p-4 hidden">{dud.middleName}</td>
                          <td className="p-4 hidden">{dud.surname}</td>
                          <td className="p-4 hidden">{dud.dateOfBirth}</td>
                          <td className="p-4 hidden">{dud.gender}</td>
                          <td className="p-4 hidden">{dud.mobile}</td>
                          <td className="p-4 hidden">{dud.maritalStatus}</td>
                          <td className="p-4 hidden">{dud.nationality}</td>
                          <td className="p-4 hidden">{dud.employmentStatus}</td>
                          <td className="p-4 hidden">{dud.occupation}</td>
                          <td className="p-4 hidden">{dud.bvn}</td>
                          <td className="p-4 hidden">
                            {dud.identificationType}
                          </td>
                          <td className="p-4 hidden">
                            {dud.identificationNumber}
                          </td>
                          <td className="p-4 hidden">{dud.busSector}</td>
                          <td className="p-4 hidden">{dud.borrowerType}</td>
                          <td className="p-4 hidden">{dud.priAddressLine1}</td>
                          <td className="p-4 hidden">{dud.priAddressLine2}</td>
                          <td className="p-4 hidden">{dud.priCity}</td>
                          <td className="p-4 hidden">{dud.priState}</td>
                          <td className="p-4 hidden">{dud.priCountry}</td>
                          <td className="p-4">
                            <div className=" flex items-center justify-center cursor-pointer">
                              <ImDownload2
                                className="mx-4"
                                color="green"
                                size={20}
                                onClick={() => {
                                  // Define a function to gather data for the current row
                                  const rowData = {
                                    AccountNumber: dud.accountNo,
                                    AccountName: dud.accountName,
                                    AccountBranch: dud.accountBranch,
                                    AccountOpenDate: dud.accountOpenDate,
                                    AccountCurrency: dud.ac_Ccy,
                                    Amount: dud.amount,
                                    CustomerNumber: dud.customerID,
                                    ChequeNumber: dud.chqNo,
                                    ChequeIssuedDate: dud.chq_iss_date,
                                    MICRNumber: dud.micrNo,
                                    IssuerName: dud.issuerName,
                                    IssuerNumber: dud.issuerNo,
                                    TransactionDate: dud.trn_date,
                                    TransactionReference: dud.trnRefNo,
                                    Payee: dud.payee,
                                    Settled: dud.settled,
                                    SettlementDate: dud.settlmtDate,
                                    SortCode: dud.sortCode,
                                    Initiator: dud.initiator_name,
                                    DateInitiated: dud.initiatorDate,
                                    Approver: dud.approval_name,
                                    DateApproved: dud.approval_Date,
                                    UserBranch: dud.initiate_Branch,
                                    FirstName: dud.firstName,
                                    MiddleName: dud.middleName,
                                    LastName: dud.surname,
                                    DateOfBirth: dud.dateOfBirth,
                                    Gender: dud.gender,
                                    PhoneNumber: dud.mobile,
                                    MaritalStatus: dud.maritalStatus,
                                    Nationality: dud.nationality,
                                    EmploymentStatus: dud.employmentStatus,
                                    Occupation: dud.occupation,
                                    BVN: dud.bvn,
                                    IdentificationType: dud.identificationType,
                                    IdentificationNumber:
                                      dud.identificationNumber,
                                    BusinessSector: dud.busSector,
                                    BorrowerType: dud.borrowerType,
                                    PrimaryAddressLine1: dud.priAddressLine1,
                                    PrimaryAddressLine2: dud.priAddressLine2,
                                    PrimaryCity: dud.priCity,
                                    PrimaryState: dud.priState,
                                    PrimaryCountry: dud.priCountry,
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
                                    accountName: dud.accountName,
                                    accountBranch: dud.accountBranch,
                                    accountOpenDate: dud.accountOpenDate,
                                    ac_Ccy: dud.ac_Ccy,
                                    amount: dud.amount,
                                    customerID: dud.customerID,
                                    chqNo: dud.chqNo,
                                    chq_iss_date: dud.chq_iss_date,
                                    micrNo: dud.micrNo,
                                    issuerName: dud.issuerName,
                                    issuerNo: dud.issuerNo,
                                    trn_date: dud.trn_date,
                                    trnRefNo: dud.trnRefNo,
                                    payee: dud.payee,
                                    settled: dud.settled,
                                    settlmtDate: dud.settlmtDate,
                                    sortCode: dud.sortCode,
                                    initiator_name: dud.initiator_name,
                                    initiatorDate: dud.initiatorDate,
                                    approval_name: dud.approval_name,
                                    approval_Date: dud.approval_Date,
                                    initiate_Branch: dud.initiate_Branch,
                                    firstName: dud.firstName,
                                    middleName: dud.middleName,
                                    surname: dud.surname,
                                    dateOfBirth: dud.dateOfBirth,
                                    gender: dud.gender,
                                    mobile: dud.mobile,
                                    maritalStatus: dud.maritalStatus,
                                    nationality: dud.nationality,
                                    employmentStatus: dud.employmentStatus,
                                    occupation: dud.occupation,
                                    bvn: dud.bvn,
                                    identificationType: dud.identificationType,
                                    identificationNumber:
                                      dud.identificationNumber,
                                    busSector: dud.busSector,
                                    borrowerType: dud.borrowerType,
                                    priAddressLine1: dud.priAddressLine1,
                                    priAddressLine2: dud.priAddressLine2,
                                    priCity: dud.priCity,
                                    priState: dud.priState,
                                    priCountry: dud.priCountry,
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
                                    MICR Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.micrNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Payee:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.payee}
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
                                    First Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.firstName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Middle Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.middleName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Last Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.surname}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Date Of Birth:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.dateOfBirth}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Gender:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.gender}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Phone Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.mobile}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Bank Verification Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.bvn}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Marital Status:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.maritalStatus}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Nationality:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.nationality}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Employment Status:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.employmentStatus}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Occupation:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.occupation}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Identification Type:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.identificationType}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Identification Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.identificationNumber}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Business Sector:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.busSector}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Borrower Type:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.borrowerType}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Primary Address Line 1:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.priAddressLine1}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Primary Address Line 2:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.priAddressLine2}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Primary City:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.priCity}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Primary State:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.priState}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Primary Country:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.priCountry}
                                    </span>
                                  </div>
                                </div>
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
            <div className="w-[1080px] 2xl:w-[1190px] flex flex-col items-center justify-center">
              <table
                ref={tableRef}
                className="table bg-white text-sm text-left text-black px-4 w-full"
              >
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
                  <th className="p-4 hidden">First Name</th>
                  <th className="p-4 hidden">Middle Name</th>
                  <th className="p-4 hidden">Last Name</th>
                  <th className="p-4 hidden">Date Of Birth</th>
                  <th className="p-4 hidden">Gender</th>
                  <th className="p-4 hidden">Phone Number</th>
                  <th className="p-4 hidden">Marital Status</th>
                  <th className="p-4 hidden">Nationality</th>
                  <th className="p-4 hidden">Employment Status</th>
                  <th className="p-4 hidden">Occupation</th>
                  <th className="p-4 hidden">BVN</th>
                  <th className="p-4 hidden">Identification Type</th>
                  <th className="p-4 hidden">Identification Number</th>
                  <th className="p-4 hidden">Business Sector</th>
                  <th className="p-4 hidden">Borrower Type</th>
                  <th className="p-4 hidden">Primary Address Line 1</th>
                  <th className="p-4 hidden">Primary Address Line 2</th>
                  <th className="p-4 hidden">Primary City</th>
                  <th className="p-4 hidden">Primary State</th>
                  <th className="p-4 hidden">Primary Country</th>
                </thead>
                <tbody>
                  {records.length > 0 ? (
                    records.map((dud) => {
                      return (
                        <tr>
                          <td className="p-4">{dud.accountNo}</td>
                          <td className="p-4 flex items-center justify-center">
                            {dud.chqNo}
                          </td>
                          <td className="p-4">#{dud.amount}</td>
                          <td className="p-4">{dud.initiator_name}</td>
                          <td className="p-4 flex items-center justify-center">
                            {dud.initiatorDate}
                          </td>
                          <td className="p-4">{dud.approval_name}</td>
                          <td className="p-4">{dud.approval_Date}</td>
                          <td className="p-4 flex items-center justify-center">
                            {dud.initiate_Branch}
                          </td>
                          <td className="p-4 hidden"></td>
                          <td className="p-4 hidden"></td>
                          <td className="p-4 hidden">{dud.accountName}</td>
                          <td className="p-4 hidden">{dud.accountBranch}</td>
                          <td className="p-4 hidden">{dud.micrNo}</td>
                          <td className="p-4 hidden">{dud.issuerNo}</td>
                          <td className="p-4 hidden">{dud.issuerName}</td>
                          <td className="p-4 hidden">{dud.ac_Ccy}</td>
                          <td className="p-4 hidden">{dud.accountOpenDate}</td>
                          <td className="p-4 hidden">{dud.chq_iss_date}</td>
                          <td className="p-4 hidden">{dud.customerID}</td>
                          <td className="p-4 hidden">{dud.payee}</td>
                          <td className="p-4 hidden">{dud.settled}</td>
                          <td className="p-4 hidden">{dud.settlmtDate}</td>
                          <td className="p-4 hidden">{dud.sortCode}</td>
                          <td className="p-4 hidden">{dud.trn_date}</td>
                          <td className="p-4 hidden">{dud.trnRefNo}</td>
                          <td className="p-4 hidden">{dud.firstName}</td>
                          <td className="p-4 hidden">{dud.middleName}</td>
                          <td className="p-4 hidden">{dud.surname}</td>
                          <td className="p-4 hidden">{dud.dateOfBirth}</td>
                          <td className="p-4 hidden">{dud.gender}</td>
                          <td className="p-4 hidden">{dud.mobile}</td>
                          <td className="p-4 hidden">{dud.maritalStatus}</td>
                          <td className="p-4 hidden">{dud.nationality}</td>
                          <td className="p-4 hidden">{dud.employmentStatus}</td>
                          <td className="p-4 hidden">{dud.occupation}</td>
                          <td className="p-4 hidden">{dud.bvn}</td>
                          <td className="p-4 hidden">
                            {dud.identificationType}
                          </td>
                          <td className="p-4 hidden">
                            {dud.identificationNumber}
                          </td>
                          <td className="p-4 hidden">{dud.busSector}</td>
                          <td className="p-4 hidden">{dud.borrowerType}</td>
                          <td className="p-4 hidden">{dud.priAddressLine1}</td>
                          <td className="p-4 hidden">{dud.priAddressLine2}</td>
                          <td className="p-4 hidden">{dud.priCity}</td>
                          <td className="p-4 hidden">{dud.priState}</td>
                          <td className="p-4 hidden">{dud.priCountry}</td>
                          <td className="p-4">
                            <div className=" flex items-center justify-center cursor-pointer">
                              <ImDownload2
                                className="mx-4"
                                color="green"
                                size={20}
                                onClick={() => {
                                  // Define a function to gather data for the current row
                                  const rowData = {
                                    AccountNumber: dud.accountNo,
                                    AccountName: dud.accountName,
                                    AccountBranch: dud.accountBranch,
                                    AccountOpenDate: dud.accountOpenDate,
                                    AccountCurrency: dud.ac_Ccy,
                                    Amount: dud.amount,
                                    CustomerNumber: dud.customerID,
                                    ChequeNumber: dud.chqNo,
                                    ChequeIssuedDate: dud.chq_iss_date,
                                    MICRNumber: dud.micrNo,
                                    IssuerName: dud.issuerName,
                                    IssuerNumber: dud.issuerNo,
                                    TransactionDate: dud.trn_date,
                                    TransactionReference: dud.trnRefNo,
                                    Payee: dud.payee,
                                    Settled: dud.settled,
                                    SettlementDate: dud.settlmtDate,
                                    SortCode: dud.sortCode,
                                    Initiator: dud.initiator_name,
                                    DateInitiated: dud.initiatorDate,
                                    Approver: dud.approval_name,
                                    DateApproved: dud.approval_Date,
                                    UserBranch: dud.initiate_Branch,
                                    FirstName: dud.firstName,
                                    MiddleName: dud.middleName,
                                    LastName: dud.surname,
                                    DateOfBirth: dud.dateOfBirth,
                                    Gender: dud.gender,
                                    PhoneNumber: dud.mobile,
                                    MaritalStatus: dud.maritalStatus,
                                    Nationality: dud.nationality,
                                    EmploymentStatus: dud.employmentStatus,
                                    Occupation: dud.occupation,
                                    BVN: dud.bvn,
                                    IdentificationType: dud.identificationType,
                                    IdentificationNumber:
                                      dud.identificationNumber,
                                    BusinessSector: dud.busSector,
                                    BorrowerType: dud.borrowerType,
                                    PrimaryAddressLine1: dud.priAddressLine1,
                                    PrimaryAddressLine2: dud.priAddressLine2,
                                    PrimaryCity: dud.priCity,
                                    PrimaryState: dud.priState,
                                    PrimaryCountry: dud.priCountry,
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
                                    accountName: dud.accountName,
                                    accountBranch: dud.accountBranch,
                                    accountOpenDate: dud.accountOpenDate,
                                    ac_Ccy: dud.ac_Ccy,
                                    amount: dud.amount,
                                    customerID: dud.customerID,
                                    chqNo: dud.chqNo,
                                    chq_iss_date: dud.chq_iss_date,
                                    micrNo: dud.micrNo,
                                    issuerName: dud.issuerName,
                                    issuerNo: dud.issuerNo,
                                    trn_date: dud.trn_date,
                                    trnRefNo: dud.trnRefNo,
                                    payee: dud.payee,
                                    settled: dud.settled,
                                    settlmtDate: dud.settlmtDate,
                                    sortCode: dud.sortCode,
                                    initiator_name: dud.initiator_name,
                                    initiatorDate: dud.initiatorDate,
                                    approval_name: dud.approval_name,
                                    approval_Date: dud.approval_Date,
                                    initiate_Branch: dud.initiate_Branch,
                                    firstName: dud.firstName,
                                    middleName: dud.middleName,
                                    surname: dud.surname,
                                    dateOfBirth: dud.dateOfBirth,
                                    gender: dud.gender,
                                    mobile: dud.mobile,
                                    maritalStatus: dud.maritalStatus,
                                    nationality: dud.nationality,
                                    employmentStatus: dud.employmentStatus,
                                    occupation: dud.occupation,
                                    bvn: dud.bvn,
                                    identificationType: dud.identificationType,
                                    identificationNumber:
                                      dud.identificationNumber,
                                    busSector: dud.busSector,
                                    borrowerType: dud.borrowerType,
                                    priAddressLine1: dud.priAddressLine1,
                                    priAddressLine2: dud.priAddressLine2,
                                    priCity: dud.priCity,
                                    priState: dud.priState,
                                    priCountry: dud.priCountry,
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
                                    MICR Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.micrNo}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Payee:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.payee}
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
                                    First Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.firstName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Middle Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.middleName}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Last Name:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.surname}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Date Of Birth:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.dateOfBirth}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Gender:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.gender}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Phone Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.mobile}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Bank Verification Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.bvn}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Marital Status:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.maritalStatus}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Nationality:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.nationality}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Employment Status:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.employmentStatus}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Occupation:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.occupation}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Identification Type:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.identificationType}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Identification Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.identificationNumber}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Business Sector:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.busSector}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Borrower Type:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.borrowerType}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Primary Address Line 1:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.priAddressLine1}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Primary Address Line 2:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.priAddressLine2}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Primary City:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.priCity}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Primary State:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.priState}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Primary Country:
                                    <span className="ml-1 font-semibold text-black">
                                      {selectedRowData.priCountry}
                                    </span>
                                  </div>
                                </div>
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
                    <li key={i} className="p-2">
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

export default DudChequeReportIndv;
