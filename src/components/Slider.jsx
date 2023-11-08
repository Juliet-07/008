import React from "react";
import { Carousel } from "antd";
import Logo from "../assets/logo.png";
import Slide1 from "../assets/naira.png";
import Bank from "../assets/bank.png";
import Slide2 from "../assets/banner1.jpeg";
import Slide3 from "../assets/codeBanner.jpeg";
import Slide4 from "../assets/qrBanner.jpeg";
import MD from "../assets/md.jpg";
import MD1 from "../assets/md1.jpg";
import USSD from "../assets/ussd.jpg";
const Slider = () => (
  <Carousel
    autoplay
    className="max-w-[600px] xl:max-w-[900px] h-[350px] w-full py-10 mx-4 my-6 relative group"
  >
    <div className="w-full h-[300px]">
      <img src={MD} alt="Logo" />
    </div>
    <div className="w-full h-[300px]">
      <img src={MD1} alt="Logo" />
    </div>
    <div className="w-full h-[300px]">
      <img src={USSD} alt="Logo" />
    </div>
    <div className="w-full h-[300px]">
      <img src={Logo} alt="Logo" />
    </div>
    <div className="w-full h-[300px]">
      <img src={Slide1} alt="Logo" />
    </div>
    <div className="w-full h-[300px]">
      <img src={Bank} alt="Logo" />
    </div>
    <div className="w-full h-[300px]">
      <img src={Slide2} alt="Logo" />
    </div>
    <div className="w-full h-[300px]">
      <img src={Slide3} alt="Logo" />
    </div>
    <div className="w-full h-[300px]">
      <img src={Slide4} alt="Logo" />
    </div>
  </Carousel>
);
export default Slider;
