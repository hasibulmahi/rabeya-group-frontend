import React, { useEffect, useState } from "react";
import Profile from "../../assets/Avatar/Profile2.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  getSingleClient,
  updateClient,
} from "../../redux/actions/hrAction";
import Loader from "../../components/Loading";
import MetaData from "../../components/MetaData";
import { useParams } from "react-router-dom";

const UpdateClient = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleClient, uloading, usuccess, uerror } = useSelector(
    (state) => state.client
  );

  const [name, setName] = useState(singleClient && singleClient.name);
  const [userName, setUserName] = useState(
    singleClient && singleClient.userName
  );
  const [email, setEmail] = useState(singleClient && singleClient.email);
  const [mobile, setMobile] = useState(singleClient && singleClient.mobile);
  const [work, setWork] = useState(singleClient && singleClient.work);
  const [bankAccount, setBankAccount] = useState(
    singleClient && singleClient.accountNumber
  );
  const handleUpdate = (e) => {
    e.preventDefault();
    let userData = {
      userName: userName,
      name: name,
      email: email,
      mobile: mobile,
      work: work,
      bankAccount: bankAccount,
    };
    //     console.log(userData);

    dispatch(updateClient(id, userData));
  };
  useEffect(() => {
    // if (singleClient) {
    //   setName(singleClient.name);
    //   setUserName(singleClient.userName);
    //   setEmail(singleClient.email);
    //   setMobile(singleClient.mobile);
    //   setWork(singleClient.work);
    //   setBankAccount(singleClient.accountNumber);
    // }

    if (usuccess) {
      toast(usuccess);
      // dispatch(clearSuccess());
    }
    if (uerror) {
      toast(uerror);
      dispatch(clearError());
    }
    dispatch(getSingleClient(id));
  }, [id, usuccess, uerror]);
  return (
    <div className="flex justify-center pt-20 mb-5">
      <MetaData title={"Update Client"} />
      <form onSubmit={handleUpdate} className=" bg-white shadow-btn rounded-xl">
        <p className="mt-5 text-center text-lg font-poppins font-medium">
          Update Client
        </p>
        <div className=" px-5 py-4">
          <div className="my-2">
            <label>Name</label>
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
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter Client Username"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
              required
            />
          </div>
          <div className="my-2">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter Client Username"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
          </div>

          <div className="my-2">
            <label>Mobile</label>
            <input
              type="text"
              placeholder="Enter Client Username"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              value={mobile}
              required
            />
          </div>
          <div className="my-2">
            <label>Work Type</label>
            <input
              type="text"
              placeholder="Enter Client Work"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setWork(e.target.value);
              }}
              value={work}
              required
            />
          </div>
          <div className="my-2">
            <label>Bank Account Number</label>
            <input
              type="text"
              placeholder="Enter Client Bank Account"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setBankAccount(e.target.value);
              }}
              value={bankAccount}
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

export default UpdateClient;
