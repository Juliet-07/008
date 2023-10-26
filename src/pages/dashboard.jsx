import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import Awards from "../assets/awards.png";
import Product from "../assets/product3.jpg";
import USSD from "../assets/ussd.jpg";
import MD from "../assets/md.jpg";
import Calendar from "../components/Calendar";
import { IoMdSchool } from "react-icons/io";
import { BiPoll } from "react-icons/bi";
import { BsFillAwardFill } from "react-icons/bs";
import { GiOrganigram } from "react-icons/gi";
import { GoOrganization } from "react-icons/go";
import { FiLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const Dashboard = () => {
  const APP_ID = import.meta.env.VITE_REACT_APP_APP_ID;
  const baseURL = import.meta.env.VITE_REACT_APP_AD_BASEURL;
  const bdayURL = import.meta.env.VITE_REACT_APP_BIRTHDAY;
  const users = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [initials, setInitials] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    userDetails(user.givenname);
    if (user !== null || user !== undefined) {
      setUser(user);
    }
    const _initials = user.name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    setInitials(_initials);
    Birthdays();
  }, []);

  const userDetails = async (_email) => {
    if (_email) {
      await axios
        .post(
          `${baseURL}/GetUserInfoByEmail?email=${_email}@premiumtrustbank.com`
        )
        .then((response) => {
          console.log(response.data, "userdetails");
          let info;
          info = response.data.data;
          setRole(info.title);
          setDepartment(info.department);
          setBranch(info.streetAddress);
        });
    }
  };

  const Birthdays = async () => {
    try {
      await axios
        .get(`${bdayURL}/EmployeeBirthday/GetAllBirthdaysToday`)
        .then((response) => {
          console.log(response.data, "birthdays");
          setBirthdays(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserARRoleRoute = () => {
    let email = users.givenname; //supervisor
    // let email = "Damilola.Falonipe";
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
    <>
      <div className="w-full h-full">
        <div className="flex items-center justify-between bg-gray-400 w-[1000px] 2xl:w-[1500px] h-[150px] rounded-xl mx-6 my-10 px-6">
          <div>quotes here</div>
          <div>avatar here</div>
        </div>
        <div className="flex mx-4 my-6">
          <Calendar />
          <div className="w-[423px] h-[320px] bg-white rounded-t-xl flex-col shadow-md shadow-red-200 ml-4">
            <div className="h-[52px] bg-red-600 rounded-t-xl text-xl text-white font-medium p-4">
              Who is celebrating?
            </div>
            <div className="bg-white flex flex-col p-4 font-semibold">
              {Array.isArray(birthdays) && birthdays.length ? (
                <div>
                  {birthdays.map((item, index) => (
                    <div key={index}>
                      <p>{item?.employee_Name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <h3>No birthdays today</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
