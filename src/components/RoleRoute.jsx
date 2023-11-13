import React from "react";
import { useSelector } from "react-redux";
import NotFound from "../pages/NotFound";

const RoleRoute = ({ role, children }) => {
  // const { user } = useSelector((state) => state.user);
  const user = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  return <div>{user.role === role ? children : <NotFound />}</div>;
};

export default RoleRoute;
