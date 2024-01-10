import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BiDotsVertical } from "react-icons/bi";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import Modal from "../../components/Modal";

const BSM = () => {
  const [pnds, setPnds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = pnds.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pnds.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  const [details, setDetails] = useState(false);
  const [comment, setComment] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    // let email = user.givenname;
    let email = "bsm1";
    const _token = JSON.parse(localStorage.getItem("pndUser"));
    let token = _token.token;
    const base_url = import.meta.env.VITE_REACT_APP_PND;
    const getMyPND = () => {
      axios
        .get(
          `${base_url}PndAccount/GetPNDByBranch?userEmail=${email}@premiumtrustbank.com`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        )
        .then((response) => {
          console.log(response.data, "PNDs");
          setPnds(response.data.data);
        });
    };
    getMyPND();
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
  return (
    <div className="px-20 py-10">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-[#2B2E35] text-3xl font-bold">name</div>
          {/* <Link to="/applications/pndRM">
            <div className="w-[164px] h-[49px] rounded bg-[#2B2E35] text-white flex items-center justify-center font-semibold">
              Create a PND
            </div>
          </Link> */}
        </div>
        <div className="flex flex-col items-center justify-center">
          <table className="table bg-white text-sm text-left text-black px-4 border border-black">
            <thead className="bg-[#2B2E35] text-sm text-white font-semibold">
              <tr>
                <th className="p-4">Initiator</th>
                <th className="p-4">Account Name</th>
                <th className="p-4">Account Number</th>
                <th className="p-4">Account Type</th>
                <th className="p-4">File</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="bg-[#eff4ef]">
              {records.length > 0 ? (
                records.map((pnd) => {
                  return (
                    <tr>
                      <td className="p-4">
                        {pnd.pndModel.relationship_manager}
                      </td>
                      <td className="p-4">{pnd.pndModel.account_name}</td>
                      <td className="p-4">{pnd.pndModel.account_number}</td>
                      <td className="p-4">{pnd.pndModel.customerType}</td>
                      <td className="p-4">Document</td>
                      <td className="p-4">{pnd.pndModel.status}</td>
                      <td className="p-4 flex items-center justify-center cursor-pointer">
                        <BiDotsVertical
                          onClick={() => {
                            return setDetails(true);
                          }}
                        />
                      </td>
                      <Modal
                        isVisible={details}
                        onClose={() => setDetails(false)}
                      >
                        <div className="flex flex-col w-[340px] h-[350px] px-4">
                          <div className="font-semibold text-lg">
                            PND Details
                          </div>
                          <div className="my-4">
                            <div className="grid gap-2 mb-8">
                              <div className="font-normal text-[#7b7878]">
                                Account Name:
                                <span className="ml-1 font-semibold text-black">
                                  {pnd.pndModel.account_name}
                                </span>
                              </div>
                              <div className="font-normal text-[#7b7878]">
                                Account Number:
                                <span className="ml-1 font-semibold text-black">
                                  {pnd.pndModel.account_number}
                                </span>
                              </div>
                              <div className="font-normal text-[#7b7878]">
                                Email:
                                <span className="ml-1 font-semibold text-black">
                                  {pnd.pndModel.email}
                                </span>
                              </div>
                              <div className="font-normal text-[#7b7878]">
                                Phone Number:
                                <span className="ml-1 font-semibold text-black">
                                  {pnd.pndModel.phone}
                                </span>
                              </div>
                              <div className="font-normal text-[#7b7878]">
                                BVN:
                                <span className="ml-1 font-semibold text-black">
                                  {pnd.pndModel.bvn}
                                </span>
                              </div>
                              <div className="font-normal text-[#7b7878]">
                                Account Status:
                                <span className="ml-1 font-semibold text-black">
                                  {pnd.pndModel.status}
                                </span>
                              </div>
                              <div className="font-normal text-[#7b7878]">
                                Reason:
                                <span className="ml-1 font-semibold text-black">
                                  {pnd.pndModel.reason}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-center mt-4">
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
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </tr>
                  );
                })
              ) : (
                <div className="flex items-center justify-center text-xl font-semibold">
                  No Pending Item!
                </div>
              )}
            </tbody>
            <Modal isVisible={comment} onClose={() => setComment(false)}>
              <div>form here</div>
            </Modal>
          </table>
          <nav>
            <ul className="flex flex-row items-center">
              <li>
                <MdSkipPrevious
                  size={30}
                  onClick={prevPage}
                  className="cursor-pointer"
                />
              </li>
              {numbers.map((n, i) => (
                <li key={i} className="text-xl p-2">
                  <a href="#" onClick={() => changeCurrentPage(n)}>
                    {n}
                  </a>
                </li>
              ))}
              <li>
                <MdSkipNext
                  size={30}
                  onClick={nextPage}
                  className="cursor-pointer"
                />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default BSM;
