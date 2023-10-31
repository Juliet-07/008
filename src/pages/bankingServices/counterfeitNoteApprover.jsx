import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import Modal from "../../components/Modal";

const CounterfeitApprover = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const tableRef = useRef(null);
  const [pendingTransaction, setPendingTransaction] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [details, setDetails] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [imageSrc, setImageSrc] = useState("");
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = pendingTransaction.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pendingTransaction.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const getUserInfo = () => {
    const url = `${process.env.REACT_APP_DUDCHEQUE}/GetUserInfor?UserID=${user.givenname}`;
    axios.get(url).then(async (response) => {
      const data = response.data.result;
      console.log({ data }, "user info");
      setUserInfo(data);
      const { branchCode } = data;
      if (branchCode) await getPendingTransaction(branchCode);
    });
  };

  const getPendingTransaction = (branchCode) => {
    const url = `${process.env.REACT_APP_DUDCHEQUE}/GetCounterfeitNotePendingTransaction?BranchCode=${branchCode}`;
    try {
      axios.get(url).then((response) => {
        setPendingTransaction(response.data.result);
        console.log(pendingTransaction, "Pending Transactions");
      });
    } catch (error) {
      console.log(error);
    }
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

  const url = `${process.env.REACT_APP_DUDCHEQUE}/AuthorisedCounterfeitNote`;

  const handleAuthorization = async (e, note) => {
    const payload = {
      BRANCHCODE: note.BRANCH,
      DENOMINATION: note.DENOMINATION,
      APPROVED_BY: user.name,
    };
    console.log(payload, "payload");
    await axios
      .post(url, payload)
      .then(
        (response) => (
          console.log(response, "response from authorizer"),
          alert("Authorization Status:" + response.data)
        )
      );
  };
  const handleDecline = async (e, note) => {
    const payload = {
      BRANCH: note.BRANCH,
      DENOMINATION: note.DENOMINATION,
      APPROVED_BY: user.name,
    };
    console.log(payload, "payload");
    await axios
      .post(url, payload)
      .then(
        (response) => (
          console.log(response, "response from authorizer"),
          alert("Authorization Status:" + response.data)
        )
      );
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="font-bold text-2xl uppercase mb-2">
          Counterfeit Note for approval
        </div>
        <div className="w-[1294px] rounded-lg bg-white p-4">
          <div className="flex flex-col items-center justify-center">
            <table
              ref={tableRef}
              className="table bg-white text-sm text-left text-black px-4 w-full"
            >
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                <th className="p-4">Branch</th>
                <th className="p-4">Currency Number</th>
                <th className="p-4">Denomination</th>
                <th className="p-4">Image</th>
                <th className="p-4">Action</th>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((note, index) => {
                    return (
                      <tr key={index}>
                        <td className="p-4">{note.BRANCHNAME}</td>
                        <td className="p-4">{note.CURRENCYNUMBER}</td>
                        <td className="p-4">{note.DENOMINATION}</td>
                        {/* <td className="p-4">{note.FILES}</td> */}
                        <td className="p-4">
                          {(() => {
                            // Convert the byte data to a Blob
                            const blob = new Blob(
                              [new Uint8Array(note.FILES)],
                              { type: "image/jpg" }
                            ); // Adjust the type as needed

                            // Create a data URL for the image
                            const reader = new FileReader();
                            reader.readAsDataURL(blob);

                            // Use state to render the image

                            reader.onload = function () {
                              setImageSrc(reader.result);
                            };

                            return (
                              <div>
                                <img src={imageSrc} alt="Image" />
                              </div>
                            );
                          })()}
                        </td>

                        <td className="p-4">
                          <div className="flex items-center cursor-pointer">
                            <BsFillCheckCircleFill
                              size={20}
                              color="green"
                              onClick={(e) => handleAuthorization(e, note)}
                            />
                            <IoTrashBinSharp
                              size={20}
                              color="red"
                              className="ml-2"
                              onClick={(e) => handleDecline(e, note)}
                            />
                          </div>
                        </td>
                        {/* <td className="p-4 flex items-center justify-center cursor-pointer">
                          <BiDotsVertical
                            onClick={() => {
                              setSelectedRowData(note);
                              return setDetails(true);
                            }}
                          />
                        </td> */}
                        <Modal
                          isVisible={details}
                          onClose={() => setDetails(false)}
                        >
                          <div className="flex flex-col w-[600px] px-4">
                            <div className="font-semibold text-lg">
                              noteCheque Details
                            </div>
                            <div className="my-4">
                              <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="font-normal text-[#7b7878]">
                                  FILE:
                                  <span className="ml-1 font-semibold text-black">
                                    {selectedRowData.FILE}
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
                    No CounterfeitNote for Approval!
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

export default CounterfeitApprover;
