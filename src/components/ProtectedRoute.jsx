import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const localuserData = localStorage.getItem("userData");

  const history = useNavigate();

  return <div>{!isEmpty(localuserData) ? children : history("/login")}</div>;
};

export default ProtectedRoute;
