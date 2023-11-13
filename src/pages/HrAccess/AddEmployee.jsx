import React, { useEffect, useState } from "react";
import Profile from "../../assets/Avatar/Profile2.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  createEmployee,
} from "../../redux/actions/hrAction";
import Loader from "../../components/Loading";
import MetaData from "../../components/MetaData";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const { success, error, loading } = useSelector((state) => state.employee);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState();
  const [id, setId] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [cv, setCv] = useState("");

  const [errName, setErrName] = useState(" ");
  const [errUserName, setErrUserName] = useState(" ");
  const [errEmail, setErrEmail] = useState(" ");
  const [errId, setErrId] = useState(" ");
  const [errMoblie, setErrMoblie] = useState(" ");
  const [errAddress, setErrAddress] = useState(" ");
  const [errSalary, setErrSalary] = useState(" ");
  const [errPass, setErrPass] = useState(" ");

  const chooseAvatar = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const chooseCv = (e) => {
    if (e.target.name === "cv") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setCv(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!name) {
      setErrName("This Field is required");
    } else if (!userName) {
      setErrUserName("This Field is required");
    } else if (!password) {
      setErrPass("This Field is required");
    } else if (!mobile) {
      setErrMoblie("This Field is required");
    } else if (!salary) {
      setErrSalary("This Field is required");
    } else if (!email) {
      setErrEmail("This Field is required");
    } else if (!id) {
      setErrId("This Field is required");
    } else if (!address) {
      setErrAddress("This Field is required");
    } else if (!avatar) {
      toast("Choose profile picture");
    } else if (!cv) {
      toast("Choose Cv");
    } else {
      let userData = {
        userName: userName,
        id: id,
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        salary: salary,
        address: address,
        cv: cv,
        avatar: avatar,
      };
      dispatch(createEmployee(userData));
    }
  };
  useEffect(() => {
    if (success) {
      toast(success);
    }
    if (error) {
      toast(error);
      dispatch(clearError());
    }
  }, [success, error]);
  return (
    <div className="flex justify-center pt-20 mb-5">
      <MetaData title={"Create Employee"} />
      <div className=" bg-white shadow-btn rounded-xl">
        <div className="rounded-md  py-5 px-5">
          <div className="flex justify-center">
            <label htmlFor="file-upload" className="cursor-pointer">
              {avatar ? (
                <img src={avatar} className="m-auto block  h-52 mb-3" />
              ) : (
                <img src={Profile} className="m-auto block  h-52 mb-3" />
              )}
            </label>
          </div>
          <input
            type="file"
            name="avatar"
            id="file-upload"
            accept="image/*"
            className="hidden mt-4"
            onChange={chooseAvatar}
          />
          <div className="flex justify-center">
            <label
              htmlFor="file-upload1"
              className="cursor-pointer bg-blue-900 text-white px-6 font-bold py-1 rounded-md"
            >
              Upload Cv
            </label>
          </div>
          <input
            type="file"
            name="cv"
            id="file-upload1"
            accept="image/*"
            className="hidden mt-4"
            onChange={chooseCv}
          />
        </div>
        <div className=" px-5 py-4">
          <div className="my-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter employee name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setName(e.target.value), setErrName("");
              }}
            />
            {errName && <p>{errName}</p>}
          </div>
          <div className="my-2">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter employee username"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setUserName(e.target.value), setErrUserName("");
              }}
            />
            {errUserName && <p>{errUserName}</p>}
          </div>
          <div className="my-2">
            <label>Employee ID</label>
            <input
              type="text"
              placeholder="Enter employee id"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setId(e.target.value), setErrId("");
              }}
            />
            {errId && <p>{errId}</p>}
          </div>
          <div className="my-2">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter employee email"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setEmail(e.target.value), setErrEmail("");
              }}
            />
            {errEmail && <p>{errEmail}</p>}
          </div>
          <div className="my-2">
            <label>Password</label>
            <input
              type="text"
              placeholder="Enter employee password"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setPassword(e.target.value), setErrPass("");
              }}
            />
            {errPass && <p>{errPass}</p>}
          </div>
          <div className="my-2">
            <label>Mobile</label>
            <input
              type="text"
              placeholder="Enter employee mobile no"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setMobile(e.target.value), setErrMoblie("");
              }}
            />
            {errMoblie && <p>{errMoblie}</p>}
          </div>
          <div className="my-2">
            <label>Salary</label>
            <input
              type="text"
              placeholder="Enter employee salary"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setSalary(e.target.value), setErrSalary("");
              }}
            />
            {errSalary && <p>{errSalary}</p>}
          </div>
          <div className="my-2">
            <label>Present Address</label>
            <input
              type="text"
              placeholder="Enter employee address"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setAddress(e.target.value), setErrAddress("");
              }}
            />
            {errAddress && <p>{errAddress}</p>}
          </div>
          {/* <div className="my-2">
            <input type="checkbox" name="Choose For Manager" value="Manager" />
            <span className="ml-1">Choose For Manager</span>
          </div> */}
          <div className="flex justify-center mt-5">
            <button
              className="bg-blue1 px-3 py-2 rounded-md text-white"
              onClick={handleAddEmployee}
            >
              {loading ? <Loader /> : "Add Employee"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
