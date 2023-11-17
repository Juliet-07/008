import React, { useState } from "react";
import Bank from "../assets/bank.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginImage from "../assets/login.png";
import Logo from "../assets/logo(1).png";
import CircleLoader from "react-spinners/CircleLoader";

const Signin = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_AD_BASEURL;
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const initialValues = {
    userName: "",
    password: "",
  };
  const [loginDetails, setLoginDetails] = useState(initialValues);
  const { userName, password } = loginDetails;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };
  const [loading, setLoading] = useState(false);
  // function to validate user through ActiveDirectory
  const handleLoginValidation = () => {
    try {
      fetch(`${apiURL}/AuthenticateUser`, {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((user) => {
          console.log(user, "confirm here");
          let userDetail = JSON.stringify(user.data);
          localStorage.setItem("userInfo", userDetail);
          if (user.message === "User Authenticated Successfully") {
            navigate("/applications");
          }
          if (user.status === "99") {
            alert(user.message);
            navigate("/");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <img
        src={Bank}
        className="absolute inset-0 z-0 h-full w-full bg-contain object-cover"
        alt="Bank"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="absolute flex flex-col items-center justify-center w-full h-full">
        <div className="w-[500px] h-[100px] flex items-center justify-center relative bottom-6">
          <img src={Logo} alt="premium-logo" />
        </div>
        <div>
          <div className="flex bg-gray-200 shadow-2xl rounded-2xl">
            <div className="relative">
              <img
                className="w-[600px] h-[600px] object-cover"
                src={LoginImage}
                alt="PremiumImage"
              />
              <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
              <div className="absolute text-white font-bold text-center bottom-80 left-44 uppercase text-3xl">
                premium <font color="text-red-600">connect</font>
              </div>
            </div>
            <div className="w-[600px] h-[600px] p-12">
              <div className="w-[485px] h-[492px] flex flex-col p-10">
                <div className="text-center font-bold text-3xl">Login</div>
                <form onSubmit={handleSubmit(handleLoginValidation)}>
                  <div className="mt-4">
                    <label
                      htmlFor="userName"
                      className="block text-lg text-gray-800 font-semibold "
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      name="userName"
                      value={userName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-10">
                    <label
                      htmlFor="password"
                      className="block text-lg text-gray-800 font-semibold"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-20">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 font-medium tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      onClick={() => setLoading(!loading)}
                    >
                      Login
                    </button>
                    <div className="flex items-center justify-center mt-2">
                      <CircleLoader loading={loading} color="red" />
                    </div>
                    {/* <Loader /> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signin;
