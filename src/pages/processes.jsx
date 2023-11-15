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
import ITS1 from "../assets/Processes/ITS/billsCollector.pdf";
import ITS2 from "../assets/Processes/ITS/capitalImportation.pdf";
import ITS3 from "../assets/Processes/ITS/domFunds.pdf";
import ITS4 from "../assets/Processes/ITS/electronicForms.pdf";
import ITS5 from "../assets/Processes/ITS/exportTransactions.pdf";
import ITS6 from "../assets/Processes/ITS/foreignExchange.pdf";
import ITS7 from "../assets/Processes/ITS/guarantee.pdf";
import ITS8 from "../assets/Processes/ITS/invisibleTransaction.pdf";
import ITS9 from "../assets/Processes/ITS/inwardFunds.pdf";
import ITS10 from "../assets/Processes/ITS/ITS.pdf";
import ITS11 from "../assets/Processes/ITS/lettersOfCredit.pdf";
import ITS12 from "../assets/Processes/ITS/miscellanous.pdf";
import ITS13 from "../assets/Processes/ITS/ptaProcessFlow.pdf";
import ITS14 from "../assets/Processes/ITS/reports&returns.pdf";
import ITS15 from "../assets/Processes/ITS/smallEnterpriseRemittance.pdf";
import ITS16 from "../assets/Processes/ITS/transactionDynamics.pdf";
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
import COO1 from "../assets/Processes/CentralOperation/cashAdvance.pdf";
import COO2 from "../assets/Processes/CentralOperation/brdExpense.pdf";
import COO3 from "../assets/Processes/CentralOperation/ARBITER _ADJUSTMENT.pdf";
import COO4 from "../assets/Processes/CentralOperation/Card_Services.pdf";
import COO5 from "../assets/Processes/CentralOperation/Cards_Operations.pdf";
import COO6 from "../assets/Processes/CentralOperation/centralClearing.pdf";
import COO7 from "../assets/Processes/CentralOperation/DISPUTE_RESOLUTION.pdf";
import COO8 from "../assets/Processes/CentralOperation/e-Tranzact.pdf";
import COO9 from "../assets/Processes/CentralOperation/financeOperationManual.pdf";
import COO10 from "../assets/Processes/CentralOperation/LSRev-Pay.pdf";
import COO11 from "../assets/Processes/CentralOperation/MasterCard.pdf";
import COO12 from "../assets/Processes/CentralOperation/NAPS.pdf";
import COO13 from "../assets/Processes/CentralOperation/NIP_FAILED_TRANSACTION.pdf";
import COO14 from "../assets/Processes/CentralOperation/NIP_SETTLMENT_PROCESS.pdf";
import COO15 from "../assets/Processes/CentralOperation/PAYDirectAdministration.pdf";
import COO16 from "../assets/Processes/CentralOperation/PAYDirectCollection.pdf";
import COO17 from "../assets/Processes/CentralOperation/PAYU_SETTLEMENT.pdf";
import COO18 from "../assets/Processes/CentralOperation/PIN_Administration.pdf";
import COO19 from "../assets/Processes/CentralOperation/PREMIUM_MOBILE.pdf";
import COO20 from "../assets/Processes/CentralOperation/PREMIUM_VTU.pdf";
import COO21 from "../assets/Processes/CentralOperation/PTB_BILL_PAYMENT.pdf";
import COO22 from "../assets/Processes/CentralOperation/REGULATORY_Reporting.pdf";
import COO23 from "../assets/Processes/CentralOperation/REMITA_Profiling.pdf";
import COO24 from "../assets/Processes/CentralOperation/Remita_reconciliation.pdf";
import COO25 from "../assets/Processes/CentralOperation/STAMPDUTY_Remittance.pdf";
import COO26 from "../assets/Processes/CentralOperation/VERVECARD_SETTLEMENT.pdf";
import COO27 from "../assets/Processes/CentralOperation/VISA_Credit-Debit_Card_Settlement.pdf";

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
      processFiles: [
        {
          processName: "Automation Of Cash Advance Requests",
          filePath: COO1,
        },
        {
          processName: "Automation Of Expense Processes",
          filePath: COO2,
        },
        {
          processName: "Arbiter Adjustment",
          filePath: COO3,
        },
        {
          processName: "Card Services",
          filePath: COO4,
        },
        {
          processName: "Card Operations Function",
          filePath: COO5,
        },
        {
          processName: "Central Clearing Process",
          filePath: COO6,
        },
        {
          processName: "Dispute Resolution",
          filePath: COO7,
        },
        {
          processName: "E-Transact",
          filePath: COO8,
        },
        {
          processName: "Finance Operation Manual",
          filePath: COO9,
        },
        {
          processName: "Lagos State Rev-Pay",
          filePath: COO10,
        },
        {
          processName: "Master Card Settlement",
          filePath: COO11,
        },
        {
          processName: "NIBSS Automated Payment System",
          filePath: COO12,
        },
        {
          processName: "NIP Failed Transactions",
          filePath: COO13,
        },
        {
          processName: "NIP Settlement Process",
          filePath: COO14,
        },
        {
          processName: " PAY Direct Administration",
          filePath: COO15,
        },
        {
          processName: "PAY Direct Collection",
          filePath: COO16,
        },
        {
          processName: "PAYU Settlement",
          filePath: COO17,
        },
        {
          processName: "PIN Administration",
          filePath: COO18,
        },
        {
          processName: "Premium Mobile",
          filePath: COO19,
        },
        {
          processName: "Premium VTU",
          filePath: COO20,
        },
        {
          processName: "Premium Bank Bill Payment",
          filePath: COO21,
        },
        {
          processName: "Regulatory Reporting",
          filePath: COO22,
        },
        {
          processName: "Remita Profiling",
          filePath: COO23,
        },
        {
          processName: "Remita Reconcilliation",
          filePath: COO24,
        },
        {
          processName: "Stamp Duty Remittance",
          filePath: COO25,
        },
        {
          processName: "Verve Card Settlment",
          filePath: COO26,
        },
        {
          processName: "Visa Credit/Debit Card Settlement",
          filePath: COO27,
        },
      ],
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
      processFiles: [
        {
          processName: "Bills For Collection",
          filePath: ITS1,
        },
        {
          processName: "Capital Importation",
          filePath: ITS2,
        },
        {
          processName: "Domicilliary Funds Transfer",
          filePath: ITS3,
        },
        {
          processName: "Electronic Form Transaction",
          filePath: ITS4,
        },
        {
          processName: "Export Transaction Process",
          filePath: ITS5,
        },
        {
          processName: "Foreign Exchange Sales To Customers",
          filePath: ITS6,
        },
        {
          processName: "Guarantees",
          filePath: ITS7,
        },
        {
          processName: "Invisible Transaction",
          filePath: ITS8,
        },
        {
          processName: "Inwards Funds Transfer",
          filePath: ITS9,
        },
        {
          processName: "International Trade Services",
          filePath: ITS10,
        },
        {
          processName: "Letter Of Credit",
          filePath: ITS11,
        },
        {
          processName: "Miscellanous Process",
          filePath: ITS12,
        },
        {
          processName: "PTA Process Flow",
          filePath: ITS13,
        },
        {
          processName: "Reports & Returns",
          filePath: ITS14,
        },
        {
          processName: "Small Enterprise Remittance",
          filePath: ITS15,
        },
        {
          processName: "Transaction Dynamics",
          filePath: ITS16,
        },
      ],
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
