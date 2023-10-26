import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import Awards from "../assets/awards.png";
import Product from "../assets/product3.jpg";
import Bank from "../assets/bank.png";
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
import Modal from "../components/Modal";
// import FORM from "../assets/accessForm.pdf";

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
  const [modal, setModal] = useState(false);

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
        .get(
          `${bdayURL}/EmployeeBirthday/GetAllBirthdaysToday`
        )
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
      <div className="flex w-full h-full p-4 bg-gradient-to-r from-gray-500 via-red-500 to-black">
        <motion.div
          variants={fadeIn("right", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="w-[50%]"
        >
          {/* user info */}
          <div className="flex items-center bg-gray-400 w-[450px] h-[150px] rounded-xl shadow-lg m-4">
            <div className="bg-gradient-to-r from-red-600 to-gray-500 w-20 h-20 text-3xl text-black text-center p-2 rounded-full mx-4 my-2 flex items-center justify-center font-semibold">
              {initials}
            </div>
            <div className="flex-col my-2">
              <p className="font-bold text-xl">{user.name}</p>
              <p className="flex text-base font-bold">
                <span className="mr-2 font-medium">Role: {role}</span>
              </p>
              <p className="flex text-base font-bold">
                <span className="mr-2 font-medium">
                  Department: {department}
                </span>
              </p>
              <p className="flex text-base font-bold">
                <span className="mr-2 font-medium">Location: {branch}</span>
              </p>
            </div>
          </div>
          <div className="mb-4">
            <Slider />
          </div>
          {/* <div className="w-[500px] mt-10 h-[350px] mx-4">
            <img src={MD} alt="Developer" className="w-full h-full" />
          </div> */}
          {/* news */}
          <div className="max-w-[600px] xl:max-w-[900px] flex-col shadow-md shadow-red-200 mx-4 mt-10">
            <div className="h-[52px] bg-red-600 rounded-t-xl text-xl text-white font-medium p-4">
              Latest News
            </div>
            <a
              href="https://premiumtrustbank.com/premiumtrust-bank-wins-most-innovative-bank-of-the-year-award-at-leadership-awards/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="bg-white h-20 flex items-center rounded-lg border-b border-b-gray-400 mb-2">
                <img src={Product} className="w-32 h-14 mr-4" alt="news" />
                <div className="font-semibold">
                  PremiumTrust Bank celebrates one year anniversary
                </div>
              </div>
            </a>
            <a
              href="https://premiumtrustbank.com/a-national-award-to-a-worthy-leader/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="bg-white h-20 flex items-center rounded-lg border-b border-b-gray-400 mb-2">
                <img src={MD} className="w-32 h-14 mr-4" alt="news" />
                <div className="font-semibold">
                  A National Award to a worthy leader
                </div>
              </div>
            </a>
            <a
              href="https://premiumtrustbank.com/premiumtrust-bank-wins-most-innovative-bank-of-the-year-award-at-leadership-awards/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="bg-white h-20 flex items-center rounded-lg border-b border-b-gray-400 mb-2">
                <img src={Awards} className="w-32 h-14 mr-4" alt="news" />
                <div className="font-semibold">
                  PremiumTrust Bank wins most innovative bank of the year
                </div>
              </div>
            </a>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.5)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="w-[50%]"
        >
          {/* quick nav */}
          <div className="grid grid-cols-3 gap-4 text-white text-sm font-semibold my-4">
            <NavLink to="/premiumKnowledgeExchange">
              <div className="w-full p-2 h-[60px] rounded shadow-md bg-gray-400 flex flex-col items-center justify-center">
                <IoMdSchool size={30} />
                <div>Trainings</div>
              </div>
            </NavLink>
            <div className="w-full p-2 h-[60px] rounded shadow-md bg-gray-400 flex flex-col items-center justify-center">
              <GiOrganigram size={30} />
              <div>Organogram</div>
            </div>
            <a
              href="https://www.linkedin.com/company/premiumtrust-bank/mycompany/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-full p-2 h-[60px] rounded shadow-md bg-gray-400 flex flex-col items-center justify-center">
                <FiLink size={30} />
                <div>Quick Links</div>
              </div>
            </a>
            <a
              href="https://www.surveymonkey.com/r/?sm=afwO78R1IuwaOUP3F6ZEoA_3D_3D"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-full p-2 h-[60px] rounded shadow-md bg-gray-400 mt-4 flex flex-col items-center justify-center">
                <BiPoll size={30} />

                <div>Polls & Survey</div>
              </div>
            </a>
            <NavLink to="/business-processes">
              <div className="w-full p-2 h-[60px] rounded shadow-md bg-gray-400 mt-4 flex flex-col items-center justify-center">
                <BsFillAwardFill size={30} />
                <div>SOP</div>
              </div>
            </NavLink>

            {/* <NavLink to="/access-requests"> */}
            <div
              className="w-full p-2 h-[60px] rounded shadow-md bg-gray-400 mt-4 flex flex-col items-center justify-center cursor-pointer"
              onClick={handleUserARRoleRoute}
            >
              <GoOrganization size={30} />
              <div>User Access Request</div>
            </div>
            {/* </NavLink> */}
          </div>
          {/* widgets */}
          <div className="flex mt-6">
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
          <div className="w-[620px] lg:w-[900px] xl:w-[630px] bg-gradient-to-r from-gray-300 to-black rounded-t h-[300px] mt-20">
            <img src={USSD} alt="Developer" className="w-full h-full" />
          </div>
        </motion.div>
      </div>
      {/* <Modal isVisible={modal} onClose={() => setModal(false)}>
        <iframe
          src={FORM}
          title="Access Control Form"
          style={{ width: "78vw", height: "75vh" }}
        />
      </Modal> */}
    </>
  );
};

export default Dashboard;
