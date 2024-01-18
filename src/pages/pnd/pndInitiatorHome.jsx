import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";

const InitiatorHomePage = () => {
  const base_url = import.meta.env.VITE_REACT_APP_PND;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const _token = JSON.parse(localStorage.getItem("pndUser"));
  let token = _token.token;
  
  const [pnds, setPnds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = pnds.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pnds.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  useEffect(() => {
    let email = user.givenname;
    const getMyPND = () => {
      axios
        .get(
          `${base_url}PndAccount/MyPNDs?email=${email}@premiumtrustbank.com`,
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
          // setPndID(response.data.data[0].pndGuid);
          // console.log(pndID,"pndID")
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

  const sendReminder = (id, assignee) => {
    const url = `${base_url}PndAccount/SendReminder`;
    const payload = {
      userEmail: `${user.givenname}@premiumtrustbank.com`,
      pndID: id,
      assignee: assignee,
    };

    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleAction = (value) => {
    // Perform the action based on the extracted value
    console.log(`Performing action for value: ${value}`);
  };
  return (
    <div className="px-20 py-10">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-[#2B2E35] text-2xl font-semibold">
            Welcome, {user.name}
          </div>
          <Link to="/applications/pndRM">
            <div className="w-[150px] h-10 rounded bg-[#2B2E35] text-white flex items-center justify-center font-medium">
              Create a PND
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <table className="table bg-white text-sm text-left text-black px-4 border border-black">
            <thead className="bg-[#2B2E35] text-sm text-white font-semibold">
              <tr>
                <th className="p-4">Account Name</th>
                <th className="p-4">Account Number</th>
                <th className="p-4">Account Type</th>
                <th className="p-4">Date Created</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="bg-[#eff4ef]">
              {records.map((pnd) => {
                return (
                  <tr>
                    <td className="p-4">{pnd.account_name}</td>
                    <td className="p-4">{pnd.account_number}</td>
                    <td className="p-4">{pnd.customerType}</td>
                    <td className="p-4">{pnd.created_at}</td>
                    <td className="p-4">{pnd.status}</td>
                    <td className="p-4">
                      <div
                        className="bg-[#db1600] w-[119px] h-10 flex items-center justify-center text-white font-semibold rounded cursor-pointer"
                        onClick={() => sendReminder(pnd.pndGuid, pnd.assignee)}
                      >
                        Remind
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
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
export default InitiatorHomePage;
