import React, { useState } from "react";
import { FcIdea } from "react-icons/fc";
import { Link } from "react-router-dom";
import Add from "../../assets/addIdea.png";
import IdeaCard from "./ideaCard";
import Modal from "../../components/Modal";
import { Input, Textarea } from "@material-tailwind/react";

const IdeaHub = () => {
  const [details, setDetails] = useState(false);

  const ideas = [
    {
      postedBy: "I.T",
      campaignName: "Accomments Opening",
      startDate: "date",
      endDate: "date",
      comment: "20",
      topStaff: "Sarah Omoike",
      totalCoins: "30 coins",
      posted: "2 days ago",
    },
    {
      postedBy: "H.R",
      campaignName: "Accomments Opening",
      startDate: "date",
      endDate: "date",
      comment: "20",
      topStaff: "Sarah Omoike",
      likes: "20",
      totalCoins: "30 coins",
      posted: "2 days ago",
    },
    {
      postedBy: "I.T",
      campaignName: "Accomments Opening",
      startDate: "date",
      endDate: "date",
      comment: "20",
      topStaff: "Sarah Omoike",
      totalCoins: "30 coins",
      posted: "2 days ago",
    },
    {
      postedBy: "I.T",
      campaignName: "Accomments Opening",
      startDate: "date",
      endDate: "date",
      comment: "20",
      topStaff: "Sarah Omoike",
      likes: "10",
      totalCoins: "30 coins",
      posted: "2 days ago",
    },
    {
      postedBy: "I.T",
      campaignName: "Accomments Opening",
      startDate: "date",
      endDate: "date",
      comment: "20",
      topStaff: "Sarah Omoike",
      totalCoins: "30 coins",
      posted: "2 days ago",
    },
  ];

  return (
    <>
      <div className="w-full h-full">
        {" "}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between px-6">
            <div className="cursor-pointer" onClick={() => setDetails(true)}>
              <img src={Add} alt="add-idea" />
            </div>
            <div className="uppercase text-xl mt-4 font-semibold flex items-center">
              welcome to the idea hub{" "}
              <span>
                <FcIdea size={30} />
              </span>
            </div>
            <div>
              <p>Filter By:</p>
              <p>Filter</p>
            </div>
          </div>
          <div className="text-[#84817E]">
            Your reactions, suggestions are what we need for inovation and for
            shaping the future.
          </div>
          <div className="w-full flex flex-col px-4">
            <p className="text-[#84817E]">Trending Campaigns.........</p>
            <div className="flex items-center justify-between">
              <IdeaCard
                title="Account Opening"
                backgroundColor="#CA9292"
                comments="200 comments"
                likes="20 links"
              />
              <IdeaCard
                title="Credit Card Reward Campaign"
                backgroundColor="#E1FCF1"
                comments="100 comments"
                likes="100 links"
              />
              <IdeaCard
                title="Referral Program Campaign"
                backgroundColor="#FEFFC4"
                comments="20 comments"
                likes="200 links"
              />
            </div>
          </div>
          <div className="w-full">
            <Link to="/applications/ideaDescription">
              {ideas.map((idea) => (
                <div className="flex flex-col item-center shadow-xl p-2 m-4 text-sm text-gray-800 bg-white/50">
                  <table className="w-full">
                    <thead className="text-[#84817E] uppercase">
                      <th className="p-3">campaign</th>
                      <th className="p-3">group</th>
                      <th className="p-3">start date</th>
                      <th className="p-3">end date</th>
                    </thead>
                    <tbody>
                      <tr className="text-center text-black">
                        <td className="px-4 py-1 ">{idea.campaignName}</td>
                        <td className="px-4 py-1">{idea.postedBy}</td>
                        <td className="px-4 py-1">{idea.startDate}</td>
                        <td className="px-4 py-1">{idea.endDate}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="w-full flex items-center justify-around mt-6">
                    <p>Comments:{idea.comment}</p>
                    <p>
                      Top Staff: {idea.topStaff}
                      <span className="ml-2 rounded-full w-10 h-10 p-3 my-2 border border-[#F2994A]">
                        {idea.totalCoins}
                      </span>
                    </p>
                    <p></p>
                    <p>{idea.likes ? `${idea.likes} likes` : ""}</p>
                    <p>Posted:{idea.posted}</p>
                  </div>
                </div>
              ))}
            </Link>
          </div>
        </div>
        <Modal isVisible={details} onClose={() => setDetails(false)}>
          <div className="w-[569px] p-3 flex flex-col items-center justify-center">
            <div className="uppercase text-[#A09898]">new campaign</div>
            <form className="w-[497px]">
              <div className="mt-4">
                <Input
                  size="lg"
                  label="Campaign Name"
                  name="initiator"
                  // value={initiator}
                  // onChange={handleChange}
                />
              </div>

              <div className="mt-6">
                <Input
                  size="lg"
                  label="Group Owner"
                  name="initiator"
                  // value={initiator}
                  // onChange={handleChange}
                />
              </div>
              <div className="mt-6">
                <Input
                  size="lg"
                  label="Start Date"
                  name="initiator"
                  type="date"
                  // value={initiator}
                  // onChange={handleChange}
                />
              </div>
              <div className="mt-6">
                <Input
                  size="lg"
                  label="End Date"
                  name="initiator"
                  type="date"
                  // value={initiator}
                  // onChange={handleChange}
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="details"
                  className="block text-[#D3D0D0] text-xs mb-2"
                >
                  Minimum of 300 words
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
                  post campaign
                </button>

                {/* <Loader /> */}
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default IdeaHub;
