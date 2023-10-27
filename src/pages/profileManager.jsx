import React from "react";
import Icon from "../assets/icon.png";

const ProfileManager = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[400px] md:w-[500px] flex items-center justify-center bg-white shadow-xl border rounded-lg mt-10 2xl:mt-20">
        <div className="w-[400px]">
          <div className="flex flex-col items-center justify-center">
            <img src={Icon} alt="icon" className="w-10 h-10" />
            <div className="font-bold text-2xl my-2 text-center">
              Staff Profile Manager
            </div>
          </div>
          <form>
            <div className="mx-4">
              <label className="mb-2 text-sm font-medium text-[#2d3748]">
                Address
              </label>
              <input
                type="text"
                className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
                required
                //   name="fullname"
                //   value={fullname}
                //   onChange={handleChange}
              />
            </div>
            <div className="m-4">
              <label className="mb-2 text-sm font-medium text-[#2d3748]">
                Department
              </label>
              <input
                type="text"
                className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
                required
                //   name="Department"
                //   value={username}
                //   onChange={handleChange}
              />
            </div>
            <div className="m-4">
              <label className="mb-2 text-sm font-medium text-[#2d3748]">
                Location
              </label>
              <input
                type="text"
                className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
                required
                //   name="email"
                //   value={email}
                //   onChange={handleChange}
              />
            </div>
            <div className="m-4">
              <label className="mb-2 text-sm font-medium text-[#2d3748]">
                Supervisor
              </label>
              <input
                type="text"
                className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
                required
                //   name="email"
                //   value={email}
                //   onChange={handleChange}
              />
            </div>
            <div className="m-4">
              <label className="mb-2 text-sm font-medium text-[#2d3748]">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full h-[48px] border border-[#d1d1d1] rounded-[5px] p-2"
                required
                //   name="email"
                //   value={email}
                //   onChange={handleChange}
              />
            </div>
            <div className="mb-4 mt-6">
              <button
                type="submit"
                className="text-center p-3 text-white text-lg font-bold bg-red-600 w-full h-[48px] border rounded-[5px]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
