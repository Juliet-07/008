import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Disclosure, Menu, Transition, Popover } from "@headlessui/react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { IoPersonSharp } from "react-icons/io5";
import Logo from "../../../assets/logo.png";

const navigation = [
  { name: "Dashboard", href: "/pndCompliance" },
  { name: "All PND", href: "/allPND" },
  { name: "Lifted PND", href: "/liftedPND" },
  { name: "Bulk PND", href: "/bulkPND" },
  { name: "Manage Users", href: "/userManager" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [loggedin, setLoggedin] = useState(true);
  const handleLogin = () => {
    console.log("logging into app");
    setLoggedin(!loggedin);
  };

  const logout = () => {
    // localStorage.clear();
    navigate("/dashboard");
  };

  if (loggedin === true) {
    return (
      <Disclosure as="nav" className="shadow-md no-underline px-20">
        {({ open }) => (
          <>
            <div className="h-[72px] flex items-center justify-between">
              {/* logo */}
              <div>
                <img
                  className="w-auto h-24"
                  src={Logo}
                  alt="PremiumTrust Bank"
                />
              </div>
              {/* menu */}
              <div className="flex px-32 space-x-4 no-underline">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => {
                      return (
                        "px-6 py-2 rounded-md text-lg font-medium no-underline" +
                        (isActive
                          ? "text-white font-semibold bg-red-800 no-underline hover:bg-red-500"
                          : "bg-[#FFE9E9] text-gray-800 hover:bg-red-500 no-underline")
                      );
                    }}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              {/* Profile dropdown */}
              <div className="flex items-center justify-around">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm">
                      <span className="sr-only">Open user menu</span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-gray-400">
                        <IoPersonSharp size={20} />
                      </div>
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
                            href="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
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
                        </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={logout}
                          >
                            Logout
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
            {/* <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-[#FFE9E9] text-black"
                        : "text-gray-800 hover:bg-[#FFE9E9] hover:text-gray-800",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <button onClick={handleLogin}>Logout</button>
            </Disclosure.Panel> */}
          </>
        )}
      </Disclosure>
    );
  }
  return (
    <div>
      what is here sef?
      {/* <Login /> */}
    </div>
  );
}
