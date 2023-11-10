import React, { useState } from "react";
import Modal from "../components/Modal";
import FCYASSET from "../assets/Processes/fcyAsset.pdf";
import LCYASSET from "../assets/Processes/lcyAsset.pdf";

const Processes = () => {
  const groups = [
    {
      name: "Banking Services",
      processFiles: [
        {
          processName: "",
          // filePath:
        },
      ],
    },
    {
      name: "Central Operations ",
    },
    {
      name: "Conduct & Compliance ",
    },
    {
      name: "Corporate Services",
    },
    {
      name: "Customer Experience",
    },
    {
      name: "Finance",
    },
    {
      name: "Information Technology",
    },
    {
      name: "International Trade Services",
    },
    {
      name: "Legal Services",
    },
    {
      name: "People Manangement Group",
    },
    {
      name: "Project Management Group",
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
  const [details, setDetails] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (group, file) => {
    setSelectedGroup(group);
    setModalData(file);
  };

  const closeModal = () => {
    setSelectedGroup(false);
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
              return setDetails(true);
            }}
          >
            {group.name}
          </div>
        ))}
      </div>
      {selectedGroup && (
        <Modal isVisible={details} onClose={closeModal}>
          <iframe
            src={`${modalData?.filePath}`}
            title={`${modalData?.processName}`}
            style={{ width: "78vw", height: "75vh" }}
          />
        </Modal>
      )}
    </div>
  );
};

export default Processes;
