import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import { Disclosure, Menu, Transition } from "@headlessui/react";

const Header = ({ text }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [hour, setHour] = useState(null);
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user !== null || user !== undefined) {
      setUser(user);
    }
    const _initials = user.name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    setInitials(_initials);
    timeGreeting();
  }, []);

  const timeGreeting = () => {
    let date = new Date();
    let hour = date.getHours();
    setHour(hour);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="w-full bg-red-600 h-20 flex items-center justify-between px-10 shadow-xl">
        <div className="text-white font-semibold text-xl">{text}</div>
        <div className="flex items-center justify-center text-white font-bold text-2xl">
          <div className="text-base font-semibold p-2">
            {hour < 12
              ? "Good Morning "
              : hour < 17
              ? "Good Afternoon "
              : "Good Evening "}
            {user.name}
          </div>
          {/* <div className="w-14 h-14 bg-gray-100 m-4 rounded-full flex items-center justify-center">
            <IoPersonSharp size={20} />
          </div> */}
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FF1C1D]">
                <span className="sr-only">Open user menu</span>
                {/* <div className="w-14 h-14 bg-gray-100 m-4 rounded-full flex items-center justify-center">
                  <IoPersonSharp size={20} />
                </div> */}
                <div className="bg-gray-200 w-14 h-14 text-2xl text-black text-center p-2 rounded-full mx-4 my-2 flex items-center justify-center">
                  {initials}
                </div>
                {/* <img
                  className="w-12 h-12 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="profileImage"
                /> */}
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Header;
