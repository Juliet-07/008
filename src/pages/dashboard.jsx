import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Avatar from "../assets/dashboard.png";
import Slider from "../components/Slider";

const Dashboard = () => {
  const navigate = useNavigate();
  const APP_ID = import.meta.env.VITE_REACT_APP_APP_ID;
  const apiURL = import.meta.env.VITE_REACT_APP_AD_BASEURL;
  const bdayURL = import.meta.env.VITE_REACT_APP_BIRTHDAY;
  const users = JSON.parse(localStorage.getItem("userInfo"));
  const [user, setUser] = useState("");
  const [initials, setInitials] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [branch, setBranch] = useState("");
  const [birthdays, setBirthdays] = useState([]);
  const [quotes, setQuotes] = useState([]);

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
    getQuotes();
    Birthdays();
  }, []);

  const userDetails = async (_email) => {
    if (_email) {
      await axios
        .post(
          `${apiURL}/GetUserInfoByEmail?email=${_email}@premiumtrustbank.com`
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

  const getQuotes = async () => {
    await axios.get("https://type.fit/api/quotes").then((response) => {
      console.log(response.data, "quotes");
      setQuotes(response.data);
    });
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
      <div className="w-full h-full px-4">

          <div className="flex items-center bg-white/50 rounded-xl shadow-xl mt-4">
            <div className="flex-col p-4">
              {/* <p className="font-bold text-xl">{user.name}</p> */}
              <p className="flex text-xl font-bold">
                Role:
                <span className="mr-2 font-medium pl-2"> {role}</span>
              </p>
              <p className="flex text-xl font-bold">
                Department:
                <span className="mr-2 font-medium pl-2"> {department}</span>
              </p>
              <p className="flex text-xl font-bold">
                Location:
                <span className="mr-2 font-medium pl-2"> {branch}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center bg-white/50 rounded-xl shadow-xl mt-4">
            <div className="flex-col p-4">
              <Carousel
                infiniteLoop
                autoPlay
                showStatus={false}
                showIndicators={false}
                showArrows={false}
              >
                {quotes.map((quote, index) => (
                  <div key={index}>
                    <p className="text-red-600/100 text-2xl">{quote.text}</p>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="w-[300px] 2xl:w-[500px]">
              <Slider />
            </div>
            <div className="w-[300px] 2xl:w-[500px] h-[320px] bg-white rounded-t-xl flex-col shadow-md shadow-red-200 ml-4">
              <div className="h-[52px] bg-red-600 rounded-t-xl text-xl text-white font-medium p-4">
                Who is celebrating?
              </div>
              <div className="bg-white flex flex-col p-4 font-semibold">
                {Array.isArray(birthdays) && birthdays.length ? (
                  <div>
                    {birthdays.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <p>{item?.employee_Name}</p>
                        <div className="bg-red-600 h-10 p-2 text-white rounded-lg text-xl font-normal cursor-pointer my-1">
                          Send a message
                        </div>
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
