import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { BiDotsVertical } from "react-icons/bi";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import Modal from "../../../components/Modal";
import moment from "moment";

const formatDate = (value) => {
  return moment(value).format("HH:MM A DD, MM, YYYY");
};

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npages = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  const [details, setDetails] = useState(false);
  const [comment, setComment] = useState(false);

  useEffect(() => {
    const getAllUsers = () => {
      axios
        .get("http://192.168.207.8:2035/api/User/GetAllUsers", {
          headers: {
            ApiKey:
              "hJmEeNA3ktOQAYxqr9sy8vvCihsjtyCvwHNSzV8M0hQLyCiMsYuZJs28tIyB7WMr1BMWEqCRIRuqSYoGIR2hQZ0YzPU0BoBYhwlvmS372x3TFET9P21El4CZZagRhZCVy1x71WOtsXzu6Sq4ITSGhcDTdiETFPR1as1ZSk9v8hfzw9dzxC5LUwKsCcq8ejE0JlCt34eMeoRWYXW8KADLjAvifLhxXhPJO1t1jXVCXICbbR7G8UQMzpnU2fROHBiw",
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data, "users");
          setUsers(response.data.data);
        });
    };
    getAllUsers();
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
    <>
      <Navbar />
      <div className="flex items-center justify-center m-4">
        <div className="w-[1240px] rounded-md bg-white flex flex-col p-4">
          <div className="flex items-center justify-between my-6 mx-6">
            <Link to="/userManager/newUser">
              <div className="w-[130px] h-10 rounded bg-[#db1600] text-white font-semibold flex items-center justify-center cursor-pointer">
                Add New Users
              </div>
            </Link>

            <div className="w-[233px]">
              <form>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                    id="default-search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Search"
                    required
                  />
                  {/* <button
                    type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button> */}
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mx-6">
            <table className="table bg-white text-sm text-left text-black">
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold">
                <tr>
                  <th className="p-4">First Name</th>
                  <th className="p-4">Last Name</th>
                  <th className="p-4">User Role</th>
                  <th className="p-4">Branch</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="bg-[#eff4ef]">
                {records.length > 0 ? (
                  records.map((user) => {
                    return (
                      <tr>
                        <td className="p-4">{user.first_name}</td>
                        <td className="p-4">{user.last_name}</td>
                        <td className="p-4">{user.profile_type}</td>
                        <td className="p-4">{user.branchCode}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4 flex items-center justify-center cursor-pointer">
                          <BiDotsVertical
                            onClick={() => {
                              return setDetails(true);
                            }}
                          />
                        </td>
                        {/* <td className="p-4">
                      <div className="bg-[#db1600] w-[119px] h-10 flex items-center justify-center text-white font-semibold rounded">
                        Remind
                      </div>
                    </td> */}
                        <td>
                          <Modal
                            isVisible={details}
                            onClose={() => setDetails(false)}
                          >
                            <div className="flex flex-col w-[338px] h-[330px] px-4">
                              <div className="font-semibold text-lg">
                                User Details
                              </div>
                              <div className="my-4">
                                <div className="grid gap-2">
                                  <div className="font-normal text-[#7b7878]">
                                    FullName:
                                    <span className="ml-1 font-semibold text-black">
                                      {user.fullname}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Branch:
                                    <span className="ml-1 font-semibold text-black">
                                      {user.branchCode}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Email:
                                    <span className="ml-1 font-semibold text-black">
                                      {user.email}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Role:
                                    <span className="ml-1 font-semibold text-black">
                                      {user.profile_type}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Phone Number:
                                    <span className="ml-1 font-semibold text-black">
                                      {user.phone}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Created By:
                                    <span className="ml-1 font-semibold text-black">
                                      {user.created_by}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Date Created:
                                    <span className="ml-1 font-semibold text-black">
                                      {formatDate(user.created_at)}
                                    </span>
                                  </div>
                                  <div className="font-normal text-[#7b7878]">
                                    Status:
                                    <span className="ml-1 font-semibold text-black">
                                      {user.isActive}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center mt-4">
                                  <button
                                    // onClick={handleClose}
                                    type="submit"
                                    className="w-[128px] h-10 p-2 text-white text-sm font-semibold bg-[#db1600] rounded mr-4"
                                  >
                                    Edit
                                  </button>
                                  {/* <button
                                    onClick={() => {
                                      return setComment(true);
                                    }}
                                    type="submit"
                                    className="w-[100px] h-10 p-2 text-black text-sm font-semibold rounded border border-black"
                                  >
                                    Decline
                                  </button> */}
                                </div>
                              </div>
                            </div>
                          </Modal>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center text-xl font-semibold">
                    No Pending user!
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
    </>
  );
};

export default UserManager;
