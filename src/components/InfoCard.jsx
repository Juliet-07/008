import React from "react";
import Label from "../assets/cardLabel.png";

const InfoCard = ({ title, icon, count, stat }) => {
  return (
    <div className="w-[370px] h-[144px] rounded-md bg-white">
      <div className="flex items-end justify-end">
        <img src={Label} className="w-[60px] h-14" />
      </div>
      <div className="px-4">
        <p className="font-bold text-xl text-[#0A0903]">{title}</p>
        <p className="font-bold text-3xl text-[#2B2E35] pt-4">{count}</p>
      </div>
    </div>
  );
};

export default InfoCard;
