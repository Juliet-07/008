import React, { useState } from "react";
import { LuThumbsUp, LuThumbsDown } from "react-icons/lu";
import Modal from "../../components/Modal";
import { Input, Textarea } from "@material-tailwind/react";

const Description = () => {
  const [details, setDetails] = useState(false);
  const leaderBoard = [
    {
      staffName: "Sarah Omoike",
      totalCoins: "50 Coins",
    },
    {
      staffName: "Idris Ayodele",
      totalCoins: "50 Coins",
    },
    {
      staffName: "Amechi Ijei",
      totalCoins: "50 Coins",
    },
    {
      staffName: "Olumayowa Amole",
      totalCoins: "50 Coins",
    },
    {
      staffName: "Idris Abebefe",
      totalCoins: "50 Coins",
    },
    {
      staffName: "Damilola Falonipe",
      totalCoins: "50 Coins",
    },
    {
      staffName: "Olatunji Oseni",
      totalCoins: "50 Coins",
    },
  ];
  return (
    <div className="w-full flex flex-col p-6">
      <div>
        <p className="uppercase text-[#84817E]">campaign</p>
        <p className="text-sm">
          🌟 Introducing our Innovation in Account Opening Campaign! 🌟
        </p>
      </div>
      <div className="w-full flex items-center">
        <div className="w-full h-[80vh] 2xl:h-full 2xl:flex overflow-auto">
          <div className="w-[500px] bg-white/50 shadow-xl flex flex-col p-4">
            <div className="text-gray-500">Description:</div>
            <div className="w-[444px] text-xs">
              At PremiumTrust Bank Limited, we believe in making banking
              seamless, efficient, and tailored to your needs. With our
              cutting-edge account opening process, you can now experience
              banking like never before. Say goodbye to lengthy paperwork and
              hello to instant, hassle-free account setup! <br />
              <br />
              Key Features: <br />
              ✅ Streamlined Digital Process <br />
              ✅ Quick Verification & Approval <br />
              ✅ Personalized Account Options <br />
              ✅ Enhanced Security Measures
              <br />
              <br />
              Join us in embracing the future of banking. Open your account
              today and be a part of the innovation revolution! 🚀
              #InnovationInBanking #SeamlessAccountOpening #BankWithUs"
            </div>
            {/* <div className="flex flex-col items-end px-4">
            <p className="text-gray-400 text-xs my-2">
              Idris Ayodele <span>12:30pm</span>
            </p>
            <div className="w-[339px] h-[50px] bg-[#F2F2F2]">comment</div>
            <div className="flex items-center justify-around w-20">
              <LuThumbsUp size={20} />
              <LuThumbsDown size={20} />
            </div>
          </div> */}
            <div className="px-4 mt-4" onClick={() => setDetails(true)}>
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
          <div className="w-[500px] bg-white/50 shadow-xl flex flex-col p-4 mt-4 2xl:mt-0">
            <div className="flex flex-col items-end justify-end text-sm">
              <div className="text-gray-400">
                Idris Ayode <span>12:30pm</span>
              </div>
              <div className="w-[339px] h-[50px] bg-[#D9D9D9]/50 p-3">
                Awesome! We can use a reward strategy in driving this!
              </div>
              <div className="w-[338px] flex items-center justify-between text-sm">
                <p>contribute</p>
                <div className="flex">
                  <p>likes</p>
                  <p>dislikes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* LEADERBOARD */}
        <div className="h-[80vh] 2xl:h-full">
          <div className="flex items-center justify-center text-2xl">
            🌟 Leaderboard!🌟
          </div>
          {leaderBoard.map((leader) => (
            <div className="w-[389px] h-[49px] flex items-center justify-around bg-[#FDF1F1] m-4">
              <p className="text-xl">{leader.staffName}</p>
              <p className="bg-[#FFE3E3] w-[100px] h-4 flex items-center justify-center rounded-md text-xs">
                {leader.totalCoins}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Modal isVisible={details} onClose={() => setDetails(false)}>
        <div className="w-[569px] p-3 flex flex-col items-center justify-center">
          <div className="uppercase text-[#A09898]">new campaign</div>
          <form className="w-[497px]">
            <div className="mt-4">
              <Input
                size="lg"
                label="Name of contribution"
                name="initiator"
                // value={initiator}
                // onChange={handleChange}
              />
            </div>

            <div className="mt-6">
              <Input
                size="lg"
                label="Stakeholders"
                name="initiator"
                // value={initiator}
                // onChange={handleChange}
              />
            </div>
            <div className="mt-6">
              <label
                htmlFor="details"
                className="block text-[#D3D0D0] text-xs mb-2"
              >
                Minimum of 100 words
              </label>
              <Textarea
                size="lg"
                label="Details"
                name="initiator"
                // value={initiator}
                // onChange={handleChange}
              />
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className="w-full h-[54px] font-bold tracking-wide text-white bg-[#3B1212] uppercase"
                // onClick={() => setLoading(!loading)}
              >
                post comment
              </button>

              {/* <Loader /> */}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Description;
