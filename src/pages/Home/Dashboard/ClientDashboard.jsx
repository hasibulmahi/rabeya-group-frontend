import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../components/MetaData";
import { AiOutlineSend } from "react-icons/ai";
import ProjectTask from "../../../assets/ProjectTask.png";
import NotProjectLine from "../../../assets/NotProjectLine.png";
import Todo from "../../../assets/todo.png";
import CompleteTodo from "../../../assets/todo-complete.png";
import { RxCross1 } from "react-icons/rx";
import {
  clearError,
  clearSuccess,
  createDeposit,
  createExpenses,
  deleteDeposit,
  deleteExpenses,
  getClientProject,
} from "../../../redux/actions/projectAction";
import Loader from "../../../components/Loading";
import { toast } from "react-toastify";
import FullLoading from "../../../components/FullLoading";
import BarChart from "../../../components/BarChart";
import { createClientNotification } from "../../../redux/actions/clientAction";

const ClientDashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { project, ploading, success, error } = useSelector(
    (state) => state.project
  );
  const firstName = user.name.split(" ");

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
  console.log(project);

  //To Local String
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //Todo List
  const [showTodoList, setShowTodoList] = useState(false);
  const getAllList = () => {
    let item = localStorage.getItem("items");
    if (item) {
      return JSON.parse(localStorage.getItem("items"));
    } else {
      return [];
    }
  };
  const [todo, setTodo] = useState(getAllList());

  // Project Line Div Setting

  let completeProjectLine = todo.filter((val) => val.status === "Complete");

  const percentigeProjectLine =
    (completeProjectLine.length / todo.length) * 100;

  //Costing Math
  let totalExpenses = 0;
  let totalDeposit = 0;
  let totalWithdraw = 0;
  let payable;
  let todayDeposit = 0;

  if (project) {
    for (var i = 0; i < project.totalExpenses.length; i++) {
      totalExpenses = totalExpenses + project.totalExpenses[i].amount;
    }
    for (var j = 0; j < project.clientDeposit.length; j++) {
      totalDeposit = totalDeposit + project.clientDeposit[j].amount;
    }
    payable = project.payable - totalDeposit;
    for (var k = 0; k < project.clientWithdraw.length; k++) {
      totalWithdraw = totalWithdraw + project.clientWithdraw[k].amount;
    }
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

  //Client All Cost Analysis

  const [data, setData] = useState({
    labels:
      project &&
      project.clientDeposit.map((val) => {
        const date = new Date(val.createdAt).getDate();
        const month = new Date(val.createdAt).getMonth();
        const year = new Date(val.createdAt).getFullYear();
        const combined = `${date}/${month + 1}/${year}`;

        return combined;
      }),
    datasets: [
      {
        label: "Cost Analysis",
        data:
          project &&
          project.clientDeposit.map((val) => {
            return val.amount;
          }),
        backgroundColor: ["#191D88"],
      },
    ],
  });
  // console.log(project.clientDeposit);

  //Client Notification
  const { cnsuccess, cnerror, cnloading } = useSelector(
    (state) => state.clientNotification
  );
  const [message, setMessage] = useState();
  const handleNotification = () => {
    let data = {
      clientId: user._id,
      projectId: project._id,
      message: message,
    };
    dispatch(createClientNotification(data));
  };

  useEffect(() => {
    startTimer();

    clearInterval(interval.current);
    localStorage.setItem("items", JSON.stringify(todo));

    if (project) {
      setData({
        labels:
          project &&
          project.clientDeposit.map((val) => {
            const date = new Date(val.createdAt).getDate();
            const month = new Date(val.createdAt).getMonth();
            const year = new Date(val.createdAt).getFullYear();
            const combined = `${date}/${month + 1}/${year}`;

            return combined;
          }),
        datasets: [
          {
            label: "Cost Analysis",
            data:
              project &&
              project.clientDeposit.map((val) => {
                return val.amount;
              }),
            backgroundColor: ["#191D88"],
          },
        ],
      });
    }
    //Expenses
    if (success) {
      toast(success);
    }
    dispatch(clearSuccess());
    if (error) {
      toast(error);
      dispatch(clearError());
    }

    //Notification
    if (cnsuccess) {
      toast(cnsuccess);
    }
    dispatch(clearSuccess());
    if (cnerror) {
      toast(cnerror);
      dispatch(clearError());
    }
  }, [todo, error, success, project, cnsuccess, cnerror]);

  useEffect(() => {
    dispatch(getClientProject(user.authToken));
  }, []);

  return (
    <>
      <MetaData title={"Client Dashboard"} />
      {/* <div className="relative">{ploading && <FullLoading />}</div> */}
      <div className="px-3 sm:px-12 md:px-12 pt-14 md:py-20">
        {/* ============== Welcome Section ==================*/}

        <div className="flex flex-col md:flex-row md:items-center">
          <h1
            style={{ textShadow: "1px 1px 2px #000" }}
            className="font-poppins  font-semibold text-blue2 text-2xl md:text-4xl lg:text-5xl mt-5 "
          >
            Welcome
            {user.name ? (
              <span className="ml-2 ">{firstName[0]}</span>
            ) : (
              <span className="ml-2">Pantha</span>
            )}
          </h1>
          <sub className="my-1  md:my-0 md:mx-5 font-light font-poppins">
            Have a good Day!
          </sub>
        </div>
        {/* ============== Project Section (Description) ==================*/}
        <div className="flex flex-col lg:flex-row mt-8">
          <div className="w-full lg:w-9/12">
            <h1 className="font-poppins text-xl lg:text-3xl font-semibold">
              {project && project.name}
            </h1>
            <p className="font-poppins text-md lg:text-xl font-medium">
              Project Code:
              <span className="text-sm ml-1">{project && project.code}</span>
            </p>
            <p className="font-poppins mt-5">
              {project && project.description}
            </p>
          </div>
          <div className="w-full lg:w-3/12 flex justify-center">
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
        {/* ============== Project Section (Balance Shit) ==================*/}
        <div className="flex flex-col md:flex-row mt-10">
          <div className="w-full md:w-9/12">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
                <p className="font-rubik text-white">Total Debit</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-white">
                  {totalWithdraw && numberWithCommas(totalWithdraw)}
                </p>
              </div>
              <div className="w-full md:w-1/4 mt-5 md:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
                <p className="font-rubik text-white">Payable BDT</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-white">
                  {project && numberWithCommas(payable)}
                </p>
              </div>
              <div className="w-full md:w-1/4 mt-5 md:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
                <p className="font-rubik text-white">Receivable BDT</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-white">
                  {project && numberWithCommas(totalDeposit)}
                </p>
              </div>
              <div className="w-full md:w-1/4 mt-5 md:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
                <p className="font-rubik text-white">Todays Credit</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-white">
                  {project && numberWithCommas(todayDeposit)}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ============== Project Section (Client All Deposit) ==================*/}
        <div className="mt-16 flex flex-col md:flex-row ">
          <div className="w-full md:w-8/12">
            <BarChart chartData={data} />
          </div>
          <div className="w-full md:w-4/12 mt-5 md:mt-0 flex justify-center items-start">
            <div className="bg-blue3 px-5 py-7 w-10/12 rounded-lg leading-8">
              <h4 className="text-white font-poppins font-medium mb-3">
                Payment Ledger Summary
              </h4>
              <div className="flex justify-between text-white font-poppins">
                <p>Total Payable</p>
                <p className=" text-gray-200">{project && project.payable}</p>
              </div>
              <div className="flex justify-between text-white font-poppins">
                <p>Total Paid</p>
                <p className=" text-gray-200">{totalDeposit}</p>
              </div>
              <div className="flex justify-between text-white font-poppins">
                <p>Total Due</p>

                <p className=" text-gray-200">{payable}</p>
              </div>
            </div>
          </div>
        </div>
        {/* ============== Project Section (Client Notification) ==================*/}
        <div className="mt-16  ">
          <div className="w-full md:w-6/12 bg-blue3 p-5 rounded-lg ">
            <h4 className="text-white text-xl font-poppins font-medium mb-3">
              Project Message
            </h4>
            <div>
              <textarea
                className="w-full h-44 rounded-lg px-2"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button
                className=" bg-blue-900 px-5 py-1 mt-3 rounded-lg text-white btn cursor-pointer"
                onClick={handleNotification}
              >
                {cnloading ? (
                  <Loader />
                ) : (
                  <label className="flex items-center">
                    <p className="text-lg font-medium cursor-pointer">Send</p>
                    <p className="ml-1 btn-target cursor-pointer">
                      <AiOutlineSend />
                    </p>
                  </label>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;
