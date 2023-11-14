import React, { useState } from "react";
import Modal from "../components/Modal";
import FCYASSET from "../assets/Processes/Treasury/fcyAsset.pdf";
import LCYASSET from "../assets/Processes/Treasury/lcyAsset.pdf";
import PMPROCESS from "../assets/Processes/ProjectMG/pmProcesses.pdf";
import PMG1 from "../assets/Processes/PeopleMG/employeeWellness.pdf";
import PMG2 from "../assets/Processes/PeopleMG/learning&development.pdf";
import PMG3 from "../assets/Processes/PeopleMG/onboarding.pdf";
import PMG4 from "../assets/Processes/PeopleMG/performance.pdf";
import PMG5 from "../assets/Processes/PeopleMG/rewards.pdf";
import LEGAL1 from "../assets/Processes/Legal/ASSET MANAGEMENT PROCESS.pdf";
import LEGAL2 from "../assets/Processes/Legal/BANK TRANSACTION PROCESS.pdf";
import LEGAL3 from "../assets/Processes/Legal/DISPUTE RESOLUTION PROCESS.pdf";
import LEGAL4 from "../assets/Processes/Legal/EVALUATION AND SECURITY DOCUMENTATION PROCESS.pdf";
import LEGAL5 from "../assets/Processes/Legal/GENERAL COMPANY SECTERIAT PROCESS.pdf";
import LEGAL6 from "../assets/Processes/Legal/LEGAL GROUP SERVICES SOP.pdf";
import LEGAL7 from "../assets/Processes/Legal/OTHER MISCELLANEOUS PROCESS.pdf";

import IT1 from "../assets/Processes/IT/Change_Approval_Authority.pdf";
import IT2 from "../assets/Processes/IT/Change_Management_Process.pdf";
import CUSTOMER1 from "../assets/Processes/CustomerExperience/customerExperience.pdf";
import CUSTOMER2 from "../assets/Processes/CustomerExperience/emailProcess.pdf";
import CUSTOMER3 from "../assets/Processes/CustomerExperience/inbound_Complaints.pdf";
import CUSTOMER4 from "../assets/Processes/CustomerExperience/inbound_Enquiry.pdf";
import CUSTOMER5 from "../assets/Processes/CustomerExperience/inbound_Requests.pdf";
import CUSTOMER6 from "../assets/Processes/CustomerExperience/process_flow_for_all_customers.pdf";
import CORPORATE1 from "../assets/Processes/CorporateServices/facilityManagement.pdf";
import CORPORATE2 from "../assets/Processes/CorporateServices/procurement.pdf";
import CORPORATE3 from "../assets/Processes/CorporateServices/Protocol.pdf";
import CORPORATE4 from "../assets/Processes/CorporateServices/Security.pdf";
import COMPLIANCE1 from "../assets/Processes/Compliance/BRD_Compliance_Unauthorised_PNDRemoval.pdf";
import COMPLIANCE2 from "../assets/Processes/Compliance/Deferral_Workflow.pdf";
import COMPLIANCE3 from "../assets/Processes/Compliance/Ultimate_Beneficial_Owner_Register.pdf";
import BS from "../assets/Processes/BankingServices/operationManual.pdf";

const Processes = () => {
  const groups = [
    {
      name: "Banking Services",
      processFiles: [
        {
          processName: "Banking Services Operation Manual",
          filePath: BS,
        },
      ],
    },
    {
      name: "Central Operations ",
    },
    {
      name: "Conduct & Compliance ",
      processFiles: [
        {
          processName: "BRD Compliance Unauthorized PND Removal",
          filePath: COMPLIANCE1,
        },
        {
          processName: "Deferral Workflow",
          filePath: COMPLIANCE2,
        },
        {
          processName: "Ultimate Beneficial Owner Register",
          filePath: COMPLIANCE3,
        },
      ],
    },
    {
      name: "Corporate Services",
      processFiles: [
        {
          processName: "Facility Management & Brand Developement",
          filePath: CORPORATE1,
        },
        {
          processName: "Procurement & Vendor Management",
          filePath: CORPORATE2,
        },
        {
          processName: "Protocol, Fleet & Logistics",
          filePath: CORPORATE3,
        },
        {
          processName: "Security",
          filePath: CORPORATE4,
        },
      ],
    },
    {
      name: "Customer Experience",
      processFiles: [
        {
          processName: "Customer Experience Management Process",
          filePath: CUSTOMER1,
        },
        {
          processName: "Email Process",
          filePath: CUSTOMER2,
        },
        {
          processName: "Inbound Process Activity (Complaints)",
          filePath: CUSTOMER3,
        },
        {
          processName: "Inbound Process Activity (Inquiry)",
          filePath: CUSTOMER4,
        },
        {
          processName: "Inbound Process Activity (Request)",
          filePath: CUSTOMER5,
        },
        {
          processName: "Process Flow For All Customer Interactions",
          filePath: CUSTOMER6,
        },
      ],
    },
    {
      name: "Finance",
    },
    {
      name: "Information Technology",
      processFiles: [
        {
          processName: "Change Approval Authority",
          filePath: IT1,
        },
        {
          processName: "Change Management Process",
          filePath: IT2,
        },
      ],
    },
    {
      name: "International Trade Services",
    },
    {
      name: "Legal Services",
      processFiles: [
        {
          processName: "Asset Management Process",
          filePath: LEGAL1,
        },
        {
          processName: "Bank Transaction Process",
          filePath: LEGAL2,
        },
        {
          processName: "Dispute Resolution Process",
          filePath: LEGAL3,
        },
        {
          processName: "Evaluation & Security Documentation Process",
          filePath: LEGAL4,
        },
        {
          processName: "General Company Secteriat Process",
          filePath: LEGAL5,
        },
        {
          processName: "Legal Group Services SOP",
          filePath: LEGAL6,
        },
        {
          processName: "Miscellaneous Process",
          filePath: LEGAL7,
        },
      ],
    },
    {
      name: "People Manangement Group",
      processFiles: [
        {
          processName: "Employee Services & Wellness Process",
          filePath: PMG1,
        },
        {
          processName: "Email Process",
          filePath: PMG2,
        },
        {
          processName: "Onboarding Process",
          filePath: PMG3,
        },
        {
          processName: "Performance & People Analytics Process",
          filePath: PMG4,
        },
        {
          processName: "Rewards Process",
          filePath: PMG5,
        },
      ],
    },
    {
      name: "Project Management Group",
      processFiles: [
        {
          processName: "Project Management Processes",
          filePath: PMPROCESS,
        },
      ],
    },
    {
      name: "Treasury",
      processFiles: [
        {
          processName: "FCY Asset & Liability Management",
          filePath: FCYASSET,
        },
        {
          processName: "LCY Asset & Liability Management",
          filePath: LCYASSET,
        },
      ],
    },
  ];

  const [selectedGroup, setSelectedGroup] = useState({});
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [modal, setModal] = useState(false);

  const openModal = (group, process) => {
    setSelectedGroup(group);
    setSelectedProcess(process);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedGroup({});
    setSelectedProcess(null);
    setModal(false);
  };
  return (
    <div className="flex items-center justify-center my-10">
      <div className="grid grid-cols-3 gap-10">
        {groups.map((group) => (
          <div
            key={group.name}
            className="bg-[#2b2e35] text-white text-center font-semibold p-4 rounded-lg shadow-xl cursor-pointer"
            onClick={() => {
              setSelectedGroup(group);
              setSelectedProcess(null);
              setModal(true);
            }}
          >
            {group.name}
          </div>
        ))}
      </div>
      {selectedGroup && (
        <Modal isVisible={modal} onClose={closeModal}>
          {selectedGroup.processFiles ? (
            selectedProcess ? (
              // Display file if a process is selected
              <iframe
                src={selectedProcess.filePath}
                title={selectedProcess.processName}
                style={{ width: "78vw", height: "75vh" }}
              />
            ) : (
              // Display the list of process names for the selected group
              <div>
                <h2 className="text-black text-xl mb-2 font-semibold">
                  {selectedGroup.name} Processes
                </h2>
                {selectedGroup.processFiles.length > 10 ? (
                  // Use grid layout if the number of processes exceeds 10
                  <div className="grid grid-cols-2 gap-4">
                    {selectedGroup.processFiles.map((process) => (
                      <div
                        key={process.processName}
                        className="cursor-pointer hover:underline"
                        onClick={() => openModal(selectedGroup, process)}
                      >
                        {process.processName}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Use list layout if the number of processes is 10 or less
                  <ul className="text-black">
                    {selectedGroup.processFiles.map((process) => (
                      <li
                        key={process.processName}
                        className="cursor-pointer hover:underline py-2"
                        onClick={() => openModal(selectedGroup, process)}
                      >
                        {process.processName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          ) : (
            <div>No processes available for this group.</div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default Processes;
