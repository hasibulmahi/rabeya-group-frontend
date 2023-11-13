import React, { useEffect, useState } from "react";
import Profile from "../../assets/Avatar/Profile2.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  createClient,
  createEmployee,
} from "../../redux/actions/hrAction";
import Loader from "../../components/Loading";
import MetaData from "../../components/MetaData";

const AddClient = () => {
  const dispatch = useDispatch();
  const { success, error, eloading } = useSelector((state) => state.client);

  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [work, setWork] = useState("");
  const [bankAccount, setBankAccount] = useState("");

  const [avatar, setAvatar] = useState("");
  const [agriment, setAgriment] = useState("");
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
          setAgriment(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (!avatar) {
      return toast("Please choose profile picture");
    } else if (!agriment) {
      return toast("Please choose agriment picture");
    } else {
      let userData = {
        userName: userName,
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        agriment: agriment,
        avatar: avatar,
        work: work,
        bankAccount: bankAccount,
      };
      dispatch(createClient(userData));
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
      <MetaData title={"Create Client"} />
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
              Upload Agriment
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
        <form onSubmit={handleAdd} className=" px-5 py-4">
          <div className="my-2">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Cmployee Name"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setName(e.target.value);
              }}
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
              required
            />
          </div>
          <div className="my-2">
            <label>Password</label>
            <input
              type="text"
              placeholder="Enter Client Username"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
              required
            />
          </div>
          <div className="my-2">
            <label>Work Type</label>
            <input
              type="text"
              placeholder="Enter Client Username"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setWork(e.target.value);
              }}
              required
            />
          </div>
          <div className="my-2">
            <label>Bank Account Number</label>
            <input
              type="text"
              placeholder="Enter Client Username"
              className="w-full px-2 py-2 border-black border-2 rounded-lg border-solid"
              onChange={(e) => {
                setBankAccount(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex justify-center mt-5">
            <button className="bg-blue1 px-3 py-2 rounded-md text-white">
              {eloading ? <Loader /> : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
