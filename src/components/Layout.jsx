// https://preline.co/docs/sidebar.html
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import {
  BsArrowLeftShort,
  BsChevronDown,
  BsFillPieChartFill,
  BsCart4,
} from "react-icons/bs";
import {
  MdDashboard,
  MdOutlineSettingsApplications,
  MdOutlineConnectWithoutContact,
  MdQuestionAnswer,
  MdOutlineLogout,
} from "react-icons/md";
import { GoFileDirectory } from "react-icons/go";
import { GiBookmark } from "react-icons/gi";
import {
  FaCashRegister,
  FaJournalWhills,
  FaPeopleArrows,
} from "react-icons/fa";
import { FcOpenedFolder, FcManager } from "react-icons/fc";
import { FiSettings } from "react-icons/fi";
import { RiCustomerService2Line } from "react-icons/ri";
import { SiFormstack } from "react-icons/si";
import Icon from "../assets/ICON-PNG.png";
import Header from "./Header";
import Footer from "./Footer";
import TextSlides from "./TextSlides";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const Menus = [
    { title: "Overview", path: "/dashboard" },
    {
      title: "Applications",
      icon: <MdOutlineSettingsApplications />,
      path: "/applications",
    },
    {
      title: "Customer Service",
      icon: <RiCustomerService2Line />,
      path: "/customer-service",
    },
    {
      title: "Data Processing",
      icon: <FcOpenedFolder />,
      path: "/dataProcessing",
    },
    {
      title: "Directories ",
      icon: <FaJournalWhills />,
      path: "/directories",
    },
    {
      title: "Employee Connect",
      icon: <FaPeopleArrows />,
      path: "/employee-connect",
    },
    {
      title: "Enquiries",
      icon: <MdQuestionAnswer />,
      path: "/enquiries",
    },
    {
      title: "Forms & Register",
      icon: <SiFormstack />,
      path: "/forms",
    },
    // {
    //   title: "Performance Evaluation",
    //   icon: <BsFillPieChartFill />,
    //   path: "/performanceEvaluation",
    // },
    {
      title: "Policies & Procedure",
      icon: <GiBookmark />,
      path: "/policies",
    },
    { title: "Profile Manager", path: "/manager", icon: <FcManager /> },
    // {
    //   title: "Requisitions",
    //   icon: <BsCart4 />,
    //   path: "/requisitions",
    //   submenu: true,
    //   submenuItems: [
    //     {
    //       title: "FCUBS",
    //       path: "https://premiumfcubs.premiumtrustbank.com/FCJNeoWeb",
    //     },
    //     {
    //       title: "OBIEE",
    //       path: "http://obiee.premiumtrustbank.com:9502/xmlpserver",
    //     },
    //     {
    //       title: "NIBSS Document Verification Portal",
    //       path: "https://172.18.5.50/",
    //     },
    //     {
    //       title: "PEP",
    //       path: "https://apps.powerapps.com/play/e1210308-4253-40fe-bf2e-e7e287a1f406?tenantId=ea5cc842-6f08-4924-bd60-e99929d9531b",
    //     },
    //     {
    //       title: "SOFTAML",
    //       path: "http://192.168.201.2/softaml_premiumtrust/login",
    //     },
    //     {
    //       title: "BVN Validation Portal",
    //       path: "https://bvnportal.premiumtrustbank.com/",
    //     },
    //     {
    //       title: "Cooperate Internet Banking",
    //       path: "https://cib.premiumtrustbank.com/user/login",
    //     },
    //   ],
    // },
    // { title: "Settings", path: "/settings", icon: <FiSettings /> },
    // {
    //   title: "Logout",
    //   path: "/",
    //   icon: <MdOutlineLogout />,
    //   // spacing: true,
    // },
  ];
  const activeLink =
    "mx-4 flex justify-start items-center text-white text-2xl space-x-1 font-bold bg-red-600 rounded-xl";
  const normalLink =
    "hover:bg-red-500 mt-3 mx-4 flex justify-start items-center text-white text-base space-x-1 font-semibold";

  const SidebarLinks = ({ menu }) => {
    return (
      <NavLink
        to={menu.path}
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <li
          className={`text-white flex items-center gap-x-2 cursor-pointer p-2.5 hover:bg-red-600 hover:text-white hover:font-semibold rounded-md mt-2 ${
            menu.spacing ? "mt-10" : "mt-0"
          }`}
        >
          <span className="text-2xl block float-left">
            {menu.icon ? menu.icon : <MdDashboard />}
          </span>
          <span
            className={`text-base font-medium duration-200 ${
              !open && "hidden"
            }`}
          >
            {menu.title}
          </span>
          {/* {menu.submenu && open && (
            <BsChevronDown
              className={`${submenuOpen && "rotate-180"}`}
              onClick={() => {
                setSubmenuOpen(!submenuOpen);
              }}
            />
          )} */}
        </li>
        {/* {menu.submenu && submenuOpen && open && (
          <ul>
            {menu.submenuItems.map((submenuItem, index) => (
              <li
                key={index}
                className="text-[#9B9CA0] flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-red-600 hover:text-white hover:font-semibold rounded-md mt-2"
              >
                {submenuItem.title}
              </li>
            ))}
          </ul>
        )} */}
      </NavLink>
    );
  };
  return (
    <div className="w-full h-full">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`h-screen bg-[#2b2e35] pt-8 ${
            open ? "w-80" : "w-[100px]"
          } duration-300 relative`}
        >
          <BsArrowLeftShort
            className={`bg-red-600 text-white text-3xl rounded-full absolute -right-3 top-9 border border-red-600 cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
          <div className="inline-flex  mx-2">
            <img
              src={Icon}
              alt="PremiumIcon"
              className={`w-12 h-12 duration-500 ${open && "rotate-[360deg]"}`}
            />
            <div
              className={`font-bold text-xl text-red-600 origin-left duration-300 p-2 ${
                !open && "scale-0"
              }`}
            >
              PremiumTrust Bank
            </div>
          </div>
          <ul>
            {Menus.map((menu, index) => (
              <SidebarLinks key={index} menu={menu} />
            ))}
          </ul>
          <Footer />
        </div>
        {/* Content */}
        <div className="w-full bg-gray-50">
          <Header text="Dashboard" />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
