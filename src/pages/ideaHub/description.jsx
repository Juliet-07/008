import React from "react";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import { Textarea } from "@material-tailwind/react";

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
      <div className="mb-6">
        <p className="uppercase text-[#84817E] px-4">campaign</p>
        <p className="text-sm">🌟 Introducing our Innovation in Account Opening Campaign! 🌟</p>
      </div>
      <div className="flex">
        <div className="w-[569px] h-full bg-white/50 shadow-xl flex flex-col p-4">
          <div className="p-4 text-gray-500">Description:</div>
          <div className="w-[444px] px-4 text-xs">
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
          <div className="flex flex-col items-end px-4">
            <p className="text-gray-400 text-xs my-2">
              Idris Ayodele <span>12:30pm</span>
            </p>
            <div className="w-[339px] h-[50px] bg-[#F2F2F2]">comment</div>
            <div className="flex items-center justify-around w-20">
              <LuThumbsUp size={20} />
              <LuThumbsDown size={20} />
            </div>
          </div>
          <div className="px-4">
            <label
              htmlFor="details"
              className="block text-[#D3D0D0] text-xs mb-2"
            >
              Minimum of 300 words
            </label>
            <Textarea
              size="lg"
              label="Write a comment"
              name="initiator"
              // value={initiator}
              // onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between mt-10">
            <div className="text-[#84817E] text-xs">Posted 5 days ago</div>
            <div className="flex items-center justify-between w-[150px]">
              <p>👍 likes</p>
              <p>👎 dislikes</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center text-2xl">
            🌟 Leaderboard!🌟
          </div>
          {leaderBoard.map((leader) => (
            <div className="w-[389px] h-[49px] flex items-center justify-around bg-[#FDF1F1] mx-10 my-4">
              <p className="text-xl">{leader.staffName}</p>
              <p className="bg-[#FFE3E3] w-[100px] h-4 flex items-center justify-center rounded-md text-xs">
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
