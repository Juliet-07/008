// https://preline.co/docs/sidebar.html
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdDashboard, MdOutlineSettingsApplications } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { GiBookmark } from "react-icons/gi";
import { FcManager } from "react-icons/fc";
import { IoMdSchool } from "react-icons/io";
import { SiFormstack } from "react-icons/si";
import Icon from "../assets/ICON-PNG.png";
import Header from "./Header";
import Footer from "./Footer";
import TextSlides from "./TextSlides";

const Layout = ({ children }) => {
  const APP_ID = import.meta.env.VITE_REACT_APP_APP_ID;
  const users = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const Menus = [
    // { title: "Overview", path: "/dashboard" },
    {
      title: "Applications",
      icon: <MdOutlineSettingsApplications />,
      path: "/applications",
    },
    {
      title: "Business Processes",
      icon: <SiFormstack />,
      path: "/businessProcesses",
    },
    {
      title: "Forms & Templates",
      icon: <SiFormstack />,
      path: "/forms",
    },
    {
      title: "PKE Materials",
      icon: <IoMdSchool />,
      path: "/premiumKnowledgeExchange",
    },
    {
      title: "Policies & Procedure",
      icon: <GiBookmark />,
      path: "/policies",
    },
    { title: "Profile Manager", path: "/manager", icon: <FcManager /> },
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
  const handleUserARRoleRoute = () => {
    // let email = users.givenname; //supervisor
    let email = "Damilola.Falonipe";
    // let email = "Sarah.Omoike";    //approval-one
    // let email = "Olatunji.Oseni";  //approval-two
    // let email = "Amechi.Ojei";     //approval-three
    let user;
    axios
      .get(
        `http://192.168.201.57:449/api/UserApplications/getUserRoleByEmail&AppId?AppId=${APP_ID}&email=${email}@premiumtrustbank.com`
      )
      .then((response) => {
        console.log(response.data, "User Info AR");
        user = response.data;
        if (
          user.data === null &&
          user.responseMessage === "User Not Profiled"
        ) {
          return navigate("/access-requests");
        }
        if (user.roleDescription === "Supervisor") {
          return navigate("/access-requests/supervisorPage");
        }
        if (user.roleDescription === "ApprovalOne") {
          return navigate("/access-requests/CISOPage");
        }
        if (user.roleDescription === "ApprovalTwo") {
          return navigate("/access-requests/CCOPage");
        }
        if (user.roleDescription === "ApprovalThree") {
          return navigate("/access-requests/CIOPage");
        }
      });
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
          <div
            className="text-white flex items-center gap-x-2 cursor-pointer p-2.5 hover:bg-red-600 hover:text-white hover:font-semibold rounded-md mt-2 mx-4"
            onClick={handleUserARRoleRoute}
          >
            <span className="block float-left">
              <GoOrganization size={30} />
            </span>
            User Access Request
          </div>
          {/* <Footer /> */}
        </div>
        {/* Content */}
        <div className="w-full bg-gray-50">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
