import React, { useState } from "react";
import Corporate from "./dudChequeReportCorp";
import Individual from "./dudChequeReportIndv";

const Reviewer = () => {
  const [currentTab, setCurrentTab] = useState("Individual Accounts");

  const navOptions = [
    { title: "Individual Accounts" },
    { title: "Corporate Accounts" },
  ];

  return (
    <>
      <div className="w-full flex flex-col items-center mt-10">
        <div className="w-full flex items-center justify-around h-20 bg-gray-50">
          <div className="w-[90%] flex items-center justify-between border-b h-[50px] mb-[10px] uppercase">
            {navOptions.map((tab, index) => {
              return (
                <div
                  className={`flex items-center justify-evenly gap-[10px] h-[50px] cursor-pointer 
             ${
               currentTab === tab.title
                 ? "border-b-[3px] border-solid border-gray-900/50 text-gray-900/50"
                 : "border-none"
             }`}
                  onClick={() => setCurrentTab(tab.title)}
                >
                  <p>{tab.title}</p>{" "}
                </div>
              );
            })}
          </div>
        </div>

        <br />
        {currentTab === "Individual Accounts" && <Individual />}

        {currentTab === "Corporate Accounts" && <Corporate />}
      </div>
    </>
  );
};

export default Reviewer;
