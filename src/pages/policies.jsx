import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import { useForm } from "react-hook-form";
import AML from "../assets/Policies/aml.pdf";
import AML_CFT from "../assets/Policies/aml_cft.pdf";
import ANTIBRIBE from "../assets/Policies/antiBribe.pdf";
import DATING from "../assets/Policies/datingPolicy.pdf";
// import DRESSCODE from "../assets/Policies/dresscode.pptx";
import HANDBOOK from "../assets/Policies/handbook.pdf";
import CODE_OF_CONDUCT from "../assets/Policies/code_of_conduct.pdf";
import WHISTLE from "../assets/Policies/whistleBlowing.pdf";
import INFOSECURITY from "../assets/Policies/ISP/infoSecurity.pdf";
import IFS01 from "../assets/Policies/ISP/PTB_Cyber_Incident_Response_Plan.pdf";
import IFS02 from "../assets/Policies/ISP/PTB-ISMS-5002_ISMS_Roles_Responsibilities&Authorities.pdf";
import IFS03 from "../assets/Policies/ISP/PTB-ISMS-A508-Information_Security_Guideline_in_Project_Management.pdf";
import IFS04 from "../assets/Policies/ISP/PTB-ISMS-A512-Information_Classification_Policy.pdf";
import IFS05 from "../assets/Policies/ISP/PTB-ISMS-A513-Procedure_for_Information_Security_Labelling_and_Asset_Handling.pdf";
import IFS06 from "../assets/Policies/ISP/PTB-ISMS-A515-Access_Control_Policy.pdf";
import IFS07 from "../assets/Policies/ISP/PTB-ISMS-A515-User_Access_Management_Process.pdf";
import IFS08 from "../assets/Policies/ISP/PTB-ISMS-A519-Vendor_Information_Security_Evaluation_Procedure.pdf";
import IFS09 from "../assets/Policies/ISP/PTB-ISMS-A524-Incident_Response_Procedure.pdf";
import IFS10 from "../assets/Policies/ISP/PTB-ISMS-A531-ISMS-Legal_and_Regulatory_Requirements_Procedure.pdf";
import IFS11 from "../assets/Policies/ISP/PTB-ISMS-A532-Intellectual_Property_&_Copyright_Compliance_Policy.pdf";
import IFS12 from "../assets/Policies/ISP/PTB-ISMS-A706-Guidelines_for_Working_in_Secure_Areas.pdf";
import IFS13 from "../assets/Policies/ISP/PTB-ISMS-A714-Procedure_for_the_Management_of_Removable_Media.pdf";
import IFS14 from "../assets/Policies/ISP/PTB-ISMS-5001-Information_Security_Policy.pdf";
import RM01 from "../assets/Policies/RiskManagement/BUSINESS CONTINUITY POLICY- June 2023.pdf";
import RM02 from "../assets/Policies/RiskManagement/Corporate Business Continuity Plan - 2023.pdf";
import RM03 from "../assets/Policies/RiskManagement/Liquidity Risk Management Policy _ 2023.pdf";
import RM04 from "../assets/Policies/RiskManagement/Loss Data Management Policy.pdf";
import RM05 from "../assets/Policies/RiskManagement/Market Risk Management Policy _ 2023.pdf";
import RM06 from "../assets/Policies/RiskManagement/Operational Risk Management Policy.pdf";
import RM07 from "../assets/Policies/RiskManagement/Operational Risk Management - Standard Operating Proceedural Manual.pdf";
import Modal from "../components/Modal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Policies = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_AD_BASEURL;
  const { handleSubmit } = useForm();
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [staffName, setStaffName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffDepartment, setStaffDepartment] = useState("");
  const [staffBranch, setStaffBranch] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [status, setStatus] = useState(false);
  const [hasAttested, setHasAttested] = useState(false);

  const policies = [
    {
      policyName: "AML_CFT Policy",
      filePath: AML,
      hasAttested: false,
    },
    {
      policyName: "AML_CFT BOD Policy",
      filePath: AML_CFT,
      hasAttested: false,
    },
    {
      policyName: "Anti-bribery & Anti-corruption Policy",
      filePath: ANTIBRIBE,
      hasAttested: false,
    },
    {
      policyName: "Whistle Blowing Policy",
      filePath: WHISTLE,
      hasAttested: false,
    },
    {
      policyName: "Business Continuity Policy",
      filePath: RM01,
      hasAttested: false,
    },
    {
      policyName: "Corporate Business Continuity Plan",
      filePath: RM02,
      hasAttested: false,
    },
    {
      policyName: "Liquidity Risk Management Policy",
      filePath: RM03,
      hasAttested: false,
    },
    {
      policyName: "Loss Data Management Policy",
      filePath: RM04,
      hasAttested: false,
    },
    {
      policyName: "Market Risk Management Policy",
      filePath: RM05,
      hasAttested: false,
    },
    {
      policyName: "Operational Risk Management Policy",
      filePath: RM06,
      hasAttested: false,
    },
    {
      policyName:
        "Operational Risk Management - Standard Operating Proceedural Manual",
      filePath: RM07,
      hasAttested: false,
    },
    {
      policyName: "Information Security Policy Manual",
      filePath: INFOSECURITY,
      hasAttested: false,
    },
    {
      policyName: "PTB Cyber Incident Response Plan",
      filePath: IFS01,
      hasAttested: false,
    },
    {
      policyName: "ISMS Roles, Responsibilities and Authorities",
      filePath: IFS02,
      hasAttested: false,
    },
    {
      policyName: "Information Security Guideline in Project Management",
      filePath: IFS03,
      hasAttested: false,
    },
    {
      policyName: "Information Classification Policy",
      filePath: IFS04,
      hasAttested: false,
    },
    {
      policyName:
        "Procedure for Information Security Labelling and Asset Handling",
      filePath: IFS05,
      hasAttested: false,
    },
    {
      policyName: "Access Control Policy",
      filePath: IFS06,
      hasAttested: false,
    },
    {
      policyName: "User Access Management Process",
      filePath: IFS07,
      hasAttested: false,
    },
    {
      policyName: "Vendor Information Security Evaluation Procedure",
      filePath: IFS08,
      hasAttested: false,
    },
    {
      policyName: "Incident Response Procedure",
      filePath: IFS09,
      hasAttested: false,
    },
    {
      policyName: "ISMS Legal and Regulatory Requirements Procedure",
      filePath: IFS10,
      hasAttested: false,
    },
    {
      policyName: "Intellectual Property & Copyright Compliance Policy",
      filePath: IFS11,
      hasAttested: false,
    },
    {
      policyName: "Guidelines for Working in Secure Areas",
      filePath: IFS12,
      hasAttested: false,
    },
    {
      policyName: "Procedure for the Management of Removable Media",
      filePath: IFS13,
      hasAttested: false,
    },
    {
      policyName: "ISMS Policy",
      filePath: IFS14,
      hasAttested: false,
    },
    {
      policyName: "Code of Conduct & Ethics",
      filePath: CODE_OF_CONDUCT,
      hasAttested: false,
    },
    {
      policyName: "Employee Dating Policy",
      filePath: DATING,
      hasAttested: false,
    },
    {
      policyName: "Employee Handbook",
      filePath: HANDBOOK,
      hasAttested: false,
    },
  ];

  const handleChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleMenuItemClick = (menuItemValue) => {
    setSelectedMenuItem(menuItemValue);
  };

  const handleOpenModal = (data) => {
    setModal(true);
    setModalData(data);
    handleStatusCheck();
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    userDetails(user.givenname);
    handleStatusCheck();
    console.log(selectedMenuItem, "checking policyName");
  }, [selectedMenuItem]);

  const userDetails = async (_email) => {
    if (_email) {
      await axios
        .post(
          `${apiURL}/GetUserInfoByEmail?email=${_email}@premiumtrustbank.com`
        )
        .then((response) => {
          console.log(response.data, "userdetails");
          let info;
          info = response.data.data;
          setStaffName(info.fullName);
          setStaffEmail(info.email);
          setStaffBranch(info.streetAddress);
          setStaffDepartment(info.department);
        });
    }
  };

  const handleAttestation = () => {
    const url =
      "http://192.168.201.57:8065/api/PolicyAttestation/LogEmployeePolicyAttestation";
    const payload = {
      staffName: staffName,
      staffId: staffId,
      staffEmail: staffEmail,
      staffBranch: staffBranch,
      staffDepartment: staffDepartment,
      policyName: selectedMenuItem,
      attestationName: selectedMenuItem,
      status: status,
    };
    axios.post(url, payload).then((res) => {
      console.log(res.data);
      alert(res.data.responseMessage);
      handleStatusCheck();
    });
  };

  // function to check user attestation status
  const handleStatusCheck = () => {
    const url =
      "http://192.168.201.57:8065/api/PolicyAttestation/CheckEmployeePolicyAttestationStatus";
    const payload = {
      staffEmail: staffEmail,
      policyName: selectedMenuItem,
    };
    axios.post(url, payload).then((res) => {
      console.log(res.data);
      setHasAttested(res.data.hasAttested);
    });
  };
  return (
    <>
      <Fragment>
        <div className="w-full h-[89vh] bg-white flex justify-center overflow-auto">
          <div className="grid grid-cols-3 gap-8 mt-10 mx-6">
            {policies.map((policy) => (
              <div
                onClick={() => {
                  handleOpenModal(policy);
                  handleMenuItemClick(policy.policyName);
                }}
                className="bg-[#2b2e35]/50 w-full h-full rounded text-white p-2 cursor-pointer"
              >
                {policy.policyName}
              </div>
            ))}
          </div>
        </div>
        <Modal
          isVisible={modal}
          onClose={() => {
            setModal(false);
            setModalData(null);
          }}
        >
          <iframe
            src={`${modalData?.filePath}`}
            title={`${modalData?.policyName}`}
            style={{ width: "78vw", height: "75vh" }}
          />
          <div>
            {!hasAttested ? (
              <form
                className="flex flex-col mx-4"
                onSubmit={handleSubmit(handleAttestation)}
              >
                <div class="flex items-center my-4">
                  <input
                    id="checkbox"
                    type="checkbox"
                    value={status}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label for="checkbox" class="ml-2 font-medium text-gray-500">
                    I have read and acknowledged this policy
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-red-600 w-[150px] h-12 rounded uppercase text-white font-semibold cursor-pointer hover:bg-red-900 disabled:bg-red-200"
                  disabled={!status}
                >
                  accept
                </button>
              </form>
            ) : (
              <div className="py-4 text-xl text-red-600 font-semibold">
                I have attested!
              </div>
            )}
          </div>
        </Modal>
      </Fragment>
    </>
  );
};

export default Policies;
