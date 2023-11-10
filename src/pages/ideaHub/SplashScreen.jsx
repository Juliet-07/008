import React from "react";
import Logo from "../../assets/light-bulb-idea.gif";

const SplashScreen = () => {
  return (
    <>
      <div className="w-full h-[87vh] flex flex-col items-center justify-center my-10 bg-white shadow-xl">
        <img src={Logo} alt="light-bulb-gif" className="w-[500px] h-[500px]" />
        <div className="mt-10 font-bold uppercase text-3xl">Welcome to Idea Hub</div>
        <p className="my-4 text-xl">The Home of Innovation & Collaboration</p>
      </div>
    </>
  );
};

export default SplashScreen;
