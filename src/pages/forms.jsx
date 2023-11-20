import React, { Fragment, useState } from "react";
import FORM1 from "../assets/forms/account_migration_form.pdf";
import FORM2 from "../assets/forms/account_update_form.pdf";
import FORM3 from "../assets/forms/bvn_form.pdf";
import FORM4 from "../assets/forms/cheque_delivery_form.pdf";
import FORM5 from "../assets/forms/corporate_accountOpening_form.pdf";
import FORM6 from "../assets/forms/corporateInternetBanking.pdf";
import FORM7 from "../assets/forms/dispute_form.pdf";
import FORM8 from "../assets/forms/email_indemnity_form.pdf";
import FORM9 from "../assets/forms/fxForm.pdf";
import FORM10 from "../assets/forms/individual_accountOpening.pdf";
import FORM11 from "../assets/forms/KYC_form.pdf";
import FORM12 from "../assets/forms/limit&Indemnity_form.pdf";
import FORM13 from "../assets/forms/limit&Indemnity_form-INDIVIDUAL.pdf";
import FORM14 from "../assets/forms/mandateCard.pdf";
import FORM15 from "../assets/forms/new_multiple_local_funds_transfer_form.pdf";
import FORM16 from "../assets/forms/referenceForm.pdf";
import FORM17 from "../assets/forms/sms&Email_alert_form.pdf";
import FORM18 from "../assets/forms/statementOfAccount.pdf";
import Modal from "../components/Modal";

const Forms = () => {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [template, setTemplate] = useState(false);
  const [templateData, setTemplateData] = useState(null);
  const forms = [
    {
      formName: "Account Migration",
      filePath: FORM1,
    },
    {
      formName: "Account Update",
      filePath: FORM2,
    },
    {
      formName: "BVN",
      filePath: FORM3,
    },
    {
      formName: "Cheque delivery",
      filePath: FORM4,
    },
    {
      formName: "Corporate Account Opening",
      filePath: FORM5,
    },
    {
      formName: "Corporate Internet Banking",
      filePath: FORM6,
    },
    {
      formName: "Dispute",
      filePath: FORM7,
    },
    {
      formName: "Email Indemnity",
      filePath: FORM8,
    },
    {
      formName: "Foreign Exchange (FX)",
      filePath: FORM9,
    },
    {
      formName: "Individual Account Opening",
      filePath: FORM10,
    },
    {
      formName: "KYC",
      filePath: FORM11,
    },
    {
      formName: "Limit & Indemnity",
      filePath: FORM12,
    },
    {
      formName: "Limit & Indemnity (Individual)",
      filePath: FORM13,
    },
    {
      formName: "Mandate Card",
      filePath: FORM14,
    },
    {
      formName: "Multiple Local Funds Transfer",
      filePath: FORM15,
    },
    {
      formName: "Reference Form",
      filePath: FORM16,
    },
    {
      formName: "SMS & Email Alert",
      filePath: FORM17,
    },
    {
      formName: "Statement Of Account",
      filePath: FORM18,
    },
  ];
  const templates = [
    {
      templateName: "Account Retrieval Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">
            Account Retrieval Register:-
            <span className="ml-2 font-medium">
              All account packages picked up by Compliance/Account officers must
              be duly signed for before release
            </span>
          </div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/no</th>
                  <th className="p-4">Account Name</th>
                  <th className="p-4">Account Number</th>
                  <th className="p-4">receiver's name</th>
                  <th className="p-4">receiver's signature</th>
                  <th className="p-4">date collected</th>
                  <th className="p-4">date returned</th>
                  <th className="p-4">customer's signature</th>
                  <th className="p-4">remark</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Attendance Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">Attendance Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">name</th>
                  <th className="p-4">time in</th>
                  <th className="p-4">signature</th>
                  <th className="p-4">time out</th>
                  <th className="p-4">signature</th>
                  <th className="p-4">designation</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "ATM Card Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">ATM Card Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">date</th>
                  <th className="p-4">Account number</th>
                  <th className="p-4">card pan (first six)</th>
                  <th className="p-4">card pan (last four)</th>
                  <th className="p-4">collected by</th>
                  <th className="p-4">customer's signature</th>
                  <th className="p-4">date</th>
                  <th className="p-4">cso</th>
                  <th className="p-4">bsm</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "ATM Load & Unload Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">
            ATM Load & Unload Register
          </div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">sop</th>
                  <th className="p-4">cash</th>
                  <th className="p-4">amount loaded</th>
                  <th className="p-4">time</th>
                  <th className="p-4">co </th>
                  <th className="p-4">bsm</th>
                </tr>
                <tr>
                  <th className="p-4">reject</th>
                </tr>
                <tr>
                  <th className="p-4">casette1</th>
                </tr>
                <tr>
                  <th className="p-4">total</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "BC Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">BC Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">date</th>
                  <th className="p-4">cheque no.</th>
                  <th className="p-4">Account name</th>
                  <th className="p-4">account number</th>
                  <th className="p-4">signatory 1</th>
                  <th className="p-4">signatory 2</th>
                  <th className="p-4">amount</th>
                  <th className="p-4">beneficiary name</th>
                  <th className="p-4">collected by</th>
                  <th className="p-4">bc liquidation date</th>
                  <th className="p-4">instrument number</th>
                  <th className="p-4">sign</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "BC Stock Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">BC Stock Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">date</th>
                  <th className="p-4">start cheque no</th>
                  <th className="p-4">start date</th>
                  <th className="p-4">end date</th>
                  <th className="p-4">bsm signature</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Callover Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">Callover Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/no</th>
                  <th className="p-4"> Name of teller</th>
                  <th className="p-4">total number of tickets</th>
                  <th className="p-4">called over by</th>
                  <th className="p-4">teller's signature</th>
                  <th className="p-4">bsm's signature</th>
                  <th className="p-4">Compliance</th>
                  <th className="p-4">remarks</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Cancelled BC Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">Cancelled BC Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">date</th>
                  <th className="p-4">cheque no</th>
                  <th className="p-4">reason</th>
                  <th className="p-4">t.o signature</th>
                  <th className="p-4">bsm signature</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Deferral Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">Deferral Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/no</th>
                  <th className="p-4"> Account Name</th>
                  <th className="p-4">account number</th>
                  <th className="p-4">document deferred</th>
                  <th className="p-4">approval date</th>
                  <th className="p-4">expiry date</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Cheque Book Collection Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">
            Cheque Book Collection Register
          </div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">date</th>
                  <th className="p-4">Account Name</th>
                  <th className="p-4">Account Number</th>
                  <th className="p-4">number of leaves</th>
                  <th className="p-4">collected by</th>
                  <th className="p-4">date</th>
                  <th className="p-4">sign</th>
                  <th className="p-4">micr</th>
                  <th className="p-4">cso</th>
                  <th className="p-4">bsm</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Chequebook Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">Chequebook Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/n</th>
                  <th className="p-4">date</th>
                  <th className="p-4">account Name</th>
                  <th className="p-4">account number</th>
                  <th className="p-4">cheque range (101 - 200)</th>
                  <th className="p-4">control number start</th>
                  <th className="p-4">control number end</th>
                  <th className="p-4">date delivered</th>
                  <th className="p-4">received by</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: " Counter Cheque Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">
            Counter Cheque Register
          </div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/n</th>
                  <th className="p-4">date</th>
                  <th className="p-4">cheque number</th>
                  <th className="p-4">account Name</th>
                  <th className="p-4">account number</th>
                  <th className="p-4">signatory</th>
                  <th className="p-4">amount</th>
                  <th className="p-4">signature</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Key Roaster Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">Key Roaster Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/no</th>
                  <th className="p-4">Name of officer</th>
                  <th className="p-4">keyholding duration</th>
                  <th className="p-4">signature & date</th>
                  <th className="p-4">handing over officer</th>
                  <th className="p-4">signature & date</th>
                  <th className="p-4">remarks</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Outward Clearing Cheque",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">
            Outward Clearing Cheque
          </div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">Account Name</th>
                  <th className="p-4">Account Number</th>
                  <th className="p-4">cheque no</th>
                  <th className="p-4">amount</th>
                  <th className="p-4">bank</th>
                  <th className="p-4">depositor's name</th>
                  <th className="p-4">t.o sign</th>
                  <th className="p-4">bsm</th>
                  <th className="p-4">date</th>
                  <th className="p-4">t.o sign</th>
                  <th className="p-4">bsm sign</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Outward Returned Cheques",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">
            Outward Returned Cheques
          </div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">date</th>
                  <th className="p-4">Account Name</th>
                  <th className="p-4">Account Number</th>
                  <th className="p-4">cheque no</th>
                  <th className="p-4">amount</th>
                  <th className="p-4">reason for return</th>
                  <th className="p-4">collected by</th>
                  <th className="p-4">sign</th>
                  <th className="p-4">date</th>
                  <th className="p-4">t.o sign</th>
                  <th className="p-4">bsm sign</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "PIN Change Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">
            PIN Change Register:-
            <span className="ml-2 font-medium">
              ATM card pin change request must be registered in this format
            </span>
          </div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/no</th>
                  <th className="p-4">Account Name</th>
                  <th className="p-4">Account Number</th>
                  <th className="p-4">pin changed by</th>
                  <th className="p-4">pin change date</th>
                  <th className="p-4">customer's signature</th>
                  <th className="p-4">cso</th>
                  <th className="p-4">bsm</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Statement Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">Statement Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/no</th>
                  <th className="p-4">Account Name</th>
                  <th className="p-4">Account Number</th>
                  <th className="p-4">purpose</th>
                  <th className="p-4">number of pages</th>
                  <th className="p-4">charges</th>
                  <th className="p-4">collected by</th>
                  <th className="p-4">date</th>
                  <th className="p-4">customer's signature</th>
                  <th className="p-4">cso</th>
                  <th className="p-4">bsm</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Vault People Movement Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">
            Vault People Movement Register
          </div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">date</th>
                  <th className="p-4"> Name</th>
                  <th className="p-4">designation</th>
                  <th className="p-4">reason for going into the vault</th>
                  <th className="p-4">time in</th>
                  <th className="p-4">sign in</th>
                  <th className="p-4">time out</th>
                  <th className="p-4">sign out</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Outgoing & Incoming Mail Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">
            Outgoing & Incoming Mail Register
          </div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/no</th>
                  <th className="p-4">sender's name</th>
                  <th className="p-4">document type</th>
                  <th className="p-4">sender's address</th>
                  <th className="p-4">destination</th>
                  <th className="p-4">date</th>
                  <th className="p-4">sign</th>
                  <th className="p-4">dispatch rider's name</th>
                  <th className="p-4">sign</th>
                  <th className="p-4">date</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Token Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">Token Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/no</th>
                  <th className="p-4">account Name</th>
                  <th className="p-4">account number</th>
                  <th className="p-4">token serial number</th>
                  <th className="p-4">received by</th>
                  <th className="p-4">date</th>
                  <th className="p-4">sign</th>
                  <th className="p-4">bsm's signature</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "PTA BTA Register",
      content: (
        <div className="m-4">
          <div className="font-semibold text-black">PTA BTA Register</div>
          <div className="flex items-center justify-center py-4">
            <table className="table bg-white text-sm text-left text-black px-4 border border-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold uppercase">
                <tr>
                  <th className="p-4">s/n</th>
                  <th className="p-4">date</th>
                  <th className="p-4">account Name</th>
                  <th className="p-4">account number</th>
                  <th className="p-4">amount disbursed</th>
                  <th className="p-4">customer's signature</th>
                  <th className="p-4">processed by</th>
                  <th className="p-4"> signature</th>
                  <th className="p-4">authorized by</th>
                  <th className="p-4">signature</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      ),
    },
    {
      templateName: "Teller Till Register",
      content: (
        <div className="m-4">
          <div className="font-bold text-xl text-black">
            Teller Till Register
          </div>
          <div className="grid justify-center py-2">
            <div className="uppercase text-xl mb-4">
              <p>opening balance</p>
              <p>vault out</p>
              <p>cash credit</p>
              <p>gl credit</p>
              <p className="font-bold">total 1</p>
            </div>
            <div className="uppercase text-xl mb-4">
              <p>vault in</p>
              <p>cash debit</p>
              <p>gl debit</p>
              <p className="font-bold">total 2</p>
            </div>
            <div className="uppercase text-xl mb-4 flex">
              <p>total 1 - total 2 </p>
              <p className="font-bold mx-2">= till</p>
            </div>
            <div className="uppercase text-xl font-bold">till breakdown</div>
          </div>
        </div>
      ),
    },
  ];

  const handleMenuItemClick = (menuItemValue) => {
    setSelectedMenuItem(menuItemValue);
  };

  const handleOpenModal = (data) => {
    setModal(true);
    setModalData(data);
  };

  const handleOpenTemplateModal = (data) => {
    setTemplate(true);
    setTemplateData(data);
  };
  return (
    <div className="w-full h-[89vh] overflow-auto">
      <div>
        <div className="text-2xl font-semibold px-6 my-2">FORMS</div>
        <Fragment>
          <div className="flex justify-center overflow-auto px-6">
            <div className="w-full grid grid-cols-3 gap-6">
              {forms.map((form) => (
                <div
                  onClick={() => {
                    handleOpenModal(form);
                    handleMenuItemClick(form.formName);
                  }}
                  className="bg-[#2b2e35] text-white text-center p-4 rounded-lg cursor-pointer uppercase"
                >
                  {form.formName}
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
              title={`${modalData?.formName}`}
              style={{ width: "78vw", height: "75vh" }}
            />
          </Modal>
        </Fragment>
      </div>
      <div>
        <div className="text-2xl font-semibold px-6 my-2">TEMPLATES</div>
        <Fragment>
          <div className="flex justify-center overflow-auto px-6">
            <div className="w-full grid grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  onClick={() => {
                    handleOpenTemplateModal(template);
                    handleMenuItemClick(template.templateName);
                  }}
                  className="bg-[#2b2e35] text-white text-center p-4 rounded-lg cursor-pointer uppercase"
                >
                  {template.templateName}
                </div>
              ))}
            </div>
          </div>
          <Modal
            isVisible={template}
            onClose={() => {
              setTemplate(false);
              setTemplateData(null);
            }}
          >
            <div>{templateData?.content}</div>
            {/* <iframe
              src={`${templateData?.content}`}
              title={`${templateData?.templateName}`}
              style={{ width: "78vw", height: "75vh" }}
            /> */}
          </Modal>
        </Fragment>
      </div>
    </div>
  );
};

export default Forms;
