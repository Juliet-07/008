import React from "react";
import { FcIdea } from "react-icons/fc";
import { Link } from "react-router-dom";

const IdeaHub = () => {
  const ideas = [
    {
      postedBy: "I.T",
      campaignName: "Account Opening",
      startDate: "date",
      endDate: "date",
      comment: "20",
      topStaff: "Sarah Omoike",
      totalCoins: "30 coins",
      posted: "2 days ago",
    },
    {
      postedBy: "H.R",
      campaignName: "Account Opening",
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
      campaignName: "Account Opening",
      startDate: "date",
      endDate: "date",
      comment: "20",
      topStaff: "Sarah Omoike",
      totalCoins: "30 coins",
      posted: "2 days ago",
    },
    {
      postedBy: "I.T",
      campaignName: "Account Opening",
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
      campaignName: "Account Opening",
      startDate: "date",
      endDate: "date",
      comment: "20",
      topStaff: "Sarah Omoike",
      totalCoins: "30 coins",
      posted: "2 days ago",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="uppercase text-xl mt-4 mb-2 font-semibold flex items-center">
        welcome to the idea hub{" "}
        <span>
          <FcIdea size={30} />
        </span>
      </div>
      <div className="text-[#84817E]">
        Your reactions, suggestions are what we need for inovation and for
        shaping the future.
      </div>
      <Link to="/applications/ideaDescription">
        <div>
          {ideas.map((idea) => (
            <div className="w-[900px] 2xl:w-[1180px] h-full flex flex-col item-center shadow-xl p-4 m-4 text-sm text-gray-800 bg-white/50">
              <table className="w-full">
                <thead className="text-[#84817E] uppercase">
                  <th className="p-4">campaign</th>
                  <th className="p-4">group</th>
                  <th className="p-4">start date</th>
                  <th className="p-4">end date</th>
                </thead>
                <tbody>
                  <tr className="text-center text-black">
                    <td className="px-4 py-2 ">{idea.campaignName}</td>
                    <td className="px-4 py-2">{idea.postedBy}</td>
                    <td className="px-4 py-2">{idea.startDate}</td>
                    <td className="px-4 py-2">{idea.endDate}</td>
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
        </div>
      </Link>
    </div>
  );
};

export default IdeaHub;
