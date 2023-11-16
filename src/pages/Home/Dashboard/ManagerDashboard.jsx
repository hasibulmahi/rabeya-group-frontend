import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../../../components/MetaData";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import ProjectTask from "../../../assets/ProjectTask.png";
import NotProjectLine from "../../../assets/NotProjectLine.png";
import Todo from "../../../assets/todo.png";
import CompleteTodo from "../../../assets/todo-complete.png";
import { RxCross1 } from "react-icons/rx";
import BarChart from "../../../components/BarChart";
import {
  clearError,
  clearSuccess,
  createDeposit,
  createExpenses,
  createLabourExpenses,
  createWithdraw,
  deleteDeposit,
  deleteExpenses,
  deleteLabourExpenses,
  deleteWithdraw,
  getManagerProject,
} from "../../../redux/actions/projectAction";
import Loader from "../../../components/Loading";
import { toast } from "react-toastify";
import FullLoading from "../../../components/FullLoading";

const ManagerDashboard = () => {
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
  const [inputData, setInputData] = useState("");

  const addTodo = () => {
    setTodo([
      ...todo,
      {
        todos: inputData,
        status: "Ongoing",
      },
    ]);
  };
  const removeTodo = (index) => {
    const updateTodo = todo.filter((val, ind) => index !== ind);
    setTodo(updateTodo);
  };

  const updateTodo = (index) => {
    const updateTodo = todo.map((val, ind) => {
      if (ind === index) {
        val.status = "Complete";
      }
      return val;
    });
    setTodo(updateTodo);
  };

  // Project Line Div Setting

  let completeProjectLine = todo.filter((val) => val.status === "Complete");

  const percentigeProjectLine =
    (completeProjectLine.length / todo.length) * 100;

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

  //Cost Analysis
  const plannedCost = project && project.plannedCost;
  const contractAmount = project && project.payable;
  const [data, setData] = useState({
    labels: ["Actual Cost", "Planned Cost", "Contract Amount"],
    datasets: [
      {
        label: "Cost Analysis",
        data: [totalExpenses, plannedCost, contractAmount],
        backgroundColor: ["#191D88"],
      },
    ],
  });

  //Show Add Expenses
  const [addExpenses, setAddExpenses] = useState(false);
  const [title, setTitle] = useState();
  const [uom, setUom] = useState();
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState(0.0);
  const [remarks, setRemarks] = useState();
  const [amount, setAmount] = useState(0);

  const addExpensesFunc = () => {
    const data = {
      projectId: project._id,
      title: title,
      uom: uom,
      qty: qty,
      unit: parseFloat(unit),
      amount: parseFloat(amount),
      remarks: remarks,
    };
    dispatch(createExpenses(data));
  };
  const deleteExpensesFunc = (id) => {
    dispatch(deleteExpenses(id));
  };
  console.log(parseFloat(unit));
  //Show Add LabourExpenses
  const [addLabourExpenses, setAddLabourExpenses] = useState(false);
  const [ltitle, setLTitle] = useState();
  const [lamount, setLAmount] = useState();
  const addLabourExpensesFunc = () => {
    const data = {
      projectId: project._id,
      title: ltitle,
      amount: lamount,
    };
    dispatch(createLabourExpenses(data));
  };
  const deleteLabourExpensesFunc = (id) => {
    dispatch(deleteLabourExpenses(id));
  };
  //Show Add Deposit
  const [addDeposit, setAddDeposit] = useState(false);
  const [dtitle, setDtitle] = useState();
  const [damount, setDamount] = useState();
  const addDepositFunc = () => {
    const data = {
      projectId: project._id,
      title: dtitle,
      amount: damount,
    };
    dispatch(createDeposit(data));
  };
  const deleteDepositFunc = (id) => {
    dispatch(deleteDeposit(id, user.authToken));
  };

  //Show Add Withdraw
  const [addWithdraw, setAddWithdraw] = useState(false);
  const [wtitle, setWtitle] = useState();
  const [wamount, setWamount] = useState();
  const addWithdrawFunc = () => {
    const data = {
      projectId: project._id,
      title: wtitle,
      amount: wamount,
    };
    dispatch(createWithdraw(data));
  };
  const deleteWithdrawFunc = (id) => {
    dispatch(deleteWithdraw(id));
  };

  useEffect(() => {
    startTimer();

    clearInterval(interval.current);
    localStorage.setItem("items", JSON.stringify(todo));
    setData({
      labels: ["Actual Cost", "Planned Cost", "Contract Amount"],
      datasets: [
        {
          label: "Cost Analysis",
          data: [totalExpenses + labourExpenses, plannedCost, contractAmount],
          backgroundColor: ["#191D88"],
        },
      ],
    });
    dispatch(getManagerProject(user.authToken));

    //Expenses
    if (success) {
      toast(success);
    }
    dispatch(clearSuccess());
    if (error) {
      toast(error);
      dispatch(clearError());
    }
  }, [todo, totalExpenses, plannedCost, contractAmount, error, success]);

  return (
    <>
      <MetaData title={"Manager Dashboard"} />
      <div className="relative">{ploading && <FullLoading />}</div>
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
          <div className="w-full lg:w-9/12">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 mt-2 lg:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
                <p className="font-rubik text-white">Meterial Expenses</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-white">
                  {totalExpenses && numberWithCommas(totalExpenses)}
                </p>
              </div>
              <div className="w-full md:w-1/4 mt-2 lg:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
                <p className="font-rubik text-white">Payable BDT</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-white">
                  {project && numberWithCommas(payable)}
                </p>
              </div>
              <div className="w-full md:w-1/4 mt-2 lg:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
                <p className="font-rubik text-white">Receivable BDT</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-white">
                  {project && numberWithCommas(totalDeposit)}
                </p>
              </div>
              <div className="w-full md:w-1/4 mt-2 lg:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
                <p className="font-rubik text-white">Todays Credit</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-white">
                  {project && numberWithCommas(todayDeposit)}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row mt-4">
              <div className="w-full md:w-1/4 mt-2 lg:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
                <p className="font-rubik text-white">Laobur Expenses</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-white">
                  {labourExpenses && numberWithCommas(labourExpenses)}
                </p>
              </div>
              <div className="w-full md:w-1/4 mt-2 lg:mt-0 bg-blue-900 mr-5 rounded-lg h-24 text-center py-2">
                <p className="font-rubik text-white">Total Debit</p>
                <p className="mt-2 font-poppins text-2xl font-bold text-white">
                  {totalWitdraw && numberWithCommas(totalWitdraw)}
                </p>
              </div>
            </div>
            <div className="relative mt-5 ">
              <h4 className="mb-5 font-medium">Project line</h4>
              <p className="absolute top-5 right-0 cursor-pointer text-xl">
                <AiOutlinePlusCircle />
              </p>
              <div className="bg-gray-500 h-4 flex flex-wrap">
                <div
                  className="h-4 bg-blue-700 "
                  style={{ width: `${percentigeProjectLine}%` }}
                ></div>
              </div>
              <div className="flex w-full overflow-x-auto">
                {todo.map((val, ind) => {
                  return (
                    <div key={ind} className="mr-2 mt-3">
                      <div>
                        {val.status === "Ongoing" ? (
                          <img src={NotProjectLine} />
                        ) : (
                          <img src={ProjectTask} />
                        )}
                        {val.status === "Ongoing" ? (
                          <p>Task {ind + 1}</p>
                        ) : (
                          <p className=" text-green-700">Task {ind + 1}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/12 mt-5 lg:mt-0 flex justify-center">
            <div className="w-11/12 bg-blue3  rounded-lg px-3 py-1 min-h-42">
              <div className="flex items-center justify-center">
                <p className="text-white font-medium">Project Todo List</p>
                <p className="ml-2 text-white cursor-pointer">
                  <AiOutlinePlusCircle onClick={() => setShowTodoList(true)} />
                </p>
              </div>
              <div className="h-60 overflow-y-auto">
                {todo.map((val, ind) => {
                  return (
                    <div key={ind} className="flex items-center    mt-3 ">
                      {val.status === "Ongoing" ? (
                        <img src={Todo} className="h-5 w-5" />
                      ) : (
                        <img src={CompleteTodo} className="h-5" />
                      )}
                      {val.status === "Ongoing" ? (
                        <p
                          className="ml-3 text-gray-50 cursor-pointer"
                          onClick={() => updateTodo(ind)}
                        >
                          {val.todos}
                        </p>
                      ) : (
                        <p className="text-green-900 font-bold ml-3 cursor-pointer">
                          {val.todos}
                        </p>
                      )}
                      <p
                        className="cursor-pointer ml-3 text-white"
                        onClick={() => removeTodo(ind)}
                      >
                        <AiOutlineMinusCircle />
                      </p>
                    </div>
                  );
                })}
                {todo.length < 1 && (
                  <div className="flex mt-5 items-center">
                    <img src={Todo} className="h-5" />

                    <p
                      className="ml-2 text-white cursor-pointer"
                      onClick={() => setShowTodoList(true)}
                    >
                      Create A Todo
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* ============== Project Section (Cost & Expenses) ==================*/}
        <div className="flex flex-col md:flex-row items-center mt-12">
          <div className="w-full md:w-8/12 ">
            <BarChart chartData={data} />
          </div>
        </div>
        <div className="w-full   mt-20 ">
          <div className="bg-blue3 w-full p-5 rounded-xl ">
            <h4 className="font-medium text-lg">Meterial Cost</h4>
            <table className="mt-2 w-full leading-8  overflow-y-auto text-center">
              <tr>
                <th className="border-2 border-black bg-blue2 text-center">
                  Serial No.
                </th>
                <th className="border-2 border-black bg-blue2 text-center">
                  Description
                </th>
                <th className="border-2 border-black bg-blue2 text-center">
                  UOM
                </th>
                <th className="border-2 border-black bg-blue2 text-center">
                  Quantity
                </th>
                <th className="border-2 border-black bg-blue2 text-center">
                  Unit Price
                </th>
                <th className="border-2 border-black bg-blue2 text-center">
                  Amount
                </th>
                <th className="border-2 border-black bg-blue2 text-center">
                  Remarks
                </th>
                <th className="border-2 border-black bg-blue2 text-center">
                  Action
                </th>
              </tr>
              {project &&
                project.totalExpenses.map((val, ind) => {
                  return (
                    <tr key={ind} className="  mt-5 md:mt-0 ">
                      <td className="border-2 border-black">{ind + 1}</td>
                      <td className="border-2 border-black">{val.title}</td>
                      <td className="border-2 border-black">{val.uom}</td>
                      <td className="border-2 border-black">{val.qty}</td>
                      <td className="border-2 border-black">{val.unitPrice}</td>
                      <td className="border-2 border-black">{val.amount}</td>
                      <td className="border-2 border-black">{val.remarks}</td>
                      <td className=" border-2 border-black ">
                        <AiOutlineMinusCircle
                          onClick={() => deleteExpensesFunc(val._id)}
                          className="block m-auto cursor-pointer"
                        />
                      </td>
                    </tr>
                  );
                })}
            </table>

            <button
              className="bg-blue1 px-4 py-1 font-bold rounded-md mt-4 text-white"
              onClick={() => setAddExpenses(true)}
            >
              Add New
            </button>
          </div>
        </div>
        {/* ============== Project Section (Client Deposit) ==================*/}
        <div className="flex flex-col md:flex-row ">
          <div className=" w-full md:w-4/12 flex justify-center mt-12">
            <div className="bg-blue3 w-11/12 p-5 rounded-xl ">
              <h4 className="font-medium text-lg">Project Credit</h4>
              <div className="mt-2 leading-8 h-60 overflow-y-auto">
                {project &&
                  project.clientDeposit.map((val, ind) => {
                    return (
                      <div
                        key={ind}
                        className="flex items-center  mt-5 md:mt-0 "
                      >
                        <img
                          src={Todo}
                          className="h-6 w-6 md:h-5 md:w-5  mr-2"
                        />
                        <div className="flex flex-col md:flex-row font-bold text-lg">
                          <p>{val.title}</p>
                          <p className="md:ml-2">Amount = {val.amount}</p>
                        </div>
                        <p className="ml-4 cursor-pointer">
                          <AiOutlineMinusCircle
                            onClick={() => deleteDepositFunc(val._id)}
                          />
                        </p>
                      </div>
                    );
                  })}
              </div>

              <button
                className="bg-blue1 px-4 py-1 font-bold rounded-md mt-4 text-white"
                onClick={() => setAddDeposit(true)}
              >
                Add New
              </button>
            </div>
          </div>
          <div className="w-full lg:w-4/12 flex justify-center mt-12">
            <div className="bg-blue3 w-11/12 p-5 rounded-xl ">
              <h4 className="font-medium text-lg">Project Debit</h4>
              <div className="mt-2 leading-8 h-60 overflow-y-auto">
                {project &&
                  project.clientWithdraw.map((val, ind) => {
                    return (
                      <div
                        key={ind}
                        className="flex items-center  mt-5 md:mt-0 "
                      >
                        <img
                          src={Todo}
                          className="h-6 w-6 md:h-5 md:w-5  mr-2"
                        />
                        <div className="flex flex-col md:flex-row font-bold text-lg">
                          <p>{val.title}</p>
                          <p className="md:ml-2">Amount = {val.amount}</p>
                        </div>
                        <p className="ml-4 cursor-pointer">
                          <AiOutlineMinusCircle
                            onClick={() => deleteWithdrawFunc(val._id)}
                          />
                        </p>
                      </div>
                    );
                  })}
              </div>

              <button
                className="bg-blue1 px-4 py-1 font-bold rounded-md mt-4 text-white"
                onClick={() => setAddWithdraw(true)}
              >
                Add New
              </button>
            </div>
          </div>
          <div className=" w-full lg:w-4/12 flex justify-center mt-12">
            <div className="bg-blue3 w-11/12 p-5 rounded-xl ">
              <h4 className="font-medium text-lg">Labour Cost</h4>
              <div className="mt-2 leading-8 h-60 overflow-y-auto">
                {project &&
                  project.labourExpenses.map((val, ind) => {
                    return (
                      <div
                        key={ind}
                        className="flex items-center  mt-5 md:mt-0 "
                      >
                        <img
                          src={Todo}
                          className="h-6 w-6 md:h-5 md:w-5  mr-2"
                        />
                        <div className="flex flex-col md:flex-row font-bold text-lg">
                          <p>{val.title}</p>
                          <p className="md:ml-2">Amount = {val.amount}</p>
                        </div>
                        <p className="ml-4 cursor-pointer">
                          <AiOutlineMinusCircle
                            onClick={() => deleteLabourExpensesFunc(val._id)}
                          />
                        </p>
                      </div>
                    );
                  })}
              </div>

              <button
                className="bg-blue1 px-4 py-1 font-bold rounded-md mt-4 text-white"
                onClick={() => setAddLabourExpenses(true)}
              >
                Add New
              </button>
            </div>
          </div>
        </div>
      </div>

      {showTodoList && (
        <div className="fixed h-full  w-full top-0 left-0 flex justify-center items-center bg-box">
          <div className="bg-blue-500 h-52 w-full md:w-5/12 mx-4 md:mx-0 p-5 rounded-xl">
            <div className="flex items-center justify-between ">
              <p className="font-poppins text-lg font-medium">Create List</p>
              <p className="cursor-pointer text-lg font-bold">
                <RxCross1 onClick={() => setShowTodoList(false)} />
              </p>
            </div>
            <input
              type="text"
              placeholder="Enter your Items"
              className="w-full mt-5 p-2"
              onChange={(e) => setInputData(e.target.value)}
            />
            <button
              className="bg-box px-8 py-1 mt-8 m-auto block text-white font-poppins font-medium"
              onClick={addTodo}
            >
              ADD
            </button>
          </div>
        </div>
      )}
      {addExpenses && (
        <div className="fixed h-full  w-full top-0 left-0 flex justify-center items-center bg-box">
          <div className="bg-blue-500  w-full md:w-5/12 mx-4 md:mx-0 p-5 rounded-xl h-5/6 mt-10   ">
            <div className="flex items-center justify-between ">
              <p className="font-poppins text-lg font-medium">Add Expenses</p>
              <p className="cursor-pointer text-lg font-bold">
                <RxCross1 onClick={() => setAddExpenses(false)} />
              </p>
            </div>
            <div className="overflow-y-scroll h-5/6">
              <div>
                <p className="mt-2">Title</p>
                <textarea
                  type="text"
                  placeholder="Enter your title"
                  className="w-full  mt-2 p-2"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  rows={8}
                />
              </div>
              <div>
                <p className="mt-2">UOM</p>
                <input
                  type="text"
                  placeholder="enter uom---"
                  className="w-full mt-2 p-2"
                  onChange={(e) => setUom(e.target.value)}
                  required
                />
              </div>
              <div>
                <p className="mt-2">Quantity</p>
                <input
                  type="text"
                  placeholder="enter qty"
                  className="w-full mt-2 p-2"
                  onChange={(e) => setQty(e.target.value)}
                  required
                />
              </div>
              <div>
                <p className="mt-2">Unit Price</p>
                <input
                  type="text"
                  placeholder="enter unit price"
                  className="w-full mt-2 p-2"
                  onChange={(e) => setUnit(e.target.value)}
                  required
                />
              </div>
              <div>
                <p className="mt-2">Total Price</p>
                <input
                  type="text"
                  placeholder="Enter your amount"
                  className="w-full mt-2 p-2"
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div>
                <p className="mt-2">Remarks</p>
                <input
                  type="text"
                  placeholder="enter remarks"
                  className="w-full mt-2 p-2"
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
            </div>
            <button
              className="bg-box px-8 py-1 mt-8 m-auto block text-white font-poppins font-medium"
              onClick={addExpensesFunc}
            >
              {ploading ? <Loader /> : "ADD"}
            </button>
          </div>
        </div>
      )}
      {addDeposit && (
        <div className="fixed h-full  w-full top-0 left-0 flex justify-center items-center bg-box">
          <div className="bg-blue-500 w-full md:w-5/12 mx-4 md:mx-0 p-5 rounded-xl">
            <div className="flex items-center justify-between ">
              <p className="font-poppins text-lg font-medium">
                Create Client Deposit
              </p>
              <p className="cursor-pointer text-lg font-bold">
                <RxCross1 onClick={() => setAddDeposit(false)} />
              </p>
            </div>
            <p className="mt-5">Title</p>
            <input
              type="text"
              placeholder="Enter your title"
              className="w-full mt-2 p-2"
              onChange={(e) => setDtitle(e.target.value)}
            />
            <p className="mt-5">Amount</p>
            <input
              type="text"
              placeholder="Enter your amount"
              className="w-full mt-2 p-2"
              onChange={(e) => setDamount(e.target.value)}
            />
            <button
              className="bg-box px-8 py-1 mt-8 m-auto block text-white font-poppins font-medium"
              onClick={addDepositFunc}
            >
              {ploading ? <Loader /> : "ADD"}
            </button>
          </div>
        </div>
      )}
      {addWithdraw && (
        <div className="fixed h-full  w-full top-0 left-0 flex justify-center items-center bg-box">
          <div className="bg-blue-500 w-full md:w-5/12 mx-4 md:mx-0 p-5 rounded-xl">
            <div className="flex items-center justify-between ">
              <p className="font-poppins text-lg font-medium">
                Create Client Debit
              </p>
              <p className="cursor-pointer text-lg font-bold">
                <RxCross1 onClick={() => setAddWithdraw(false)} />
              </p>
            </div>
            <p className="mt-5">Title</p>
            <input
              type="text"
              placeholder="Enter your title"
              className="w-full mt-2 p-2"
              onChange={(e) => setWtitle(e.target.value)}
            />
            <p className="mt-5">Amount</p>
            <input
              type="text"
              placeholder="Enter your amount"
              className="w-full mt-2 p-2"
              onChange={(e) => setWamount(e.target.value)}
            />
            <button
              className="bg-box px-8 py-1 mt-8 m-auto block text-white font-poppins font-medium"
              onClick={addWithdrawFunc}
            >
              {ploading ? <Loader /> : "ADD"}
            </button>
          </div>
        </div>
      )}
      {addLabourExpenses && (
        <div className="fixed h-full  w-full top-0 left-0 flex justify-center items-center bg-box">
          <div className="bg-blue-500 w-full md:w-5/12 mx-4 md:mx-0 p-5 rounded-xl">
            <div className="flex items-center justify-between ">
              <p className="font-poppins text-lg font-medium">
                Create Labour Expenses
              </p>
              <p className="cursor-pointer text-lg font-bold">
                <RxCross1 onClick={() => setAddLabourExpenses(false)} />
              </p>
            </div>
            <p className="mt-5">Title</p>
            <input
              type="text"
              placeholder="Enter your title"
              className="w-full mt-2 p-2"
              onChange={(e) => setLTitle(e.target.value)}
            />
            <p className="mt-5">Amount</p>
            <input
              type="text"
              placeholder="Enter your amount"
              className="w-full mt-2 p-2"
              onChange={(e) => setLAmount(e.target.value)}
            />
            <button
              className="bg-box px-8 py-1 mt-8 m-auto block text-white font-poppins font-medium"
              onClick={addLabourExpensesFunc}
            >
              {ploading ? <Loader /> : "ADD"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerDashboard;
