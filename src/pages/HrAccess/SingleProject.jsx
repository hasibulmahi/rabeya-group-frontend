import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProject } from "../../redux/actions/hrAction";
import MetaData from "../../components/MetaData";
import { BiDotsVertical } from "react-icons/bi";
import MeteralGenerator from "./Extra/MeteralGenerator";

const SingleProject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.hrProject);
  console.log(project && project);

  const projectCreatedDate = new Date(project && project.createdAt);

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
  //To Local String
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //Costing Math
  let totalExpenses = 0;
  let labourExpenses = 0;
  let totalDeposit = 0;
  let totalWitdraw = 0;
  let payable;
  let todayDeposit = 0;

  if (project) {
    for (var i = 0; i < project.totalExpenses.length; i++) {
      totalExpenses = totalExpenses + project.totalExpenses[i].amount;
    }
    for (var i = 0; i < project.labourExpenses.length; i++) {
      labourExpenses = labourExpenses + project.labourExpenses[i].amount;
    }
    for (var j = 0; j < project.clientDeposit.length; j++) {
      totalDeposit = totalDeposit + project.clientDeposit[j].amount;
    }
    for (var j = 0; j < project.clientWithdraw.length; j++) {
      totalWitdraw = totalWitdraw + project.clientWithdraw[j].amount;
    }
    payable = project.payable - totalDeposit;
  }
  const date = new Date(Date.now()).getDate();
  const month = new Date(Date.now()).getMonth();
  const year = new Date(Date.now()).getFullYear();
  const match = date + month + year;
  let dataDeposit;
  if (project) {
    dataDeposit = project.clientDeposit.filter((val) => {
      const dat = new Date(val.createdAt).getDate();
      const mon = new Date(val.createdAt).getMonth();
      const yea = new Date(val.createdAt).getFullYear();
      const mat = dat + mon + yea;
      return match === mat;
    });
  }
  if (dataDeposit) {
    for (var i = 0; i < dataDeposit.length; i++) {
      todayDeposit = todayDeposit + dataDeposit[i].amount;
    }
  }

  //Get CountDown Time
  const [days, setDays] = useState("00");
  let interval = useRef();
  const startTimer = () => {
    if (project) {
      const countdownDate = new Date(project.deadline).getTime();
      interval = setInterval(() => {
        const now = new Date(Date.now()).getTime();
        const distance = countdownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        if (distance < 0) {
          clearInterval(interval);
        } else if (days > 9) {
          setDays(days);
        } else {
          setDays(`0${days}`);
        }
      }, 1000);
    }
  };

  //Time Converter
  function secondsToHHMMSS(totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    var seconds = totalSeconds - hours * 3600 - minutes * 60;

    // Padding the values to ensure they are two digits
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return hours + ":" + minutes + ":" + seconds;
  }
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

  //All Expenses Show State
  const [showMExpenses, setShowMExpenses] = useState(false);
  const [showLExpenses, setShowLExpenses] = useState(false);
  const [showDExpenses, setShowDExpenses] = useState(false);
  const [showCExpenses, setShowCExpenses] = useState(false);

  //Pagination
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
    if (project) {
      if (lastMVal < project.totalExpenses.length) {
        setFirstMVal(firstMVal + 10);
        setLastMVal(lastMVal + 10);
        setMVal(mVal + 1);
      }
    }
  };

  const [lVal, setLVal] = useState(1);
  const [firstLVal, setFirstLVal] = useState(0);
  const [lastLVal, setLastLVal] = useState(10);
  const lPrevious = () => {
    if (lVal > 1) {
      setFirstLVal(firstLVal - 10);
      setLastLVal(lastLVal - 10);
      setLVal(lVal - 1);
    }
  };
  const lNext = () => {
    if (project) {
      if (lastLVal < project.labourExpenses.length) {
        setFirstLVal(firstLVal + 10);
        setLastLVal(lastLVal + 10);
        setLVal(lVal + 1);
      }
    }
  };

  const [dVal, setDVal] = useState(1);
  const [firstDVal, setFirstDVal] = useState(0);
  const [lastDVal, setLastDVal] = useState(10);
  const dPrevious = () => {
    if (dVal > 1) {
      setFirstDVal(firstDVal - 10);
      setLastDVal(lastDVal - 10);
      setDVal(dVal - 1);
    }
  };
  const dNext = () => {
    if (project) {
      if (lastDVal < project.clientDeposit.length) {
        setFirstDVal(firstDVal + 10);
        setLastDVal(lastDVal + 10);
        setDVal(dVal + 1);
      }
    }
  };
  const [cVal, setCVal] = useState(1);
  const [firstCVal, setFirstCVal] = useState(0);
  const [lastCVal, setLastCVal] = useState(10);
  const cPrevious = () => {
    if (cVal > 1) {
      setFirstCVal(firstCVal - 10);
      setLastCVal(lastCVal - 10);
      setCVal(dVal - 1);
    }
  };
  const cNext = () => {
    if (project) {
      if (lastCVal < project.clientWithdraw.length) {
        setFirstDVal(firstCVal + 10);
        setLastCVal(lastCVal + 10);
        setCVal(dVal + 1);
      }
    }
  };

  useEffect(() => {
    startTimer();

    clearInterval(interval.current);
    dispatch(getSingleProject(id));
  }, []);
  return (
    <>
      <div className="px-3 sm:px-12 md:px-12 pt-14 md:py-20">
        <MetaData title={`${project && project.name}`} />
        <div className="flex flex-col lg:flex-row mt-8">
          <div className="w-full lg:w-9/12">
            <h1 className="font-poppins text-xl lg:text-3xl font-semibold">
              {project && project.name}
            </h1>
            <p className="font-poppins text-md lg:text-xl font-medium">
              Project Code:
              <span className="text-sm ml-1">{project && project.code}</span>
            </p>
            <p className="font-poppins text-md lg:text-md font-medium">
              Project Manager:
              <span className="text-md ml-1">
                {project && project.manager.name}
              </span>
            </p>
            <p className="font-poppins mt-5">
              {project && project.description}
            </p>
          </div>
          <div className="w-full md:w-3/12 flex justify-center md:justify-end ">
            <div className="bg-blue3 w-11/12 px-5 py-5 rounded-lg text-center leading-8 mt-6 lg:mt-0 max-h-44">
              <h3 className="font-poppins font-bold ">Projected Launch Date</h3>
              <p className="font-poppins font-medium text-sm">
                {projectCreatedDate.getDate()}
                {getMonth(projectCreatedDate.getMonth())},
                <span> {projectCreatedDate.getFullYear()}</span>
              </p>
              <p className="my-2">
                <span className="bg-blue2 p-2 rounded-md text-lg mx-1 font-poppins font-bold">
                  {days}
                </span>
                <span className=" font-bold text-lg">Days</span>
                <span> Remaining</span>
              </p>
              <p className="font-poppins font-medium text-sm">
                Overall Status:
                <span className="text-white ml-2">
                  {project && project.status}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-9/12">
          <div className="flex flex-col md:flex-row">
            <div className="w-full mt-5 md:mt-0 md:w-1/4 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
              <p className="font-rubik text-white">Meterial Expenses</p>
              <p className="mt-2 font-poppins text-2xl font-bold text-white">
                {totalExpenses && numberWithCommas(totalExpenses)}
              </p>
            </div>
            <div className="w-full mt-5 md:mt-0 md:w-1/4 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
              <p className="font-rubik text-white">Payable BDT</p>
              <p className="mt-2 font-poppins text-2xl font-bold text-white">
                {project && numberWithCommas(payable)}
              </p>
            </div>
            <div className="w-full mt-5 md:mt-0 md:w-1/4 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
              <p className="font-rubik text-white">Receivable BDT</p>
              <p className="mt-2 font-poppins text-2xl font-bold text-white">
                {project && numberWithCommas(totalDeposit)}
              </p>
            </div>
            <div className="w-full mt-5 md:mt-0 md:w-1/4 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
              <p className="font-rubik text-white">Todays Credit</p>
              <p className="mt-2 font-poppins text-2xl font-bold text-white">
                {project && numberWithCommas(todayDeposit)}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="w-full md:w-1/4 mt-5 md:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
              <p className="font-rubik text-white">Laobur Expenses</p>
              <p className="mt-2 font-poppins text-2xl font-bold text-white">
                {labourExpenses && numberWithCommas(labourExpenses)}
              </p>
            </div>
            <div className="w-full md:w-1/4 mt-5 md:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
              <p className="font-rubik text-white">Total Debit</p>
              <p className="mt-2 font-poppins text-2xl font-bold text-white">
                {totalWitdraw && numberWithCommas(totalWitdraw)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full  mt-7">
          <div className="w-full pb-8   bg-slate-500 relative">
            <div className="bg-slate-600 w-full py-1 flex items-center">
              <h4 className=" ml-5 font-bold text-white text-xl w-full">
                Meterial Expenses
              </h4>
              <button
                className=" cursor-pointer w-36 mr-5 rounded-lg hover:bg-blue-500 bg-blue-400 text-white"
                onClick={() => setShowMExpenses(true)}
              >
                Show Details
              </button>
            </div>
            <table className=" w-full   h-full    text-white">
              <tr className="text-xs md:text-sm">
                <th className="border-2 border-black bg-blue3">Serial No</th>
                <th className="border-2 border-black bg-blue3 w-6/12">
                  Description
                </th>
                <th className="border-2 border-black bg-blue3">UOM</th>
                <th className="border-2 border-black bg-blue3">Quantity</th>
                <th className="border-2 border-black bg-blue3">Unit Price</th>
                <th className="border-2 border-black bg-blue3">Amount</th>
                <th className="border-2 border-black bg-blue3">Time</th>
              </tr>
              {project &&
                project.totalExpenses
                  .slice(firstMVal, lastMVal)
                  .map((val, ind) => {
                    return (
                      <tr key={ind} className="text-center text-xs md:text-sm">
                        <td className="border-2 border-black">{ind + 1}</td>
                        <td className="border-2 border-black">{val.title}</td>
                        <td className="border-2 border-black">{val.uom}</td>
                        <td className="border-2 border-black">{val.qty}</td>
                        <td className="border-2 border-black">
                          {val.unitPrice}
                        </td>
                        <td className="border-2 border-black">
                          {numberWithCommas(val.amount)}
                        </td>
                        <td className="border-2 border-black">
                          {dateConverter(val.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
            </table>
            <div className="flex justify-center py-1  bg-blue-400 absolute bottom-0 w-full">
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
          <div className="w-full mt-5   bg-slate-500 relative md:ml-1">
            <div className="bg-slate-600 py-1 flex items-center">
              <h4 className="  text-center font-bold text-white text-xl w-full">
                Labour Expenses
              </h4>
              <p
                className="text-2xl cursor-pointer text-white"
                onClick={() => setShowLExpenses(!showLExpenses)}
              >
                <BiDotsVertical />
              </p>
            </div>
            <table className=" w-full   text-white  mb-8">
              <tr>
                <th className="border-2 border-black bg-blue3">Description</th>
                <th className="border-2 border-black bg-blue3">Amount</th>
                <th className="border-2 border-black bg-blue3">Time</th>
              </tr>
              {project &&
                project.labourExpenses
                  .slice(firstLVal, lastLVal)
                  .map((val, ind) => {
                    return (
                      <tr key={ind} className="text-center">
                        <td className="border-2 border-black">{val.title}</td>
                        <td className="border-2 border-black">
                          {numberWithCommas(val.amount)}
                        </td>
                        <td className="border-2 border-black">
                          {dateConverter(val.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
            </table>
            <div className="flex justify-center py-1 bg-blue-400 absolute  w-full">
              <p
                className="w-24 bg-white text-center rounded-sm cursor-pointer"
                onClick={lPrevious}
              >
                Previous
              </p>
              <p className="bg-white mx-2 px-2">{lVal}</p>
              <p
                className="w-24 bg-white text-center rounded-sm cursor-pointer"
                onClick={lNext}
              >
                Next
              </p>
            </div>
            {showLExpenses && (
              <div className="absolute right-0 top-9   bg-blue-50 z-50">
                <p className="cursor-pointer border-2 border-blue-300  px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  1 Day
                </p>
                <p className="cursor-pointer border-2 border-blue-300 mt-1 px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  7 Day
                </p>
                <p className="cursor-pointer border-2 border-blue-300 mt-1 px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  1 Month
                </p>
                <p className="cursor-pointer border-2 border-blue-300 mt-1 px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  4 Month
                </p>
              </div>
            )}
          </div>
        </div>
        <></>
        <div className="flex flex-col md:flex-row mt-9">
          <div className="w-full md:w-6/12 bg-slate-500 relative">
            <div className="bg-slate-600 py-1 flex items-center">
              <h4 className="  text-center font-bold text-white text-xl w-full">
                Client Credit
              </h4>
              <p
                className="text-2xl cursor-pointer text-white"
                onClick={() => setShowDExpenses(!showDExpenses)}
              >
                <BiDotsVertical />
              </p>
            </div>
            <table className=" w-full   text-white mb-8">
              <tr>
                <th className="border-2 border-black bg-blue3">Description</th>
                <th className="border-2 border-black bg-blue3">Amount</th>
                <th className="border-2 border-black bg-blue3">Time</th>
              </tr>
              {project &&
                project.clientDeposit
                  .slice(firstDVal, lastDVal)
                  .map((val, ind) => {
                    return (
                      <tr key={ind} className="text-center">
                        <td className="border-2 border-black">{val.title}</td>
                        <td className="border-2 border-black">
                          {numberWithCommas(val.amount)}
                        </td>
                        <td className="border-2 border-black">
                          {dateConverter(val.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
            </table>
            <div className="flex justify-center py-1 bg-blue-400 absolute bottom-0 w-full">
              <p
                className="w-24 bg-white text-center rounded-sm cursor-pointer"
                onClick={dPrevious}
              >
                Previous
              </p>
              <p className="bg-white mx-2 px-2">{dVal}</p>
              <p
                className="w-24 bg-white text-center rounded-sm cursor-pointer"
                onClick={dNext}
              >
                Next
              </p>
            </div>
            {showDExpenses && (
              <div className="absolute right-0 top-9   bg-blue-50 z-50">
                <p className="cursor-pointer border-2 border-blue-300  px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  1 Day
                </p>
                <p className="cursor-pointer border-2 border-blue-300 mt-1 px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  7 Day
                </p>
                <p className="cursor-pointer border-2 border-blue-300 mt-1 px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  1 Month
                </p>
                <p className="cursor-pointer border-2 border-blue-300 mt-1 px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  4 Month
                </p>
              </div>
            )}
          </div>
          <div className="w-full md:w-6/12 bg-slate-500 relative md:ml-1 mt-5 md:mt-0">
            <div className="bg-slate-600 py-1 flex items-center">
              <h4 className="  text-center font-bold text-white text-xl w-full">
                Client Debit
              </h4>
              <p
                className="text-2xl cursor-pointer text-white"
                onClick={() => setShowCExpenses(!showCExpenses)}
              >
                <BiDotsVertical />
              </p>
            </div>
            <table className=" w-full   text-white mb-8">
              <tr>
                <th className="border-2 border-black bg-blue3">Description</th>
                <th className="border-2 border-black bg-blue3">Amount</th>
                <th className="border-2 border-black bg-blue3">Time</th>
              </tr>
              {project &&
                project.clientWithdraw
                  .slice(firstCVal, lastCVal)
                  .map((val, ind) => {
                    return (
                      <tr key={ind} className="text-center">
                        <td className="border-2 border-black">{val.title}</td>
                        <td className="border-2 border-black">
                          {numberWithCommas(val.amount)}
                        </td>
                        <td className="border-2 border-black">
                          {dateConverter(val.createdAt)}
                        </td>
                      </tr>
                    );
                  })}
            </table>
            <div className="flex justify-center py-1 bg-blue-400 absolute bottom-0 w-full">
              <p
                className="w-24 bg-white text-center rounded-sm cursor-pointer"
                onClick={cPrevious}
              >
                Previous
              </p>
              <p className="bg-white mx-2 px-2">{cVal}</p>
              <p
                className="w-24 bg-white text-center rounded-sm cursor-pointer"
                onClick={cNext}
              >
                Next
              </p>
            </div>
            {showCExpenses && (
              <div className="absolute right-0 top-9   bg-blue-50 z-50">
                <p className="cursor-pointer border-2 border-blue-300  px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  1 Day
                </p>
                <p className="cursor-pointer border-2 border-blue-300 mt-1 px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  7 Day
                </p>
                <p className="cursor-pointer border-2 border-blue-300 mt-1 px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  1 Month
                </p>
                <p className="cursor-pointer border-2 border-blue-300 mt-1 px-9 py-1 hover:bg-blue1 hover:text-white font-bold">
                  4 Month
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showMExpenses && (
        <div className="fixed flex justify-center items-center top-0 left-0 h-screen w-full bg-box1">
          <MeteralGenerator
            id={project._id}
            setShowMExpenses={setShowMExpenses}
          />
        </div>
      )}
    </>
  );
};

export default SingleProject;
