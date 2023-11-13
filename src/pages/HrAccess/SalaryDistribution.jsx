import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  createSalary,
  getEmployee,
} from "../../redux/actions/hrAction";
import Imag from "../../assets/Avatar/Profile2.png";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import MetaData from "../../components/MetaData";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

const SalaryDistribution = () => {
  const dispatch = useDispatch();
  const { employee, aloading } = useSelector((state) => state.employee);
  const { loading, success, error } = useSelector((state) => state.salary);
  const [keyword, setKeyword] = useState("");

  let totalEmployeeSlary =
    employee &&
    employee.map((val) => {
      return val.salary;
    });
  let totalSalary =
    totalEmployeeSlary &&
    totalEmployeeSlary.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  let totalAprovedSalary =
    employee &&
    employee.filter((val) => {
      return val.salaryAproved === "Yes";
    });
  let totalAproved =
    totalAprovedSalary &&
    totalAprovedSalary.map((val) => {
      return val.salary;
    });
  let pendingSalary =
    totalAproved &&
    totalAproved.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  let totalPaidSalary =
    employee &&
    employee.filter((val) => {
      return val.salaryAproved === "Paid";
    });

  const [showSalary, setShowSalary] = useState(false);
  const [employeeFull, setEmployeeFull] = useState();
  const [date, setDate] = useState();
  const handlePay = (val) => {
    setEmployeeFull(val);
    setShowSalary(true);
  };
  const handleCreatePayment = () => {
    let userData = {
      amount: employeeFull.salary,
      employeeId: employeeFull._id,
      date: date,
    };
    dispatch(createSalary(userData));
  };
  //To Local String
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    if (success) {
      toast(success);
      setShowSalary(false);
      dispatch(clearSuccess());
    }
    if (error) {
      toast(error);
      dispatch(clearError);
    }
    dispatch(getEmployee(keyword));
  }, [success, error]);
  return (
    <>
      <div className="px-3 sm:px-12 md:px-12 pt-14 md:py-20">
        <MetaData title={"Salary Distribution"} />
        <div className="mt-5   flex  flex-col md:flex-row items-center relative">
          <div className="bg-blue1 w-full md:w-3/12 mr-1 h-24 rounded-lg px-3 py-5 text-center">
            <p className="text-white text-lg font-medium font-poppins">
              Total Salary
            </p>
            <p className="text-white font-poppins text-2xl font-bold">
              {totalSalary && numberWithCommas(totalSalary)}
            </p>
          </div>
          <div className="bg-blue1 w-full md:w-3/12 mt-5 md:mt-0 mr-1 h-24 rounded-lg px-3 py-5 text-center">
            <p className="text-white text-lg font-medium font-poppins">
              Total approved
            </p>
            <p className="text-white font-poppins text-2xl font-bold">
              {totalAprovedSalary &&
                numberWithCommas(
                  totalAprovedSalary.length + totalPaidSalary.length
                )}
            </p>
          </div>
          <div className="bg-blue1 w-full md:w-3/12 mt-5 md:mt-0 mr-1 h-24 rounded-lg px-3 py-5 text-center">
            <p className="text-white text-lg font-medium font-poppins">
              Pending
            </p>
            <p className="text-white font-poppins text-2xl font-bold">
              {totalAproved && numberWithCommas(totalAproved.length)}
            </p>
          </div>
          <div className="bg-blue1 w-full md:w-3/12 mt-5 md:mt-0 h-24 rounded-lg px-3 py-5 text-center">
            <p className="text-white text-lg font-medium font-poppins">
              Total pending Amount
            </p>
            <p className="text-white font-poppins text-2xl font-bold">
              {pendingSalary && numberWithCommas(pendingSalary)}
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  mt-10">
          {employee && employee.length <= 0 ? (
            <p className="mt-5">No Employee Found</p>
          ) : null}
          {employee &&
            employee.map((val, ind) => {
              return (
                <div key={ind} className="flex  w-full md:w-2/12">
                  <div className="w-full mr-2 bg-blue3 rounded-2xl">
                    <div>
                      {val.avatar ? (
                        <img
                          src={val.avatar.url}
                          alt="client image"
                          className="w-full h-36 rounded-t-2xl rounded-b-xl"
                        />
                      ) : (
                        <img
                          src={Imag}
                          alt="client image"
                          className="w-full h-56 rounded-t-2xl"
                        />
                      )}
                    </div>
                    <div className="p-3 text-white font-poppins text-sm">
                      <div className="text-center">
                        <p>{val.name}</p>
                      </div>
                      <div className="text-center">
                        <p>{val.id}</p>
                      </div>
                      <div className="text-center">
                        <p>{val.role}</p>
                      </div>
                      <div className="flex justify-between mt-5">
                        {val.salaryAproved === "Yes" && (
                          <button
                            onClick={() => handlePay(val)}
                            className="bg-blue1 px-2 py-2 rounded-lg text-xs"
                          >
                            Pay {val.salary}
                          </button>
                        )}
                        {val.salaryAproved === "No" && (
                          <button className="bg-blue1 px-2 py-2 rounded-lg text-xs">
                            Not Aproved
                          </button>
                        )}
                        {val.salaryAproved === "Paid" && (
                          <button className="bg-blue1 px-2 py-2 rounded-lg text-xs">
                            Paid
                          </button>
                        )}

                        <Link
                          to={`/employee/${val._id}`}
                          className="bg-blue1 px-2 py-2  rounded-lg  text-xs"
                        >
                          Edit Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {showSalary && (
        <div className="fixed z-50 w-full h-screen top-0 left-0 bg-box1 flex justify-center items-center">
          <div className="w-4/12 bg-blue1 px-5 py-6 rounded-xl">
            <p className="text-white font-poppins text-lg">Are You Sure?</p>
            <div>
              <div className="my-2">
                <label className="text-sm font-medium font-poppins text-white">
                  Employee ID
                </label>
                <p className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid text-white">
                  {employeeFull.id}
                </p>
              </div>
              <div className="my-2">
                <label className="text-sm font-medium font-poppins text-white">
                  Salary
                </label>
                <p className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid text-white">
                  {employeeFull.salary}
                </p>
              </div>
              <div className="my-2">
                <label className="text-sm font-medium font-poppins text-white">
                  Salary Date
                </label>
                <input
                  type="date"
                  className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="flex ">
              <button
                className="w-full mt-2 bg-green-600 px-3 py-2 rounded-md text-white"
                onClick={handleCreatePayment}
              >
                {loading ? <Loading /> : "Confirm"}
              </button>
              <button
                className="w-full mt-2 ml-2 bg-red-600 px-3 py-2 rounded-md text-white"
                onClick={() => setShowSalary(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SalaryDistribution;
