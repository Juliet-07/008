import React from "react";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";

const Description = () => {
  const leaderBoard = [
    {
      staffName: "Sarah Omoike",
      totalCoins: "50 Coins",
    },
    {
      staffName: "Idris John",
      totalCoins: "50 Coins",
    },
    {
      staffName: "Juliet Ohankwere",
      totalCoins: "50 Coins",
    },
    {
      staffName: "Amechi Ijei",
      totalCoins: "50 Coins",
    },
  ];
  return (
    <div className="flex flex-col p-4 2xl:p-10">
      <div className="mb-10">
        <p className="uppercase text-[#84817E] px-4">campaign</p>
        <p>🌟 Introducing our Innovation in Account Opening Campaign! 🌟</p>
      </div>
      <div className="flex">
        <div className="w-[569px] h-full bg-white/50 shadow-xl flex flex-col p-4">
          <div className="p-4">Description:</div>
          <div className="w-[444px] px-4">
            At PremiumTrust Bank Limited, we believe in making banking seamless,
            efficient, and tailored to your needs. With our cutting-edge account
            opening process, you can now experience banking like never before.
            Say goodbye to lengthy paperwork and hello to instant, hassle-free
            account setup! <br />
            <br />
            Key Features: <br />
            ✅ Streamlined Digital Process <br />
            ✅ Quick Verification & Approval <br />
            ✅ Personalized Account Options <br />
            ✅ Enhanced Security Measures
            <br />
            <br />
            Join us in embracing the future of banking. Open your account today
            and be a part of the innovation revolution! 🚀 #InnovationInBanking
            #SeamlessAccountOpening #BankWithUs"
          </div>
          <div className="flex flex-col items-end">
            <p>
              Idris Ayodele <span>12:30pm</span>
            </p>
            <div className="w-[339px] h-[50px] bg-gray-500/50">comment</div>
            <div className="flex items-center justify-around w-20">
              <LuThumbsUp size={20} />
              <LuThumbsDown size={20}/>
            </div>
          </div>
          <div></div>
        </div>
        <div>
          <div className="flex items-center justify-center text-2xl">
            🌟 Leaderboard!🌟
          </div>
          {leaderBoard.map((leader) => (
            <div className="w-[389px] h-[70px] flex items-center justify-around bg-[#FDF1F1] mx-10 my-4">
              <p className="font-bold text-xl">{leader.staffName}</p>
              <p className="bg-[#FFE3E3] w-[113px] h-[30px] flex items-center justify-center">
                {leader.totalCoins}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
