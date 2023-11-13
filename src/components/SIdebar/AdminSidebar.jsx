import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ showSidebar }) => {
  return (
    <>
      {showSidebar && (
        <div className="h-screen bg-box1 w-6/12 sm:w-4/12 lg:w-1/6 fixed z-20 py-20 list-none px-3">
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/">
              Dashboard
            </Link>
          </li>
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/create/deposit">
              Deposit
            </Link>
          </li>
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/create/withdraw">
              Withdraw
            </Link>
          </li>
          <li className=" hover:bg-blue-300 cursor-pointer pl-2 rounded-lg text-white hover:text-black hover:font-bold">
            <Link className="block py-3" to="/payment/history">
              Payment History
            </Link>
          </li>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
