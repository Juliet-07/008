import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiDotsVertical } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import Modal from "../../../components/Modal";
import { toast } from "react-toastify";

("http://192.168.207.18:1230/api/Moderators/GetAllPendingCampaigns");

const PendingCampaign = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_GET_IDEA_HUB_MODERATOR;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const tableRef = useRef(null);
  const [pendingCampaign, setPendingCampaign] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [details, setDetails] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState("");

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = pendingCampaign.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pendingCampaign.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const GetPendingCampaigns = () => {
    const url = `${apiURL}/GetAllPendingCampaigns`;
    axios.get(url).then((response) => {
      console.log(response.data, "Pending Campaign");
      setPendingCampaign(response.data.responseValue);
    });
  };

  useEffect(() => {
    GetPendingCampaigns();
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

  const handleAuthorization = (e, dud) => {
    setConfirmationAction("approve");
    setConfirmationModalOpen(true);
    setSelectedRowData(dud);
  };

  const handleDecline = (e, idea) => {
    setConfirmationAction("decline");
    setConfirmationModalOpen(true);
    setSelectedRowData(idea);
  };

  const handleConfirmation = async (e, idea) => {
    setConfirmationModalOpen(false);
    let campaignId = selectedRowData.campaignId;

    // Perform the action based on the confirmationAction state
    if (confirmationAction === "approve") {
      const urlApproved = `${apiURL}/UpdateCampaignApprovalStatus?campaignId=${campaignId}&statusCode=${3}`;
      await axios
        .post(urlApproved)
        .then(
          (response) => (
            console.log(response, "response from authorizer"),
            toast.success("Authorization Status:" + response.data.responseMessage)
          )
        );
    } else if (confirmationAction === "decline") {
      const urlDeclined = `${apiURL}/UpdateCampaignApprovalStatus?campaignId=${campaignId}&statusCode=${4}`;
      await axios
        .post(urlDeclined)
        .then(
          (response) => (
            console.log(response, "response from authorizer"),
            toast.success("Authorization Status:" + response.data.responseMessage)
          )
        );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="font-bold text-2xl uppercase mb-2">
          idea campaign for approval
        </div>
        <div className="w-full rounded-lg bg-white p-4 max-w-full overflow-x-auto">
          <div className="flex flex-col items-center justify-center">
            <table
              ref={tableRef}
              className="table bg-white text-sm text-left text-black px-4 w-full"
            >
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                <th className="p-4">Campaign Category</th>
                <th className="p-4">Campaign Name</th>
                <th className="p-4">Initiated By</th>
                <th className="p-4">Initiator Branch</th>
                <th className="p-4">Date Initiated</th>
                <th className="p-4"></th>
                <th className="p-4"></th>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((idea, index) => {
                    return (
                      <tr>
                        <td className="p-4">{idea.campaignCategory}</td>
                        <td className="p-4">{idea.campaignName}</td>
                        <td className="p-4">{idea.createdBy}</td>
                        <td className="p-4">{idea.initiatorBranch}</td>
                        <td className="p-4">{idea.createdDate}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-between cursor-pointer">
                            <BsFillCheckCircleFill
                              size={20}
                              color="green"
                              onClick={(e) => handleAuthorization(e, idea)}
                            />
                            <IoTrashBinSharp
                              size={20}
                              color="red"
                              className="ml-2"
                              onClick={(e) => handleDecline(e, idea)}
                            />
                          </div>
                        </td>
                        <Modal
                          isVisible={confirmationModalOpen}
                          onClose={() => setConfirmationModalOpen(false)}
                        >
                          <div className="flex flex-col items-center">
                            <div className=" text-xl mb-4">
                              Are you sure you want to
                              {confirmationAction === "approve"
                                ? " approve this transaction"
                                : " decline this transaction"}
                            </div>
                            <div className="flex items-center justify-center">
                              <button
                                onClick={(e) => handleConfirmation(e, idea)}
                                className="w-[120px] h-10 p-2 text-white text-sm font-semibold bg-green-600 rounded mr-4"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setConfirmationModalOpen(false)}
                                className="w-[100px] h-10 p-2 text-black text-sm font-semibold rounded border border-black"
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </Modal>
                        <td className="p-4 flex items-center justify-center cursor-pointer">
                          <BiDotsVertical
                            onClick={() => {
                              setSelectedRowData(idea);
                              return setDetails(true);
                            }}
                          />
                        </td>
                        <Modal
                          isVisible={details}
                          onClose={() => setDetails(false)}
                        >
                          <div className="flex flex-col px-4">
                            <div className="font-semibold text-lg">
                              Campaign Details
                            </div>
                            <div className="my-4">
                              <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="font-normal text-[#7b7878]">
                                  Campaign Name:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.campaignName}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Campaign Category:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.campaignCategory}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Campaign Initiator:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.createdBy}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Initiator Group:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.groupOwner}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Initiator Branch:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.initiatorBranch}
                                  </span>
                                </div>
                                <div className="font-normal text-[#7b7878]">
                                  Date Initiated:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.createdDate}
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
                    No Pending Campaign!
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

export default PendingCampaign;
