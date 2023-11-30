import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import {
  BsClipboardCheck,
  BsCashCoin,
  BsBank2,
  BsShieldLockFill,
  BsPersonCircle,
} from "react-icons/bs";
import { FaSearchDollar, FaLaptopCode, FaMoneyCheck } from "react-icons/fa";
import { FcCustomerSupport, FcIdea } from "react-icons/fc";
import { IoPeopleSharp } from "react-icons/io5";
import {
  MdOutlineApproval,
  MdTimeToLeave,
  MdOutlinePayments,
} from "react-icons/md";
import NIBSS from "../assets/nibss-logo.png";
import FLEXCUBE from "../assets/oracle-flexcube.png";
import ECASHIER from "../assets/e-cashierLogo.png";
import LOGO from "../assets/icon.png";
import { toast } from "react-toastify";
import SplashScreen from "./ideaHub/SplashScreen";

const Applications = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_DUDCHEQUE;
  const APP_ID = import.meta.env.VITE_REACT_APP_IDEA_HUB_APP_ID;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(false);
  let id = user.givenname;
  // let id = "bsm.branch";
  // let id = "review.hq";

  // const [email, setEmail] = useState("");
  // const [email, setEmail] = useState("tommy.lee@premiumtrustbank.com");
  // const [email, setEmail] = useState("bsm1@premiumtrustbank.com");
  const [email, setEmail] = useState("compliance1@premiumtrustbank.com");
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));
  //   userDetails(user.givenname);
  // }, []);
  // const userDetails = async (_email) => {
  //   if (_email) {
  //     await axios
  //       .post(
  //         `${process.env.REACT_APP_AD_BASEURL}/GetUserInfoByEmail?email=${_email}@premiumtrustbank.com`
  //       )
  //       .then((response) => {
  //         console.log(response.data, "userdetails");
  //         let info;
  //         info = response.data.data;
  //         setEmail(info.email);
  //       });
  //   }
  // };

  const applicationMenu = [
    {
      icon: <img src={LOGO} alt="icon" className="w-10 h-10" />,
      path: "http://addressverificationportal.premiumtrustbank.com:8010",
      title: "Address Verification",
    },
    {
      icon: <FaSearchDollar size={30} />,
      path: "http://192.168.201.2/softaml_premiumtrust/login",
      title: "Anti Money Laundering Portal",
    },
    {
      icon: <BsClipboardCheck size={30} />,
      path: "https://apps.powerapps.com/play/e/default-ea5cc842-6f08-4924-bd60-e99929d9531b/a/db1230cd-a5ad-483c-a44b-74a99dbcb975?tenantId=ea5cc842-6f08-4924-bd60-e99929d9531b&sourcetime=2023-08-04%2012%3A43%3A25Z",
      title: "Appraisal Portal",
    },
    {
      icon: <BsShieldLockFill size={30} />,
      path: "https://bvnportal.premiumtrustbank.com/",
      title: "BVN Portal",
    },
    {
      icon: <BsBank2 size={30} />,
      path: "https://cib.premiumtrustbank.com/user/login",
      title: "Corporate Internet Banking",
    },
    {
      icon: <FcCustomerSupport size={30} />,
      path: "http://customermanagementportal.premiumtrustbank.com:447/",
      title: "Customer Management Portal",
    },
    {
      icon: <img src={ECASHIER} className="h-12" alt="e-cashier logo" />,
      path: "https://e-cashierportal.premiumtrustbank.com/",
      title: "E-cashier",
    },
    {
      icon: <BsCashCoin size={30} />,
      path: "http://192.168.201.80:8080/bpm-0/application.ms",
      title: "Expense & Cash Advance",
    },
    {
      icon: <img src={FLEXCUBE} className="h-20" alt="flexcube logo" />,
      path: "https://premiumfcubs.premiumtrustbank.com/FCJNeoWeb/",
      title: "Flexcube",
    },
    {
      icon: <FaLaptopCode size={30} />,
      path: "https://itservicedesk.premiumtrust.net/",
      title: "I.T Service Desk",
    },
    {
      icon: <MdTimeToLeave size={30} />,
      path: "https://apps.powerapps.com/play/e/default-ea5cc842-6f08-4924-bd60-e99929d9531b/a/35593a4c-e6d7-4bda-b389-1968894e731a?source=teamsopenwebsite&screenColor=rgba(255%2C%200%2C%200%2C%201)&hint=62a1fd7f-767c-4e46-adf4-b7c3d84affde#",
      title: "Leave Management Portal",
    },
    {
      icon: <FaSearchDollar size={30} />,
      path: "https://192.168.201.43:19443/main.do",
      title: "Moni Manager Portal",
    },
    {
      icon: <BsClipboardCheck size={30} />,
      path: "https://apps.powerapps.com/play/e/default-ea5cc842-6f08-4924-bd60-e99929d9531b/a/bcbf0888-36c7-4786-a328-5aedc3fd049d?tenantId=ea5cc842-6f08-4924-bd60-e99929d9531b&source=portal",
      title: "Monthly Performance Check",
    },
    {
      icon: <img src={NIBSS} className="h-20" alt="nibss logo" />,
      path: "https://172.18.5.50/",
      title: "NIBSS Portal",
    },
    {
      icon: <BsCashCoin size={30} />,
      path: "http://obiee.premiumtrustbank.com:9502/xmlpserver",
      title: "OBIEE",
    },
    {
      icon: <IoPeopleSharp size={30} />,
      path: "http://pepportal.premiumtrustbank.com:2000/",
      title: "PEP Portal",
    },
    {
      icon: <MdOutlinePayments size={30} />,
      path: "https://revpayapplication.premiumtrustbank.com:8443/Login",
      title: "Revenue Payment Portal",
    },
    {
      icon: <FaSearchDollar size={30} />,
      path: "http://premiumstrportal.premiumtrustbank.com:8081/",
      title: "STR Portal",
    },
    {
      icon: <MdOutlineApproval size={30} />,
      path: "https://apps.powerapps.com/play/e/default-ea5cc842-6f08-4924-bd60-e99929d9531b/a/4b06fec2-d527-4266-b86c-c7e294402242?tenantId=ea5cc842-6f08-4924-bd60-e99929d9531b&screenname=supervisor&skipAppMet&skipmetadata=true#",
      title: "Staff Confirmation Portal",
    },
    {
      icon: <BsPersonCircle size={30} />,
      path: "http://192.168.201.57:8030/",
      title: "Ultimate Beneficial Owner",
    },
    {
      icon: <MdOutlineApproval size={30} />,
      path: "https://web.yammer.com/main/org/premiumtrustbank.com/",
      title: "Yammer",
    },
  ];

  // function to navigate users to appropriate screens
  const url = `${apiURL}/GetUserInfor?UserID=${id}`;
  const handleUserRole = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data.result);
      if (response.data.result.role === "INPUTER") {
        return navigate("/applications/DudChequeTeller");
      }
      if (response.data.result.role === "APPROVER") {
        return navigate("/applications/DudChequeApprover");
      }
      if (response.data.result.role === "REVIEWER") {
        return navigate("/applications/DudChequeReviewer");
      } else {
        return alert("You are not allowed to view this page.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRole = async () => {
    try {
      const response = await axios.get(url);
      console.log(response.data.result);
      if (response.data.result.role === "INPUTER") {
        return navigate("/applications/counterfeitNoteTeller");
      }
      if (response.data.result.role === "APPROVER") {
        return navigate("/applications/counterfeitNoteApprover");
      }
      if (response.data.result.role === "REVIEWER") {
        return navigate("/applications/counterfeitNoteReport");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to validate user PND Portal
  const handlePndValidation = () => {
    const payload = {
      email: email,
    };
    try {
      fetch(`${process.env.REACT_APP_PND}SignIn/PNDSignIn`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((user) => {
          console.log(user, "confirm here");
          let pndUserData = JSON.stringify(user.data);
          localStorage.setItem("pndUser", pndUserData);
          toast.success(user.message);
          if (user.data.role === "customer experience managers") {
            return navigate("/applications/pndCP");
          }
          if (user.data.role === "relationship managers") {
            return navigate("/applications/pndHome");
          }
          if (user.data.role === "bsm") {
            return navigate("/applications/pndBsm");
          }
          if (user.data.role === "compliance") {
            return navigate("/pndCompliance");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  let name = user.givenname;
  const handleUserIdeaHubRoleRoute = async () => {
    let email = name;
    // let email = "Sarah.Omoike";
    let user;
    let url = `http://192.168.201.57:449/api/UserApplications/getUserRoleByEmail&AppId?AppId=${APP_ID}&email=${email}@premiumtrustbank.com`;
    try {
      setShowSplash(true);
      const response = await axios.get(url);
      console.log(response.data, "User Info IdeaHub");
      user = response.data;
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // navigation
      if (user.data === null && user.responseMessage === "User Not Profiled") {
        return navigate("/applications/ideaHub-employee");
      }
      if (user.roleDescription === "Moderator") {
        return navigate("/applications/ideaHub-moderator");
      }
      if (user.roleDescription === "Management") {
        return navigate("/applications/ideaHub-management");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Hide the splash screen after the navigation or in case of an error
      setShowSplash(false);
    }
  };

  // const handleShowSplashScreen = () => {
  //   setShowSplash(true);
  //   setTimeout(() => {
  //     window.location.href = "/applications/ideaHub";
  //   }, 5000);
  // };

  // useEffect(() => {
  //   return () => {
  //     setShowSplash(false);
  //   };
  // }, []);

  return (
    <>
      {showSplash && <SplashScreen />}
      {!showSplash && (
        <div className="w-full h-[89vh] overflow-auto">
          <div>
            <div className="grid grid-cols-3 gap-10 md:gap-0 text-black text-lg font-medium">
              <div
                className="w-[300px] h-20 bg-white flex items-center justify-between rounded-lg m-4 p-4 border border-gray-600 cursor-pointer"
                onClick={handleRole}
              >
                <p>CounterfeitNote Portal</p>
                <p>
                  <FaMoneyCheck size={30} color="red" />
                </p>
              </div>
              <div
                className="w-[300px] h-20 bg-white flex items-center justify-between rounded-lg m-4 p-4 border border-gray-600 cursor-pointer"
                onClick={handleUserRole}
              >
                <p>DudCheque Portal</p>
                <p>
                  <FaMoneyCheck size={30} color="red" />
                </p>
              </div>
              <div>
                <div
                  className="w-[300px] h-20 bg-white flex items-center justify-between rounded-lg m-4 p-4 border border-gray-600 cursor-pointer"
                  onClick={handleUserIdeaHubRoleRoute}
                >
                  <p>Idea Hub</p>
                  <p>
                    <FcIdea size={30} />
                  </p>
                </div>
              </div>

              <div
                className="w-[300px] h-20 bg-white flex items-center justify-between rounded-lg m-4 p-4 border border-gray-600 cursor-pointer"
                onClick={handlePndValidation}
              >
                <p>PND Portal</p>
                <p>
                  <IoPeopleSharp size={30} color="red" />
                </p>
              </div>
              {applicationMenu.map((menu) => (
                <a href={menu.path} target="_blank" rel="noopener noreferrer">
                  <div className="w-[300px] h-20 bg-white flex items-center justify-between rounded-lg m-4 p-4 border border-gray-600 cursor-pointer">
                    <p>{menu.title}</p>
                    <p>{menu.icon}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;
