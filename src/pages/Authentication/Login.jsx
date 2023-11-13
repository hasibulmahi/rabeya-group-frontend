import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo.png";
import LoginSvg from "../../assets/login-svg.png";
import UserIcon from "../../assets/icons/user.png";
import LockIcon from "../../assets/icons/lock.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { HiArrowNarrowRight } from "react-icons/hi";
import MetaData from "../../components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../redux/actions/userAction";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const Login = ({ role, roleType, setRoleType, setRole }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const [errUser, setErrUser] = useState(" ");
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

  // Form Validation and Login Function
  const handleLogin = () => {
    if (username === undefined) {
      setErrUser("Enter your username.");
    } else if (username.length < 6) {
      setErrUser("Username should be upper 6 characters");
    } else if (password === undefined) {
      setErrPass("Enter your password.");
    } else if (password.length < 8) {
      setErrPass("Password should be upper 8 characters");
    } else {
      setErrUser(" ");
      setErrPass(" ");
      const data = {
        userName: username,
        password: password,
        role: role,
      };
      dispatch(loginUser(data));
      // console.log(data);
    }
  };

  //User Role Array
  const roleOption = ["Admin", "Hr", "Client", "Manager"];

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      return history(redirect);
    }
  }, [isAuthenticated, error]);

  return (
    <>
      <MetaData title={"Login"} />
      <div className="flex justify-center items-center w-full h-screen">
        <img
          src={LoginSvg}
          alt="Svg Image"
          className="absolute bottom-6 left-1"
          style={{ zIndex: "-22222" }}
        />
        <div className="w-9/12 sm:w-5/12 md:w-5/12 lg:w-3/12 xl:6/12 z-9">
          <img src={Logo} alt="Logo" className="m-auto" />
          {roleType ? (
            <div className="relative my-5">
              <select
                className=" w-full border border-black rounded-md my-2 font-medium py-2 px-2"
                onChange={(e) => setRole(e.target.value)}
              >
                {roleOption.map((val, ind) => {
                  return (
                    <option value={val} key={ind} className="py-4">
                      {val}
                    </option>
                  );
                })}
              </select>
              <button
                className="cursor-pointer flex justify-center  my-5 w-full bg-blue1 hover:bg-blue-600  py-2.5 rounded-md font-poppins font-semibold text-white shadow-btn"
                onClick={() => setRoleType(false)}
              >
                <p className="font-poppins">Next</p>
                <HiArrowNarrowRight
                  className="text-lg ml-2"
                  style={{ marginTop: "2.5px" }}
                />
              </button>
            </div>
          ) : (
            <div>
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
                    placeholder="USERNAME"
                    onChange={(e) => {
                      setUsername(e.target.value), setErrUser("");
                    }}
                  />
                  <p className="text-red-600 text-xs">{errUser}</p>
                </div>
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
              <button
                className="cursor-pointer w-full bg-blue1 hover:bg-blue-600  py-2.5 rounded-md font-poppins font-semibold text-white shadow-btn"
                onClick={handleLogin}
              >
                {loading ? <Loading /> : "Login"}
              </button>
              <Link
                to="#"
                className=" block font-xs absolute my-3"
                onClick={() => {
                  setRoleType(true), setRole("Admin");
                }}
              >
                Choose your role?
              </Link>
              <Link
                to="/forgot-password"
                className="text-right block font-medium my-3"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
