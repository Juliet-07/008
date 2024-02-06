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
      doc.text(`Customer Number: ${row.customerNo}`, xPos, yPos + 60);
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
      doc.text(`Initiator:${row.Initiator_name}`, xPos, yPos + 180);
      doc.text(`Date Initiated:${row.Initiator_Date}`, xPos, yPos + 190);
      doc.text(`Approver:${row.Approval_name}`, xPos, yPos + 200);
      doc.text(`Date Approved:${row.Approval_Date}`, xPos, yPos + 210);
      doc.text(`User Branch:${row.Initiate_Branch}`, xPos, yPos + 220);
      doc.text(`Email:${row.Email}`, xPos, yPos + 230);
      doc.text(`Business Category:${row.busCategory}`, xPos, yPos + 240);
      doc.text(
        `Business Corporation Type:${row.busCorpType}`,
        xPos,
        yPos + 250
      );
      doc.text(
        `Business Identification Number:${row.busIdNo}`,
        xPos,
        yPos + 260
      );
      doc.text(`Business Name:${row.busName}`, xPos, yPos + 270);
      doc.text(`Date Of Incorporation:${row.dateOfIncorp}`, xPos, yPos + 280);
      doc.text(
        `Business Office Address Line1:${row.busOfficeAddressLine1}`,
        xPos,
        yPos + 290
      );
      doc.text(
        `Business Office Address Line2:${row.busOfficeAddressLine2}`,
        xPos,
        yPos + 300
      );
      doc.text(`Tax Identification:${row.taxID}`, xPos, yPos + 310);
      doc.text(`City:${row.city}`, xPos, yPos + 320);
      doc.text(`State:${row.state}`, xPos, yPos + 330);
      doc.text(`Country:${row.country}`, xPos, yPos + 340);
      doc.text(
        `Secondary Address City:${row.secAddressCity}`,
        xPos,
        yPos + 350
      );
      doc.text(
        `Secondary Address State:${row.secAddressState}`,
        xPos,
        yPos + 360
      );
      doc.text(
        `Secondary Address Country:${row.secAddressCountry}`,
        xPos,
        yPos + 370
      );
      doc.text(`Secondary Phone Number:${row.secPhone}`, xPos, yPos + 380);
      doc.text(
        `Secondary Address Line 1:${row.secAddressLine1}`,
        xPos,
        yPos + 390
      );
      doc.text(
        `Secondary Address Line2:${row.secAddressLine2}`,
        xPos,
        yPos + 400
      );

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
    tablePayload: rangeData,
    filename: "DudCheque Corporate Report",
    sheet: "Corp Report",
  });

  useEffect(() => {
    getCorpDudCheque();
    console.log(tableRef.current, "table payload");
  }, []);
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
            {/* <div
              onClick={onDownload}
              className="flex items-center cursor-pointer w-[100px] h-10 bg-green-600 text-white font-semibold rounded p-2"
            >
              <AiOutlineDownload size={20} />
              <span className="pl-2"> as .xlsx</span>
            </div> */}
          </div>

          {buttonClicked ? (
            <>
              <div className="flex items-center justify-between">
                <div className="my-4 font-semibold text-xl underline">
                  Results From Search
                </div>
                <div
                  onClick={onDownload}
                  className="flex items-center cursor-pointer h-10 bg-green-600 text-white font-semibold rounded p-2"
                >
                  <AiOutlineDownload size={20} />
                  <span className="pl-2"> Download Report By Range</span>
                </div>
              </div>
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
                    <th className="p-4 hidden">Email</th>
                    <th className="p-4 hidden">Business Category</th>
                    <th className="p-4 hidden">Business Corporation Type</th>
                    <th className="p-4 hidden">
                      Business Identification Number
                    </th>
                    <th className="p-4 hidden">Business Name</th>
                    <th className="p-4 hidden">Date Of Incorporation</th>
                    <th className="p-4 hidden">
                      Business Office Address Line 1
                    </th>
                    <th className="p-4 hidden">
                      Business Office Address Line 2
                    </th>
                    <th className="p-4 hidden">Tax Identification</th>
                    <th className="p-4 hidden">City</th>
                    <th className="p-4 hidden">State</th>
                    <th className="p-4 hidden">Country</th>
                    <th className="p-4 hidden">Secondary Address City</th>
                    <th className="p-4 hidden">Secondary Address State</th>
                    <th className="p-4 hidden">Secondary Address Country</th>
                    <th className="p-4 hidden">Secondary Phone</th>
                    <th className="p-4 hidden">Secondary Address Line 1</th>
                    <th className="p-4 hidden">Secondary Address Line 2</th>
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
                            <td className="p-4 flex items-center justify-center">
                              {dud.Initiate_Branch}
                            </td>
                            <td className="p-4 hidden"></td>
                            <td className="p-4 hidden"></td>
                            <td className="p-4 hidden">{dud.accountName}</td>
                            <td className="p-4 hidden">{dud.accountBranch}</td>
                            <td className="p-4 hidden">{dud.micrNo}</td>
                            <td className="p-4 hidden">{dud.issuerNo}</td>
                            <td className="p-4 hidden">{dud.issuerName}</td>
                            <td className="p-4 hidden">{dud.ac_Ccy}</td>
                            <td className="p-4 hidden">
                              {dud.accountOpenDate}
                            </td>
                            <td className="p-4 hidden">{dud.chq_iss_date}</td>
                            <td className="p-4 hidden">{dud.customerNo}</td>
                            <td className="p-4 hidden">{dud.payee}</td>
                            <td className="p-4 hidden">{dud.settled}</td>
                            <td className="p-4 hidden">{dud.settlmtDate}</td>
                            <td className="p-4 hidden">{dud.sortCode}</td>
                            <td className="p-4 hidden">{dud.trn_date}</td>
                            <td className="p-4 hidden">{dud.trnRefNo}</td>
                            <td className="p-4 hidden">{dud.Email}</td>
                            <td className="p-4 hidden">{dud.busCategory}</td>
                            <td className="p-4 hidden">{dud.busCorpType}</td>
                            <td className="p-4 hidden">{dud.busIdNo}</td>
                            <td className="p-4 hidden">{dud.busName}</td>
                            <td className="p-4 hidden">{dud.dateOfIncorp}</td>
                            <td className="p-4 hidden">
                              {dud.busOfficeAddressLine1}
                            </td>
                            <td className="p-4 hidden">
                              {dud.busOfficeAddressLine2}
                            </td>
                            <td className="p-4 hidden">{dud.taxID}</td>
                            <td className="p-4 hidden">{dud.city}</td>
                            <td className="p-4 hidden">{dud.state}</td>
                            <td className="p-4 hidden">{dud.country}</td>
                            <td className="p-4 hidden">{dud.secAddressCity}</td>
                            <td className="p-4 hidden">
                              {dud.secAddressState}
                            </td>
                            <td className="p-4 hidden">
                              {dud.secAddressCountry}
                            </td>
                            <td className="p-4 hidden">{dud.secPhone}</td>
                            <td className="p-4 hidden">
                              {dud.secAddressLine1}
                            </td>
                            <td className="p-4 hidden">
                              {dud.secAddressLine2}
                            </td>
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
                                      CustomerNumber: dud.customerNo,
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
                                      Initiator: dud.Initiator_name,
                                      DateOfInitiation: dud.Initiator_Date,
                                      ApproverName: dud.Approval_name,
                                      ApproverDate: dud.Approval_Date,
                                      UserBranch: dud.Initiate_Branch,
                                      Email: dud.Email,
                                      BusinessCategory: dud.busCategory,
                                      BusinessCorporationType: dud.busCorpType,
                                      BusinessIdentificationNumber: dud.busIdNo,
                                      BusinessName: dud.busName,
                                      DateOfIncorporation: dud.dateOfIncorp,
                                      BusinessOfficeAddressLine1:
                                        dud.busOfficeAddressLine1,
                                      BusinessOfficeAddressLine2:
                                        dud.busOfficeAddressLine2,
                                      TaxID: dud.taxID,
                                      City: dud.city,
                                      State: dud.state,
                                      Country: dud.country,
                                      SecondaryAddressCity: dud.secAddressCity,
                                      SecondaryAddressState:
                                        dud.secAddressState,
                                      SecondaryAddressCountry:
                                        dud.secAddressCountry,
                                      SecondaryPhone: dud.secPhone,
                                      SecondaryAddressLine1:
                                        dud.secAddressLine1,
                                      SecondaryAddressLine2:
                                        dud.secAddressLine2,
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
                                      customerNo: dud.customerNo,
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
                                      Initiator_name: dud.Initiator_name,
                                      Initiator_Date: dud.Initiator_Date,
                                      Approval_name: dud.Approval_name,
                                      Approval_Date: dud.Approval_Date,
                                      Initiate_Branch: dud.Initiate_Branch,
                                      Email: dud.Email,
                                      busCategory: dud.busCategory,
                                      busCorpType: dud.busCorpType,
                                      busIdNo: dud.busIdNo,
                                      busName: dud.busName,
                                      dateOfIncorp: dud.dateOfIncorp,
                                      busOfficeAddressLine1:
                                        dud.busOfficeAddressLine1,
                                      busOfficeAddressLine2:
                                        dud.busOfficeAddressLine2,
                                      taxID: dud.taxID,
                                      city: dud.city,
                                      state: dud.state,
                                      country: dud.country,
                                      secAddressCity: dud.secAddressCity,
                                      secAddressState: dud.secAddressState,
                                      secAddressCountry: dud.secAddressCountry,
                                      secPhone: dud.secPhone,
                                      secAddressLine1: dud.secAddressLine1,
                                      secAddressLine2: dud.secAddressLine2,
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
            </>
          ) : (
            <div className="w-[1080px] 2xl:w-[1190px] flex flex-col items-center justify-center">
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
                  <th className="p-4 hidden">Email</th>
                  <th className="p-4 hidden">Business Category</th>
                  <th className="p-4 hidden">Business Corporation Type</th>
                  <th className="p-4 hidden">Business Identification Number</th>
                  <th className="p-4 hidden">Business Name</th>
                  <th className="p-4 hidden">Date Of Incorporation</th>
                  <th className="p-4 hidden">Business Office Address Line 1</th>
                  <th className="p-4 hidden">Business Office Address Line 2</th>
                  <th className="p-4 hidden">Tax Identification</th>
                  <th className="p-4 hidden">City</th>
                  <th className="p-4 hidden">State</th>
                  <th className="p-4 hidden">Country</th>
                  <th className="p-4 hidden">Secondary Address City</th>
                  <th className="p-4 hidden">Secondary Address State</th>
                  <th className="p-4 hidden">Secondary Address Country</th>
                  <th className="p-4 hidden">Secondary Phone</th>
                  <th className="p-4 hidden">Secondary Address Line 1</th>
                  <th className="p-4 hidden">Secondary Address Line 2</th>
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
                          <td className="p-4 flex items-center justify-center">
                            {dud.Initiate_Branch}
                          </td>
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
                          <td className="p-4 hidden">{dud.Email}</td>
                          <td className="p-4 hidden">{dud.busCategory}</td>
                          <td className="p-4 hidden">{dud.busCorpType}</td>
                          <td className="p-4 hidden">{dud.busIdNo}</td>
                          <td className="p-4 hidden">{dud.busName}</td>
                          <td className="p-4 hidden">{dud.dateOfIncorp}</td>
                          <td className="p-4 hidden">
                            {dud.busOfficeAddressLine1}
                          </td>
                          <td className="p-4 hidden">
                            {dud.busOfficeAddressLine2}
                          </td>
                          <td className="p-4 hidden">{dud.taxID}</td>
                          <td className="p-4 hidden">{dud.city}</td>
                          <td className="p-4 hidden">{dud.state}</td>
                          <td className="p-4 hidden">{dud.country}</td>
                          <td className="p-4 hidden">{dud.secAddressCity}</td>
                          <td className="p-4 hidden">{dud.secAddressState}</td>
                          <td className="p-4 hidden">
                            {dud.secAddressCountry}
                          </td>
                          <td className="p-4 hidden">{dud.secPhone}</td>
                          <td className="p-4 hidden">{dud.secAddressLine1}</td>
                          <td className="p-4 hidden">{dud.secAddressLine2}</td>
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
                                    CustomerNumber: dud.customerNo,
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
                                    Initiator: dud.Initiator_name,
                                    DateOfInitiation: dud.Initiator_Date,
                                    ApproverName: dud.Approval_name,
                                    ApproverDate: dud.Approval_Date,
                                    UserBranch: dud.Initiate_Branch,
                                    Email: dud.Email,
                                    BusinessCategory: dud.busCategory,
                                    BusinessCorporationType: dud.busCorpType,
                                    BusinessIdentificationNumber: dud.busIdNo,
                                    BusinessName: dud.busName,
                                    DateOfIncorporation: dud.dateOfIncorp,
                                    BusinessOfficeAddressLine1:
                                      dud.busOfficeAddressLine1,
                                    BusinessOfficeAddressLine2:
                                      dud.busOfficeAddressLine2,
                                    TaxID: dud.taxID,
                                    City: dud.city,
                                    State: dud.state,
                                    Country: dud.country,
                                    SecondaryAddressCity: dud.secAddressCity,
                                    SecondaryAddressState: dud.secAddressState,
                                    SecondaryAddressCountry:
                                      dud.secAddressCountry,
                                    SecondaryPhone: dud.secPhone,
                                    SecondaryAddressLine1: dud.secAddressLine1,
                                    SecondaryAddressLine2: dud.secAddressLine2,
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
                                    customerNo: dud.customerNo,
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
                                    Initiator_name: dud.Initiator_name,
                                    Initiator_Date: dud.Initiator_Date,
                                    Approval_name: dud.Approval_name,
                                    Approval_Date: dud.Approval_Date,
                                    Initiate_Branch: dud.Initiate_Branch,
                                    Email: dud.Email,
                                    busCategory: dud.busCategory,
                                    busCorpType: dud.busCorpType,
                                    busIdNo: dud.busIdNo,
                                    busName: dud.busName,
                                    dateOfIncorp: dud.dateOfIncorp,
                                    busOfficeAddressLine1:
                                      dud.busOfficeAddressLine1,
                                    busOfficeAddressLine2:
                                      dud.busOfficeAddressLine2,
                                    taxID: dud.taxID,
                                    city: dud.city,
                                    state: dud.state,
                                    country: dud.country,
                                    secAddressCity: dud.secAddressCity,
                                    secAddressState: dud.secAddressState,
                                    secAddressCountry: dud.secAddressCountry,
                                    secPhone: dud.secPhone,
                                    secAddressLine1: dud.secAddressLine1,
                                    secAddressLine2: dud.secAddressLine2,
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
