import React from "react";
import Navbar from "./Navbar";
import Image from "../../../assets/profile.png";
import { FiEdit3 } from "react-icons/fi";
import { MdLogout } from "react-icons/md";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center my-10">
        <div>
          <div className="text-3xl font-bold">Profile</div>
          <div className="my-[32px] w-[638px] h-[472px] rounded-lg bg-white">
            <div className="w-full h-[145px] bg-[#2b2e35] rounded-t-lg relative flex items-center justify-center">
              <div className="absolute rounded-full w-[208px] h-[208px] top-20">
                <img src={Image} alt="profile-picture" />
              </div>
              <div className="absolute text-white right-96 left-[500px] top-20 flex items-center font-medium text-xl">
                <span className="mr-2">
                  <FiEdit3 size={30} />
                </span>
                EditPhoto
              </div>
            </div>
            <div className="flex flex-col items-center justify-center relative top-[170px]">
              <div className="font-bold text-xl text-[#2b2e35]">
                Juliet Cameron
              </div>
              <div className="font-normal text-xl">Email</div>
              <div className="w-[130px] h-[44px] rounded-md flex items-center justify-center border border-[#2b2e35] bg-[#f4f4f4] my-4">
                <span className="mr-2">
                  <MdLogout />
                </span>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
