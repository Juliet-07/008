import React from "react";

const IdeaCard = ({ title, comments, likes, backgroundColor }) => {
  return (
    <div
      className="w-[301px] 2xl:w-[350px] h-[124px] rounded-md flex flex-col items-center justify-center"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="text-[#0A0903] text-center mb-10">{title}</div>
      <div className="w-full flex items-center justify-around text-[#9F5F5F]">
        <p>{comments}</p>
        <p>{likes}</p>
        <p></p>
      </div>
    </div>
  );
};

export default IdeaCard;
