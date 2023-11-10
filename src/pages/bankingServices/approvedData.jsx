import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BiDotsVertical } from "react-icons/bi";
import { ImDownload2 } from "react-icons/im";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const ApprovedData = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_DUDCHEQUE;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const tableRef = useRef(null);
  const [pendingTransaction, setPendingTransaction] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [details, setDetails] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = pendingTransaction.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pendingTransaction.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

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
    const url = `${apiURL}/GetDudChequeApprovedTransaction?Initialised_BranchCode=${branchCode}`;
    axios.get(url).then((response) => {
      console.log(response.data, "Pending Transaction");
      setPendingTransaction(response.data.result);
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

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="font-bold text-2xl uppercase mb-2">
          approved dud cheque transaction
        </div>
        <div className="w-full rounded-lg bg-white p-4 max-w-full overflow-x-auto">
          <div className="flex flex-col items-center justify-center">
            <table
              ref={tableRef}
              className="table bg-white text-sm text-left text-black px-4 w-full"
            >
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                <th className="p-4">Account Number</th>
                <th className="p-4">Account Name</th>
                <th className="p-4">Customer Number</th>
                <th className="p-4">Customer Type</th>
                <th className="p-4">Cheque Number</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Action</th>
                <th className="p-4"></th>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((dud, index) => {
                    return (
                      <tr>
                        <td className="p-4">{dud.AccountNumber}</td>
                        <td className="p-4">{dud.AccountName}</td>
                        <td className="p-4">{dud.CustomerNumber}</td>
                        <td className="p-4">{dud.CustomerType}</td>
                        <td className="p-4">{dud.ChequeNumber}</td>
                        <td className="p-4">{dud.Amount}</td>
                        <td className="p-4">
                          <div className="flex items-center cursor-pointer">
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
                              DudCheque Details
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
                                <div className="font-normal text-[#7b7878]">
                                  Account Open Date:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.AccountOpenDate}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Customer Number:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.CustomerNumber}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Customer Type:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.CustomerType}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Account Branch:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.BranchCode}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Amount:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.Amount}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Currency:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.Currecy}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Cheque Number:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.ChequeNumber}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Issuer Number:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.IssuerNumber}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Issuer Name:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.IssuerName}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  MICR Number:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.MicroNumber}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Settlement Date:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.SettleDate}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Settled:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.Settled}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Transaction Date:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.TransactionDate}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Transaction Number:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.TransactionNumber}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Sort Code:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.SortCode}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Payee:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.Payee}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Status:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.Status}
                                  </span>
                                </div>
                              </div>
                              {/* <div className="flex items-center justify-center mt-4">
                              <button
                                // onClick={handleClose}
                                type="submit"
                                className="w-[128px] h-10 p-2 text-white text-sm font-semibold bg-[#db1600] rounded mr-4"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  return setComment(true);
                                }}
                                type="submit"
                                className="w-[100px] h-10 p-2 text-black text-sm font-semibold rounded border border-black"
                              >
                                Decline
                              </button>
                            </div> */}
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
            {/* <div
              className="flex items-center justify-center cursor-pointer w-[177px] h-[49px] bg-[#db1600] text-white font-semibold rounded"
              onClick={onDownload}
            >
              <AiOutlineDownload size={20} />
              <span> as .xlsx</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovedData;