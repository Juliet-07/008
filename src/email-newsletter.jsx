import React from "react";

const EmailNewsletter = () => {
  return (
    <div className="w-full h-full p-10">
      <div className="flex items-center justify-between">
        <p>Dear Name of user</p>
        <div className="flex items-center">
          <img
            src="https://digital.premiumtrustbank.com/PremiumImage/Birthday.jpg"
            className="w-20 h-20"
          />
          <p>date</p>
        </div>
      </div>
      <div>
        <p className="my-4">
          We wish to inform you that a Credit transaction occurred on your
          account with us.
          <br />
          The details of this transaction are shown below:
        </p>
        <b className="underline">Transaction Notification</b>
        <p className="flex items-center">
          Account Number:<span className="px-6">******0706</span>
        </p>
        <p className="flex items-center">
          Transaction Location:
          <span className="px-6">PREMIUM TRUST BANK HQ</span>
        </p>{" "}
        <p className="flex items-center">
          Description:
          <span className="px-6">
            NIP TRSF FROM ONOVO EMMANUEL CHUKWUDI MOBILE/UNION Transfer from
            ONOVO EMMANUEL CHUKWUDI
          </span>
        </p>{" "}
        <p className="flex items-center">
          Amount:<span className="px-6">NGN 100,000.00</span>
        </p>{" "}
        <p className="flex items-center">
          Value Date:<span className="px-6">18-JAN-24</span>
        </p>{" "}
        <p className="flex items-center">
          Remarks:<span className="px-6">000NIPT240183962</span>
        </p>{" "}
        <p className="flex items-center">
          Time of Transaction:
          <span className="px-6">18-JAN-2024 09:19:10 AM</span>
        </p>
      </div>
      <p className="my-4">
        The balances on this account as at 09:19 AM are as follows;
      </p>
      <div>
        <p className="flex items-center">
          Current Balance:<span className="px-6">NGN 103,143.23</span>
        </p>
        <p className="flex items-center">
          Available Balance:<span className="px-6">NGN 103,143.23</span>
        </p>
      </div>
      <div className="border border-black my-4"></div>
      <table className="table text-sm text-left text-black px-4 w-full border border-black">
        <thead className="bg-gray-500 text-sm text-white font-semibold border">
          <th className="p-2 border border-black">Date</th>
          <th className="p-2 border border-black">Narative</th>
          <th className="p-2 border border-black">Type</th>
          <th className="p-2 border border-black">Amount (NGN)</th>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 border border-black">date</td>
            <td className="p-4 border border-black">narrative</td>
            <td className="p-4 border border-black">type</td>
            <td className="p-4 border border-black">amount</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmailNewsletter;
