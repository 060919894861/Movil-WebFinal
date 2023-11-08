import React from "react";
import { Link } from "react-router-dom";
import twitterLogo from "../images/twitter.svg.png";
import { useRef } from "react";
import {
  RiHome5Line,
  RiSearchLine,
  RiNotification2Line,
  RiMessage3Line,
  RiFileList3Line,
  RiPassValidLine,
} from "react-icons/ri";
import { Register } from "./Register";

const Sidebar = () => {
  const contentTextareaRef = useRef();
  return (
    <div className="mt-1 mb-4 ml-1 flex flex-col justify-between w-72 px-2">
      <div>
        <div className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-lightest transform transition-colors duration-200">
          <img src={twitterLogo} alt="Twitter Logo" className="w-9 h-9" />
        </div>
        <nav className="mb-4">
          <div className="w-72">
            <Link
              to="/"
              className="flex items-center text-blue-500 hover:text-blue-700 mb-10"
            >
              <RiHome5Line className="w-7 h-7" />
              <span className="ml-2">Home</span>
            </Link>
            <Link
              to="/widgets"
              className="flex items-center text-blue-500 hover:text-blue-700 mb-10"
            >
              <RiSearchLine className="w-7 h-7" />
              <span className="ml-2">Search</span>
            </Link>
            <Link
              to="/notifications"
              className="flex items-center text-blue-500 hover:text-blue-700 mb-10"
            >
              <RiNotification2Line className="w-7 h-7" />
              <span className="ml-2">Notifications</span>
            </Link>
            <Link
              to="/messages"
              className="flex items-center text-blue-500 hover:text-blue-700 mb-10"
            >
              <RiMessage3Line className="w-7 h-7" />
              <span className="ml-2">Messages</span>
            </Link>
            <Link
              to="/lists"
              className="flex items-center text-blue-500 hover:text-blue-700 mb-10"
            >
              <RiFileList3Line className="w-7 h-7" />
              <span className="ml-2">Lists</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center text-blue-500 hover-text-blue-700 mb-10"
            >
              <RiPassValidLine className="w-7 h-7" />
              <span className="ml-2">Profile</span>
            </Link>
            <Link
              to="/register"
              className="flex items-center text-blue-500 hover-text-blue-700 mb-10"
            >
              <RiPassValidLine className="w-7 h-7" />
              <span className="ml-2">Register</span>
            </Link>
          </div>
        </nav>
        <button
          onClick={() => {
            contentTextareaRef.current.focus();
          }}
          className="bg-primary-base hover:bg-primary-dark text-white shadow-lg rounded-full py-3 px-8 w-11/12 transform transition-colors duration-200"
        >
          Tweet
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
