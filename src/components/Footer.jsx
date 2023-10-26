import React from "react";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-[#2b2e35] h-20 mt-10 text-white">
      {/* <div className="w-full bg-white text-black h-20 mt-10"> */}
        <div className="flex flex-col items-center p-4 text-xs font-bold uppercase">
          <p>
            send us feedback
            <a
              href="https://forms.office.com/r/atQDUK8hTt"
              target="_blank"
              className="pl-2 underline"
            >
              here
            </a>
          </p>
          <p className="flex items-center">
            <AiOutlineCopyrightCircle className="mr-2" /> All Rights Reserved
          </p>
          <p>PremiumTrust Bank {new Date().getFullYear()}</p>
        </div>{" "}
      </div>
    </>
  );
};

export default Footer;
