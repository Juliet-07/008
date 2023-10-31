import React from "react";

export const SummaryTableIndv = ({ branchData }) => {
  return (
    <table className="table bg-white text-sm text-left text-black px-4 w-full">
      <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
        <th className="p-4">Branches</th>
        <th className="p-4">Number of Transactions</th>
      </thead>
      <tbody>
        {branchData.map((item, index) => (
          <tr key={index}>
            <td className="p-4">{item.initiate_Branch}</td>
            <td className="p-4 flex items-center">{item.volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const SummaryTableCorp = ({ branchData }) => {
  return (
    <table className="table bg-white text-sm text-left text-black px-4 w-full">
      <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
        <th className="p-4">Branches</th>
        <th className="p-4">Number of Transactions</th>
      </thead>
      <tbody>
        {branchData.map((item, index) => (
          <tr key={index}>
            <td className="p-4">{item.Initiate_Branch}</td>
            <td className="p-4 flex items-center">{item.volume}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
