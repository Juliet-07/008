import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDownloadExcel } from "react-export-table-to-excel";
import { AiOutlineDownload } from "react-icons/ai";
import { BiDotsVertical, BiRightArrow, BiDownArrow } from "react-icons/bi";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";

const CounterfeitNoteReport = () => {
  const tableRef = useRef(null);
  const [branches, setBranches] = useState([]);
  const [showBranchType, setShowBranchType] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = branches.slice(firstIndex, lastIndex);
  const npages = Math.ceil(branches.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const getCounterfeitNote = () => {
    const url = `${process.env.REACT_APP_DUDCHEQUE}/GetCounterfeitNote`;
    axios.get(url).then((response) => {
      console.log(response.data, "CounterfeitNote Report");
      let branches = response.data.result.branch;
      setBranches(branches);
      setShowBranchType(
        new Array(response.data.result.branch.length).fill(false)
      );
    });
  };

  useEffect(() => {
    getCounterfeitNote();
  }, []);

  const toggleBranchType = (index) => {
    const updatedShowBranchTypes = [...showBranchType];
    updatedShowBranchTypes[index] = !updatedShowBranchTypes[index];
    setShowBranchType(updatedShowBranchTypes);
  };
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

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "CounterfeitNote Report",
    sheet: "All Report",
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="font-bold text-2xl uppercase mb-2">
          counterfeitNote report
        </div>
        {/* individual accounts */}
        <div className="w-[1294px] rounded-lg bg-white p-4">
          {/* <div className="flex items-end justify-end mb-4">
            <div
              className="flex items-center justify-center cursor-pointer w-[170px] h-[45px] bg-[#db1600] text-white font-semibold rounded"
              onClick={onDownload}
            >
              <AiOutlineDownload size={20} />
              <span>Export as .xlsx</span>
            </div>
          </div> */}

          <div className="flex flex-col items-center justify-center">
            <table
              ref={tableRef}
              className="table bg-white text-sm text-left text-black px-4 w-full"
            >
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                <th className="p-4">Branch</th>
                <th className="p-4">Volume</th>
                {/* <th className="p-4">Action</th> */}
              </thead>
              <tbody>
                {records.length > 0 ? (
                  branches.map((branch, index) => {
                    return (
                      <tr key={branch.branchcode}>
                        {/* <td className="p-4 flex items-center">
                          {branch.branchcode}
                          <span
                            className="ml-2 cursor-pointer"
                            onClick={() => toggleBranchType(index)}
                          >
                            {showBranchType[index] ? (
                              <BiDownArrow />
                            ) : (
                              <BiRightArrow />
                            )}
                          </span>
                        </td> */}
                        <td className="p-4 flex items-center">
                          {branch.branchname}
                          <span
                            className="ml-2 cursor-pointer"
                            onClick={() => toggleBranchType(index)}
                          >
                            {showBranchType[index] ? (
                              <BiDownArrow />
                            ) : (
                              <BiRightArrow />
                            )}
                          </span>
                        </td>
                        <td className="p-4">
                          {showBranchType[index] ? (
                            <table className="table bg-white text-sm text-left text-black px-4 w-full">
                              <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                                <th className="p-4">Denomination</th>
                                <th className="p-4">Currency Number</th>
                                <th className="p-4">Initiator</th>
                                <th className="p-4">Date Initiated</th>
                                <th className="p-4">Approver</th>
                                <th className="p-4">Date Approved</th>
                              </thead>
                              <tbody>
                                {branch.branchtype.map((branchType) => (
                                  <tr key={branchType.id}>
                                    {/* <td>{branchType.branchcode}</td> */}
                                    <td className="p-2">{branchType.denomination}</td>{" "}
                                    <td className="p-2"> {branchType.currencynumber}</td>{" "}
                                    <td className="p-2">{branchType.initiatoR_BY}</td>{" "}
                                    <td className="p-2">{branchType.initiatoR_DATE}</td>{" "}
                                    <td className="p-2">{branchType.approveD_BY}</td>{" "}
                                    <td className="p-2">{branchType.approvE_DATE}</td>{" "}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="p-4">{branch.branchtype.length}</p>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center text-xl font-semibold">
                    No CounterfeitNote Report!
                  </div>
                )}
              </tbody>
              {/* <tbody>
                {records.length > 0 ? (
                  records.map((dud) => {
                    return (
                      <tr>
                        <td className="p-4">{dud.BRANCH}</td>
                        <td className="p-4">{dud.DENOMINATION}</td>
                        <td className="p-4">
                          <BiDotsVertical size={20} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center text-xl font-semibold">
                    No CounterfeitNote Report!
                  </div>
                )}
              </tbody> */}
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

export default CounterfeitNoteReport;
