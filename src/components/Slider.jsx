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
    <div className="w-full h-full">
      <img src={MD} alt="Logo" className="w-[450px] h-[300px]" />
    </div>
    <div className="w-full h-full">
      <img src={MD1} alt="Logo" className="w-[450px] h-[300px]" />
    </div>
    <div className="w-full h-full">
      <img src={USSD} alt="Logo" className="w-[450px] h-[300px]" />
    </div>
    {/* <div className="w-full h-full">
      <img src={Logo} alt="Logo" className="h-[200px]" />
    </div>
    <div className="w-full h-full">
      <img src={Slide1} alt="Logo" className="h-[200px]" />
    </div>
    <div className="w-full h-full">
      <img src={Bank} alt="Logo" className="h-[200px]" />
    </div>
    <div className="w-full h-full">
      <img src={Slide2} alt="Logo" className="h-[200px]" />
    </div>
    <div className="w-full h-full">
      <img src={Slide3} alt="Logo" className="h-[200px]" />
    </div>
    <div className="w-full h-full">
      <img src={Slide4} alt="Logo" className="h-[200px]" />
    </div> */}
  </Carousel>
);
export default Slider;

// import React, { useState } from "react";
// import {
//   BsChevronCompactLeft,
//   BsChevronCompactRight,
//   BsDot,
// } from "react-icons/bs";

// const Slider = () => {
//   const slides = [
//     {
//       url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
//     },

//     {
//       url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
//     },
//     {
//       url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   const nextSlide = () => {
//     const isLastSlide = currentIndex === slides.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   const goToSlide = (slideIndex) => {
//     setCurrentIndex(slideIndex);
//   };

//   return (
//     <div className="max-w-[600px] xl:max-w-[900px] h-[400px] w-full py-10 mx-4 relative group">
//       <div
//         style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
//         className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
//       ></div>
//       {/* Left Arrow */}
//       <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
//         <BsChevronCompactLeft onClick={prevSlide} size={30} />
//       </div>
//       {/* Right Arrow */}
//       <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
//         <BsChevronCompactRight onClick={nextSlide} size={30} />
//       </div>
//       <div className="flex top-4 justify-center py-2">
//         {slides.map((slide, slideIndex) => (
//           <div
//             key={slideIndex}
//             onClick={() => goToSlide(slideIndex)}
//             className="text-2xl cursor-pointer"
//           >
//             <BsDot />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;
