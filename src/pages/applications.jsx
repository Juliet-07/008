import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import {
  BsClipboardCheck,
  BsCashCoin,
  BsBank2,
  BsShieldLockFill,
  BsPersonCircle,
} from "react-icons/bs";
import { FaSearchDollar, FaLaptopCode } from "react-icons/fa";
import { FcCustomerSupport } from "react-icons/fc";
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

const Applications = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [email, setEmail] = useState("tommy.lee@premiumtrustbank.com");
  // const [email, setEmail] = useState("bsm1@premiumtrustbank.com");
  const [email, setEmail] = useState("compliance1@premiumtrustbank.com");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    userDetails(user.givenname);
  }, []);
  const userDetails = async (_email) => {
    if (_email) {
      await axios
        .post(
          `${process.env.REACT_APP_AD_BASEURL}/GetUserInfoByEmail?email=${_email}@premiumtrustbank.com`
        )
        .then((response) => {
          console.log(response.data, "userdetails");
          let info;
          info = response.data.data;
          // setEmail(info.email);
        });
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
      path: "https://apps.powerapps.com/play/e/default-ea5cc842-6f08-4924-bd60-e99929d9531b/a/bcbf0888-36c7-4786-a328-5aedc3fd049d?tenantId=ea5cc842-6f08-4924-bd60-e99929d9531b&source=portal",
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
  return (
    <>
      {/* <div className="w-full h-[89vh] bg-gradient-to-r from-gray-500 via-red-500 to-black"> */}
      <div className="w-full h-full">
        <div className="">
          <div className="grid grid-cols-3 gap-10 md:gap-0 text-black text-lg font-medium">
            {applicationMenu.map((menu) => (
              <a href={menu.path} target="_blank" rel="noopener noreferrer">
                <div className="w-[300px] h-20 bg-white flex items-center justify-between rounded-lg m-4 p-4 border border-gray-600">
                  <p>{menu.title}</p>
                  <p>{menu.icon}</p>
                </div>
              </a>
            ))}

            <div
              className="flex flex-col items-center justify-center text-center w-32 h-32 rounded-xl shadow-xl shadow-red-300 m-4 bg-white text-red-600 cursor-pointer"
              onClick={handlePndValidation}
            >
              <IoPeopleSharp size={40} color="red" />
              PND Portal
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Applications;
