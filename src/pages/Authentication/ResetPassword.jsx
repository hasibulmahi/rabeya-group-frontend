import React, { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Logo from "../../assets/logo.png";
import LoginSvg from "../../assets/login-svg.png";
import LockIcon from "../../assets/icons/lock.png";

import { Link, useNavigate, useParams } from "react-router-dom";
import MetaData from "../../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { clearError, resetPassword } from "../../redux/actions/userAction";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { token } = useParams();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errPass, setErrPass] = useState(" ");

  const [paswordType, setPasswordType] = useState("password");

  //Password Show and Hide Function
  const handleShowPass = () => {
    if (paswordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  //Handle Reset Password
  const handleResetPassword = () => {
    if (!password) {
      setErrPass("Password is required");
    } else if (password.length < 8) {
      setErrPass("Password should be 8 characters");
    } else if (password !== confirmPassword) {
      setErrPass("Password doesn't matched");
    } else {
      const tokenData = token.split(",");
      const data = {
        token: tokenData[0],
        password: password,
        role: tokenData[1],
      };

      dispatch(resetPassword(data));
    }
  };

  useEffect(() => {
    if (error) {
      toast(error);
      dispatch(clearError());
    }
    if (success) {
      toast(success);
      history("/login");
    }
  }, [error, success]);
  return (
    <>
      <MetaData title={"Reset Password"} />
      <div className="flex justify-center items-center w-full h-screen">
        <img
          src={LoginSvg}
          alt="Svg Image"
          className="absolute bottom-6 left-1"
          style={{ zIndex: "-22222" }}
        />
        <div className="w-9/12 sm:w-5/12 md:w-5/12 lg:w-3/12 xl:6/12 z-9">
          <img src={Logo} alt="Logo" className="m-auto" />
          <div className="my-5">
            <div className="relative">
              <div className="my-4 relative">
                <img
                  src={LockIcon}
                  alt="icon"
                  className="absolute top-4 left-3"
                />
                {paswordType === "password" ? (
                  <p className="cursor-pointer absolute top-4  right-3 text-xl">
                    <AiFillEye onClick={handleShowPass} />
                  </p>
                ) : (
                  <p className="cursor-pointer absolute top-4  right-3 text-xl">
                    <AiFillEyeInvisible onClick={handleShowPass} />
                  </p>
                )}
                <input
                  type={paswordType}
                  className="h-9 w-full  border border-black rounded-md my-2 pl-11 py-4 "
                  placeholder="PASSWORD"
                  onChange={(e) => {
                    setPassword(e.target.value), setErrPass("");
                  }}
                />
                <p className="text-red-600 text-xs">{errPass}</p>
              </div>
            </div>
            <div className="relative">
              <div className="my-4 relative">
                <img
                  src={LockIcon}
                  alt="icon"
                  className="absolute top-4 left-3"
                />
                <input
                  type="password"
                  className="h-9 w-full  border border-black rounded-md my-2 pl-11 py-4 "
                  placeholder="CONFIRM PASSWORD"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value), setErrPass("");
                  }}
                />
                <p className="text-red-600 text-xs">{errPass}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleResetPassword}
            className="cursor-pointer w-full bg-blue1 hover:bg-blue-600  py-2.5 rounded-md font-poppins font-semibold text-white shadow-btn"
          >
            {loading ? <Loading /> : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
