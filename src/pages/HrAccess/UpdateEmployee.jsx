import React, { useEffect, useState } from "react";
import Profile from "../../assets/Avatar/Profile2.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  getSingleClient,
  getSingleEmployee,
  updateClient,
  updateEmployee,
} from "../../redux/actions/hrAction";
import Loader from "../../components/Loading";
import MetaData from "../../components/MetaData";
import { useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleEmployee, uloading, usuccess, uerror } = useSelector(
    (state) => state.employee
  );

  const [name, setName] = useState(singleEmployee && singleEmployee.name);
  const [userName, setUserName] = useState(
    singleEmployee && singleEmployee.userName
  );
  const [email, setEmail] = useState(singleEmployee && singleEmployee.email);
  const [mobile, setMobile] = useState(singleEmployee && singleEmployee.mobile);
  const [employeeId, setEmployeeId] = useState(
    singleEmployee && singleEmployee.id
  );
  const [role, setRole] = useState(singleEmployee && singleEmployee.role);
  const [salary, setSalary] = useState(singleEmployee && singleEmployee.salary);
  const [address, setAddress] = useState(
    singleEmployee && singleEmployee.address
  );
  const [type, setType] = useState("No");
  const option = ["No", "Yes"];
  const handleUpdate = (e) => {
    e.preventDefault();
    let userData = {
      userName: userName,
      name: name,
      email: email,
      mobile: mobile,
      id: employeeId,
      role: role,
      salary: parseInt(salary),
      salaryAproved: type,
      address: address,
    };
    //     console.log(userData);

    dispatch(updateEmployee(id, userData));
  };
  useEffect(() => {
    if (usuccess) {
      toast(usuccess);
      dispatch(clearSuccess());
    }
    if (uerror) {
      toast(uerror);
      dispatch(clearError());
    }
    dispatch(getSingleEmployee(id));
  }, [id, usuccess, uerror]);
  return (
    <div className="flex justify-center pt-20 mb-5">
      <MetaData title={"Update Client"} />
      <form
        onSubmit={handleUpdate}
        className=" bg-white shadow-btn rounded-xl w-10/12 md:w-4/12"
      >
        <p className="mt-5 text-center text-lg font-poppins font-medium">
          Update Employee
        </p>
        <div className=" px-5 py-4">
          <div className="my-2">
            <label className="font-poppins font-bold text-sm">Name</label>
            <input
              type="text"
              placeholder="Enter Cmployee Name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              required
            />
          </div>
          <div className="my-2">
            <label className="font-poppins font-bold text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter Cmployee Name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
              required
            />
          </div>
          <div className="my-2">
            <label className="font-poppins font-bold text-sm">Email</label>
            <input
              type="text"
              placeholder="Enter Cmployee Name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
          </div>
          <div className="my-2">
            <label className="font-poppins font-bold text-sm">Mobile</label>
            <input
              type="text"
              placeholder="Enter Cmployee Name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              value={mobile}
              required
            />
          </div>
          <div className="my-2">
            <label className="font-poppins font-bold text-sm">ID</label>
            <input
              type="text"
              placeholder="Enter Cmployee Name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setEmployeeId(e.target.value);
              }}
              value={employeeId}
              required
            />
          </div>
          <div className="my-2">
            <label className="font-poppins font-bold text-sm">Role</label>
            <input
              type="text"
              placeholder="Enter Cmployee Name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setRole(e.target.value);
              }}
              value={role}
              required
            />
          </div>
          <div className="my-2">
            <label className="font-poppins font-bold text-sm">Address</label>
            <input
              type="text"
              placeholder="Enter Cmployee Name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              required
            />
          </div>
          <div className="my-2">
            <label className="font-poppins font-bold text-sm">
              Select for Payment
            </label>
            <select
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              {option.map((val, ind) => {
                return (
                  <option key={ind} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-2">
            <label className="font-poppins font-bold text-sm">Salary</label>
            <input
              type="text"
              placeholder="Enter Cmployee Name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setSalary(e.target.value);
              }}
              value={salary}
              required
            />
          </div>
          <div className="  mt-5">
            <button className="w-full bg-green-600 px-3 py-2 rounded-md text-white">
              {uloading ? <Loader /> : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
