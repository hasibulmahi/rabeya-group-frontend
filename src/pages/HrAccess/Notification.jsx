import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminNotification,
  getClientNotification,
  getManagerNotification,
} from "../../redux/actions/hrAction";
import { BiDotsVertical } from "react-icons/bi";

const Notification = () => {
  const dispatch = useDispatch();
  const { adminNotification, managerNotification, clientNotification } =
    useSelector((state) => state.notification);
  console.log(adminNotification, managerNotification, clientNotification);

  //Get Month
  const getMonth = (date) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augest",
      "September",
      "October",
      "November",
      "December",
    ];
    return <span> {month[date]}</span>;
  };
  //Date Converter
  function dateConverter(x) {
    let createdAt = new Date(x);
    let time = createdAt.getDate();
    let month = getMonth(createdAt.getMonth());
    let year = createdAt.getFullYear();
    let hour = createdAt.getTime();
    return (
      <span>
        {time} -{month} - {year}
      </span>
    );
  }

  //Pagination
  const [aVal, setAVal] = useState(1);
  const [firstAVal, setFirstAVal] = useState(0);
  const [lastAVal, setLastAVal] = useState(10);
  const aPrevious = () => {
    if (aVal > 1) {
      setFirstAVal(firstAVal - 10);
      setLastAVal(lastAVal - 10);
      setAVal(aVal - 1);
    }
  };
  const aNext = () => {
    if (adminNotification) {
      if (lastAVal < adminNotification.length) {
        setFirstAVal(firstAVal + 10);
        setLastAVal(lastAVal + 10);
        setAVal(mVal + 1);
      }
    }
  };

  const [mVal, setMVal] = useState(1);
  const [firstMVal, setFirstMVal] = useState(0);
  const [lastMVal, setLastMVal] = useState(10);
  const mPrevious = () => {
    if (mVal > 1) {
      setFirstMVal(firstMVal - 10);
      setLastMVal(lastMVal - 10);
      setMVal(mVal - 1);
    }
  };
  const mNext = () => {
    if (managerNotification) {
      if (lastMVal < managerNotification.length) {
        setFirstMVal(firstMVal + 10);
        setLastMVal(lastMVal + 10);
        setMVal(mVal + 1);
      }
    }
  };

  const [nVal, setNVal] = useState(1);
  const [firstNVal, setFirstNVal] = useState(0);
  const [lastNVal, setLastNVal] = useState(10);
  const nPrevious = () => {
    if (nVal > 1) {
      setFirstMVal(firstNVal - 10);
      setLastMVal(lastNVal - 10);
      setNVal(nVal - 1);
    }
  };
  const nNext = () => {
    if (clientNotification) {
      if (lastMVal < clientNotification.length) {
        setFirstNVal(firstNVal + 10);
        setLastNVal(lastNVal + 10);
        setNVal(nVal + 1);
      }
    }
  };
  useEffect(() => {
    dispatch(getAdminNotification());
    dispatch(getManagerNotification());
    dispatch(getClientNotification());
  }, []);
  return (
    <div className="px-3 sm:px-12 md:px-12 py-20 ">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-6/12 bg-blue-50 relative min-h-40">
          <div className="bg-slate-600 py-1 flex items-center">
            <h4 className="  text-center font-bold text-white text-xl w-full">
              Admin Notification
            </h4>
          </div>
          <table className="w-full mb-9">
            <tr>
              <th className="border-2  border-blue-400 text-center">Name</th>

              <th className="border-2  border-blue-400 text-center">Message</th>
              <th className="border-2  border-blue-400 text-center">Amount</th>
              <th className="border-2  border-blue-400 text-center">Date</th>
            </tr>
            {adminNotification &&
              adminNotification.slice(firstAVal, lastAVal).map((val, ind) => {
                return (
                  <tr key={ind}>
                    <td className="border-2  border-blue-400 text-center">
                      {val.sender.name}
                    </td>

                    <td className="border-2  border-blue-400 text-center">
                      {val.message}
                    </td>
                    <td className="border-2  border-blue-400 text-center">
                      {val.amount}
                    </td>
                    <td className="border-2  border-blue-400 text-center">
                      {dateConverter(val.createdAt)}
                    </td>
                  </tr>
                );
              })}
          </table>
          <div className="flex justify-center py-1 bg-blue-400 absolute  bottom-0 w-full">
            <p
              className="w-24 bg-white text-center rounded-sm cursor-pointer"
              onClick={aPrevious}
            >
              Previous
            </p>
            <p className="bg-white mx-2 px-2">{aVal}</p>
            <p
              className="w-24 bg-white text-center rounded-sm cursor-pointer"
              onClick={aNext}
            >
              Next
            </p>
          </div>
        </div>
        <div className="w-full md:w-6/12 bg-blue-50 relative min-h-40 md:ml-2 mt-5 md:mt-0">
          <div className="bg-slate-600 py-1 flex items-center">
            <h4 className="  text-center font-bold text-white text-xl w-full">
              Manager Notification
            </h4>
          </div>
          <table className="w-full mb-9">
            <tr>
              <th className="border-2  border-blue-400 text-center">Name</th>
              <th className="border-2  border-blue-400 text-center">Code</th>
              <th className="border-2  border-blue-400 text-center">Message</th>
              <th className="border-2  border-blue-400 text-center">Amount</th>
              <th className="border-2  border-blue-400 text-center">Date</th>
            </tr>
            {managerNotification &&
              managerNotification.slice(firstMVal, lastMVal).map((val, ind) => {
                return (
                  <tr key={ind}>
                    <td className="border-2  border-blue-400 text-center">
                      {val.sender.name}
                    </td>
                    <td className="border-2  border-blue-400 text-center">
                      {val.sender.activeProject.code}
                    </td>
                    <td className="border-2  border-blue-400 text-center">
                      {val.message}
                    </td>
                    <td className="border-2  border-blue-400 text-center">
                      {val.amount}
                    </td>
                    <td className="border-2  border-blue-400 text-center">
                      {dateConverter(val.createdAt)}
                    </td>
                  </tr>
                );
              })}
          </table>
          <div className="flex justify-center py-1 bg-blue-400 absolute  bottom-0 w-full">
            <p
              className="w-24 bg-white text-center rounded-sm cursor-pointer"
              onClick={mPrevious}
            >
              Previous
            </p>
            <p className="bg-white mx-2 px-2">{mVal}</p>
            <p
              className="w-24 bg-white text-center rounded-sm cursor-pointer"
              onClick={mNext}
            >
              Next
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-blue-50 relative h-36  mt-5">
        <div className="bg-slate-600 py-1 flex items-center">
          <h4 className="  text-center font-bold text-white text-xl w-full">
            Client Notification
          </h4>
        </div>
        <table className="w-full   mb-9 ">
          <tr>
            <th className="border-2  border-blue-400 text-center">Name</th>
            <th className="border-2  border-blue-400 text-center">
              Manager Name
            </th>
            <th className="border-2  border-blue-400 text-center">Message</th>
            <th className="border-2  border-blue-400 text-center">
              Project ID
            </th>
            <th className="border-2  border-blue-400 text-center">Date</th>
          </tr>
          {clientNotification &&
            clientNotification.slice(firstNVal, lastNVal).map((val, ind) => {
              return (
                <tr key={ind}>
                  <td className="border-2  border-blue-400 text-center">
                    {val.sender.name}
                  </td>
                  <td className="border-2  border-blue-400 text-center">
                    {val.project.manager.name}
                  </td>
                  <td className="border-2  border-blue-400 text-center">
                    {val.message}
                  </td>
                  <td className="border-2  border-blue-400 text-center">
                    {val.project.code}
                  </td>
                  <td className="border-2  border-blue-400 text-center">
                    {dateConverter(val.createdAt)}
                  </td>
                </tr>
              );
            })}
        </table>
        <div className="flex justify-center py-1  mt-2  bg-blue-400 absolute  bottom-0 w-full">
          <p
            className="w-24 bg-white text-center rounded-sm cursor-pointer"
            onClick={nPrevious}
          >
            Previous
          </p>
          <p className="bg-white mx-2 px-2">{nVal}</p>
          <p
            className="w-24 bg-white text-center rounded-sm cursor-pointer"
            onClick={nNext}
          >
            Next
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
