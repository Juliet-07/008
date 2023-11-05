import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import BranchInfo from "../../components/BranchDetails";
import Select from "react-select";
import { toast } from "react-toastify";

const DudChequeTeller = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_DUDCHEQUE;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [AccountNo, setAccountNo] = useState("");
  const [individual, setIndividual] = useState("");
  const [corporate, setCorporate] = useState("");
  const { handleSubmit } = useForm();
  const [selectedIdType, setSelectedIdType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [userBranch, setUserBranch] = useState("");

  const allInitialValues = {
    customerNo: "",
    accountName: "",
    accountNo: "",
    accountBranch: "",
    accountOpenDate: "",
    amount: "",
    ac_Ccy: "",
    chqNo: "",
    micrNo: "",
    issuerNo: "",
    issuerName: "",
    trn_date: "",
    trnRefNo: "",
    chq_iss_date: "",
    settled: "",
    settlmtDate: "",
    sortCode: "",
    payee: "",
  };
  const corpInitialValues = {
    custId: "",
    busIdNo: "",
    Email: "",
    busName: "",
    busOfficeAddressLine1: "",
    busCorpType: "",
    busOfficeAddressLine2: "",
    city: "",
    dateOfIncorp: "",
    state: "",
    customerBranchCode: "",
    country: "",
    secPhone: "",
    taxID: "",
    secAddressCity: "",
    secAddressState: "",
    busCategory: "",
    secAddressCountry: "",
    secAddressLine1: "",
    secAddressLine2: "",
  };
  const indvInitialValues = {
    customerID: "",
    mobile: "",
    employmentStatus: "",
    branchCode: "",
    priAddressLine1: "",
    occupation: "",
    surname: "",
    priAddressLine2: "",
    firstName: "",
    gender: "",
    priCity: "",
    middleName: "",
    busSector: "",
    businessCategory: "",
    nationality: "",
    priState: "",
    borrowerType: "",
    dateOfBirth: "",
    maritalStatus: "",
    priCountry: "",
    bvn: "",
    identificationType: "",
    identificationNumber: "",
  };
  const [allValues, setAllValues] = useState(allInitialValues);
  const [dudChequeCorp, setDudChequeCorp] = useState(corpInitialValues);
  const [dudChequeIndv, setDudChequeIndv] = useState(indvInitialValues);

  const {
    customerNo,
    accountName,
    accountNo,
    accountBranch,
    accountOpenDate,
    amount,
    ac_Ccy,
    chqNo,
    micrNo,
    issuerNo,
    issuerName,
    trn_date,
    trnRefNo,
    chq_iss_date,
    settled,
    settlmtDate,
    sortCode,
    payee,
  } = allValues;
  const {
    custId,
    busIdNo,
    Email,
    busName,
    busOfficeAddressLine1,
    busCorpType,
    busOfficeAddressLine2,
    city,
    dateOfIncorp,
    state,
    customerBranchCode,
    country,
    secPhone,
    taxID,
    secAddressCity,
    secAddressState,
    busCategory,
    secAddressCountry,
    secAddressLine1,
    secAddressLine2,
  } = dudChequeCorp;
  const {
    customerID,
    mobile,
    employmentStatus,
    branchCode,
    priAddressLine1,
    occupation,
    surname,
    priAddressLine2,
    firstName,
    gender,
    priCity,
    busSector,
    businessCategory,
    middleName,
    nationality,
    priState,
    borrowerType,
    dateOfBirth,
    maritalStatus,
    priCountry,
    bvn,
    identificationType,
    identificationNumber,
  } = dudChequeIndv;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllValues({ ...allValues, [name]: value });
    setDudChequeCorp({ ...dudChequeCorp, [name]: value });
    setDudChequeIndv({ ...dudChequeIndv, [name]: value });
  };

  const GetCustomerInfo = () => {
    const url = `${apiURL}/GetCustomerByAccoutNumber?AccountNo=${AccountNo}`;
    axios.get(url).then((response) => {
      console.log(response.data, "customer info");
      let data = response.data.result;
      setAllValues({
        accountNo: data.accountNumber,
        accountName: data.accountName,
        accountOpenDate: data.dateopened,
        customerNo: data.uniqueCustomerId,
        accountBranch: data.branchName,
        ac_Ccy: data.currency,
        issuerName: data.accountName,
        issuerNo: data.accountNumber,
      });
      if (data.ccustomer_type === "Individual") {
        toast.success("Individual Account");
        setIndividual(data.ccustomer_type);
        setDudChequeIndv({
          customerID: data.uniqueCustomerId,
          branchCode: data.branchCode,
          surname: data.lastName,
          firstName: data.firstName,
          middleName: data.middleName,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          mobile: data.phoneNumber,
          bvn: data.bvn,
          nationality: data.nationality,
          priAddressLine1: data.address,
        });
      }
      if (data.ccustomer_type === "Corperate") {
        toast.success("Corporate Account");
        setCorporate(data.ccustomer_type);
        setDudChequeCorp({
          custId: data.uniqueCustomerId,
          busIdNo: data.tin,
          busName: data.accountName,
          Email: data.email,
          customerBranchCode: data.branchCode,
          busOfficeAddressLine1: data.address,
        });
      }
    });
  };

  const handleSelectIdTypeChange = (e) => {
    setSelectedIdType(e.target.value);
    console.log(selectedIdType, "selected for");
  };

  const handleSelectStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    console.log(selectedStatus, "selected for");
  };

  const GetUserInfo = () => {
    const url = `${apiURL}/GetUserInfor?UserID=${user.givenname}`;
    axios.get(url).then((response) => {
      console.log(response.data, "customer info");
      let data = response.data.result;
      setUserBranch(data.branchCode);
      console.log(userBranch);
    });
  };

  // To ensure the selected item is immediately captured
  useEffect(() => {
    console.log(selectedIdType, "useeffect");
    console.log(selectedStatus, "useeffect");
    GetUserInfo();
  }, [userBranch, selectedIdType, selectedStatus]);

  // const resetForm = () => {
  //   setAllValues("");
  //   setDudChequeCorp("");
  //   setDudChequeIndv("");
  // };

  const saveCorpDudChequeDetails = () => {
    const uri = `${apiURL}/InsertCorpDudCheque`;
    const payload = {
      ...allValues,
      ...dudChequeCorp,
      Initiate_By: user.name,
      Initiate_Branch: userBranch,
    };
    console.log(payload, "payload");
    axios.post(uri, payload).then((response) => {
      console.log(response, "response from creating dudcheque");
      toast.success(response.data.statusMessage);
      setAllValues("");
      setDudChequeCorp("");
    });
  };

  const saveIndvDudChequeDetails = () => {
    const url = `${apiURL}/InsertIndvDudCheque`;
    const payload = {
      ...allValues,
      ...dudChequeIndv,
      maritalStatus: selectedStatus,
      identificationType: selectedIdType,
      initiator_name: user.name,
      initiate_Branch: userBranch,
    };
    console.log(payload, "payload");
    axios.post(url, payload).then((response) => {
      console.log(response, "response from creating dudcheque");
      toast.success(response.data.statusMessage);
      setAllValues("");
      setDudChequeIndv("");
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-4">
        <div className="font-bold text-2xl uppercase mb-2">dud cheque</div>
        <div className="w-[800px] h-[100px] shadow-xl mx-20 border rounded border-red-600 text-red-600 font-medium text-sm p-4">
          <form onSubmit={handleSubmit(GetCustomerInfo)}>
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-red-300 rounded-lg bg-gray-50 focus:outline-none"
                placeholder="Search"
                required
                name="AccountNo"
                value={AccountNo}
                onChange={(e) => setAccountNo(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:red-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="w-[870px] 2xl:w-[900px] h-[70vh] p-10 overflow-auto">
          <div className="mb-2 font-bold text-xl flex items-center justify-center">
            Log DudCheque Details
          </div>
          <div className="w-full shadow-xl border rounded border-red-600 text-red-600 font-medium text-sm p-4">
            {/* All Values */}
            <form>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-number"
                  >
                    Customer Number
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-number"
                    type="text"
                    name="customerNo"
                    value={customerNo}
                    // onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-last-name"
                  >
                    Account Name
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-last-name"
                    type="text"
                    name="accountName"
                    value={accountName}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-last-name"
                  >
                    Account Number
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-last-name"
                    type="text"
                    name="accountNo"
                    value={accountNo}
                  />
                </div>
                <div class="w-full md:w-1/3 px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-last-name"
                  >
                    Account Branch
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-last-name"
                    type="text"
                    name="accountBranch"
                    value={accountBranch}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="text-[#2b2e35] text-sm font-medium mb-2">
                    Account Open Date
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    type="text"
                    name="accountOpenDate"
                    value={accountOpenDate}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-last-name"
                  >
                    Amount
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-last-name"
                    type="text"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-first-name"
                  >
                    Account Currency
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-first-name"
                    type="text"
                    name="ac_Ccy"
                    value={ac_Ccy}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-first-name"
                  >
                    Cheque Number
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-first-name"
                    type="text"
                    name="chqNo"
                    value={chqNo}
                    onChange={handleChange}
                  />
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-last-name"
                  >
                    MICR Number
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-last-name"
                    type="text"
                    name="micrNo"
                    value={micrNo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-first-name"
                  >
                    Issuer Number
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-first-name"
                    type="text"
                    name="issuerNo"
                    value={issuerNo}
                  />
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-last-name"
                  >
                    Issuer Name
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-last-name"
                    type="text"
                    name="issuerName"
                    value={issuerName}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/3 px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-last-name"
                  >
                    Transaction Date
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-last-name"
                    type="date"
                    name="trn_date"
                    value={trn_date}
                    onChange={handleChange}
                  />
                </div>
                <div class="w-full md:w-1/3 px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-last-name"
                  >
                    Transaction Reference Number
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-last-name"
                    type="text"
                    name="trnRefNo"
                    value={trnRefNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-first-name"
                  >
                    Cheque Issued Date
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-first-name"
                    type="date"
                    name="chq_iss_date"
                    value={chq_iss_date}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/3 px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-last-name"
                  >
                    Settled
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-last-name"
                    type="text"
                    name="settled"
                    value={settled}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-first-name"
                  >
                    Settlement Date
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-first-name"
                    type="date"
                    name="settlmtDate"
                    value={settlmtDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-first-name"
                  >
                    Sort Code
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-first-name"
                    type="text"
                    name="sortCode"
                    value={sortCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    className="text-[#2b2e35] text-sm font-medium mb-2"
                    for="grid-last-name"
                  >
                    PAYEE
                  </label>
                  <input
                    className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                    id="grid-last-name"
                    type="text"
                    name="payee"
                    value={payee}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </div>
          {individual && (
            <>
              <div className="my-4 font-bold text-xl flex items-center justify-center">
                Log KYC for Individual Account
              </div>
              <div className="w-full shadow-xl border rounded border-red-600 text-red-600 font-medium text-sm p-4">
                <form onSubmit={handleSubmit(saveIndvDudChequeDetails)}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Customer ID
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="customerID"
                        value={customerID}
                      />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Branch Code
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="branchCode"
                        value={branchCode}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Surname
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="surname"
                        value={surname}
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        First Name
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="firstName"
                        value={firstName}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Middle Name
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="middleName"
                        value={middleName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Date of Birth
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="dateOfBirth"
                        value={dateOfBirth}
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Gender
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="gender"
                        value={gender}
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Marital Status
                      </label>
                      <select
                        className="block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        value={selectedStatus}
                        onChange={handleSelectStatusChange}
                      >
                        <option selected>Status</option>
                        <option value="Single">SINGLE</option>
                        <option value="Married">MARRIED</option>
                        <option value="Others">OTHERS</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Mobile Number
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="mobile"
                        value={mobile}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        BVN
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="bvn"
                        value={bvn}
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Identification Type
                      </label>
                      <select
                        className="block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        value={selectedIdType}
                        onChange={handleSelectIdTypeChange}
                      >
                        <option selected>Identification Type</option>
                        <option value="nin">NIN</option>
                        <option value="vin">VIN</option>
                        <option value="licence">DRIVER'S LICENSE</option>
                        <option value="passport">PASSPORT NUMBER</option>
                      </select>
                    </div>
                  </div>
                  {selectedIdType && (
                    <>
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Identification Number
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="identificationNumber"
                        value={identificationNumber}
                        onChange={handleChange}
                        required
                      />
                    </>
                  )}
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Nationality
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="nationality"
                        value={nationality}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Primary Address Line 1
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="priAddressLine1"
                        value={priAddressLine1}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Primary Address Line 2
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="priAddressLine2"
                        value={priAddressLine2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Primary City/LGA
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="priCity"
                        value={priCity}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Primary State
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="priState"
                        value={priState}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Primary Country
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="priCountry"
                        value={priCountry}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="font-semibold text-xl -mx-3 mb-6 px-4">
                    Employment Details
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Employment Status
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="employmentStatus"
                        value={employmentStatus}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Occupation
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="occupation"
                        value={occupation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Business Category
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="businessCategory"
                        value={businessCategory}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Business Sector
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="busSector"
                        value={busSector}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Borrower Type
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="borrowerType"
                        value={borrowerType}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full h-[49px] bg-[#db1600] rounded text-white font-semibold mt-6 mb-10"
                  >
                    Save
                  </button>
                </form>
              </div>
            </>
          )}
          {corporate && (
            <>
              <div className="my-4 font-bold text-xl flex items-center justify-center">
                Log KYC for Corporate Account
              </div>
              <div className="w-full shadow-xl border rounded border-red-600 text-red-600 font-medium text-sm p-4">
                <form onSubmit={handleSubmit(saveCorpDudChequeDetails)}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Customer ID
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="custId"
                        value={custId}
                        // onChange={handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Business Identification Number
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="busIdNo"
                        value={busIdNo}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Business Name
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="busName"
                        value={busName}
                        // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Email Address
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="email"
                        name="Email"
                        value={Email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Business Corporate Type
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="busCorpType"
                        value={busCorpType}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Business Category
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="busCategory"
                        value={busCategory}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Date of Incorporation
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="date"
                        name="dateOfIncorp"
                        value={dateOfIncorp}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Customer Branch Code
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="customerBranchCode"
                        value={customerBranchCode}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Tax ID
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="taxID"
                        value={taxID}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Business Office Address Line 1
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="busOfficeAddressLine1"
                        value={busOfficeAddressLine1}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Business Office Address Line 2
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="busOfficeAddressLine2"
                        value={busOfficeAddressLine2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        City
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        State
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="state"
                        value={state}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Country
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="country"
                        value={country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Secondary Phone
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="secPhone"
                        value={secPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Secondary Address Line 1
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="secAddressLine1"
                        value={secAddressLine1}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Secondary Address Line 2
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="secAddressLine2"
                        value={secAddressLine2}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-first-name"
                      >
                        Secondary Address City
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-first-name"
                        type="text"
                        name="secAddressCity"
                        value={secAddressCity}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-last-name"
                      >
                        Secondary Address State
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-last-name"
                        type="text"
                        name="secAddressState"
                        value={secAddressState}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                      <label
                        className="text-[#2b2e35] text-sm font-medium mb-2"
                        for="grid-email"
                      >
                        Secondary Address Country
                      </label>
                      <input
                        className="appearance-none block w-full text-gray-700 border border-[#9099a4] rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="grid-email"
                        type="text"
                        name="secAddressCountry"
                        value={secAddressCountry}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full h-[49px] bg-[#db1600] rounded text-white font-semibold mt-6 mb-10"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DudChequeTeller;
