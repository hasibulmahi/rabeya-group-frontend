import React from "react";
import { Link } from "react-router-dom";

const HrSidebar = ({ showSidebar }) => {
  return (
    <>
      {showSidebar && (
        <div className="h-screen bg-box1 w-6/12 sm:w-4/12 lg:w-1/6 fixed z-20 py-20 list-none px-3">
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/">
              Home
            </Link>
          </li>
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/create/employee">
              Add Employee
            </Link>
          </li>
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/all/employee">
              All Employee
            </Link>
          </li>
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/create/client">
              Add Client
            </Link>
          </li>
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/all/client">
              All Client
            </Link>
          </li>

          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/create/project">
              Add Project
            </Link>
          </li>
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/all/project">
              All Project
            </Link>
          </li>
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/salary/distribution">
              Salary Distribution
            </Link>
          </li>
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/notification">
              Notification
            </Link>
          </li>
        </div>
      )}
    </>
  );
};

export default HrSidebar;
