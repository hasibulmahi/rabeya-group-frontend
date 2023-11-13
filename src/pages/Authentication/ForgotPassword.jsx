import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import LoginSvg from "../../assets/login-svg.png";
import UserIcon from "../../assets/icons/user.png";
import { Link } from "react-router-dom";
import MetaData from "../../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/userAction";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { clearError } from "../../redux/actions/userAction";

const ForgotPassword = ({ role }) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();

  //Forgot Password
  const handleForgotPassword = () => {
    if (!email) {
      setEmailError("Email is required!");
    } else {
      const data = {
        email: email,
        role: role,
      };
      dispatch(forgotPassword(data));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success(success);
    }
  }, [error, success]);
  return (
    <>
      <MetaData title={"Forgot Password"} />
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
              <img
                src={UserIcon}
                alt="icon"
                className="absolute top-4 left-3"
              />
              <input
                type="text"
                className="h-9 w-full border border-black rounded-md my-2 pl-11 py-4 "
                placeholder="EMAIL"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p className="text-red-600 text-xs">{emailError}</p>
            </div>
          </div>
          <button
            onClick={handleForgotPassword}
            className="cursor-pointer w-full bg-blue1 hover:bg-blue-600  py-2.5 rounded-md font-poppins font-semibold text-white shadow-btn"
          >
            {loading ? <Loading /> : "Submit"}
          </button>
          <Link to="/login" className="text-right block font-medium my-3">
            Try for signin?
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
