import React, { useState, Fragment } from "react";
import { NavLink } from "react-router-dom";
import Icon from "../assets/ICON-PNG.png";
import { Menu, Transition } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const activeStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      backgroundColor: isActive ? "#9B9CA0" : "",
    };
  };
  return (
    <div className="w-full h-[100px] bg-[#2b2e35] flex flex-col justify-between">
      <div className="inline-flex items-center mx-10 my-2">
        <img src={Icon} alt="PremiumIcon" className="w-12 h-12" />
        <div className="font-bold text-xl text-red-600">PremiumTrust Bank</div>
      </div>
      <div
        className="bg-red-600 h-14 text-white text-xl px-10"
        id="navbar-dropdown"
      >
        <nav className="flex font-medium mt-0 space-x-8">
          <NavLink to="/dashboard" className="rounded p-2" style={activeStyle}>
            Home
          </NavLink>
          <NavLink
            to="/applications"
            className="rounded p-2"
            style={activeStyle}
          >
            Applications
          </NavLink>
          <div className="rounded p-2">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex items-center">
                  Groups
                  <FiChevronDown
                    className="-mr-1 ml-2 h-5 w-5"
                    aria-hidden="true"
                  />
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-20">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Audit
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      <NavLink
                        to="/bankingServicesHome"
                        className="text-gray-700 block px-4 py-2 text-sm"
                      >
                        Banking Services
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Brands & Strategy
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Central Operations
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Conduct & Compliance
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Corporate Services
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      <NavLink to="/customer-service">
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Customer Experience
                          </a>
                        )}
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Digital Banking
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      <NavLink to="/e-business">
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            E-Business
                          </a>
                        )}
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Enterprise Risk Management
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Finance Group
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      <NavLink to="/it">
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Information Technology
                          </a>
                        )}
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Information $ Cyber Security
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          International Trade Services
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Legal
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      <NavLink
                        to="/employee-connect"
                        className="text-gray-700 block px-4 py-2 text-sm"
                      >
                        People Management Group
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Project Management Group
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Treasury
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          {/* <NavLink to="/forms" className="rounded p-2" style={activeStyle}>
            Forms
          </NavLink> */}
          <NavLink
            to="/business-processes"
            className="rounded p-2"
            style={activeStyle}
          >
            Business Processes
          </NavLink>
          <NavLink to="/policies" className="rounded p-2" style={activeStyle}>
            Policies
          </NavLink>
          <NavLink to="/manager" className="rounded p-2" style={activeStyle}>
            Profile Manager
          </NavLink>
          {/* <NavLink to="/ll" className="rounded p-2" style={activeStyle}>
            Quick Links
          </NavLink> */}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
