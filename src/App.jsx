import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import Home from "./pages/Home/Home";
import { useEffect, useState } from "react";
import { loadUser } from "./redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import RoleRoute from "./components/RoleRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/Authentication/ResetPassword";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SIdebar/Sidebar";
import AllEmployee from "./pages/HrAccess/AllEmployee";
import AddProject from "./pages/HrAccess/AddProject";
import AddEmployee from "./pages/HrAccess/AddEmployee";
import AddClient from "./pages/HrAccess/AddClient";
import AllClient from "./pages/HrAccess/AllClient";
import AllProject from "./pages/HrAccess/AllProject";
import CreateDeposit from "./pages/AdminAccess/CreateDeposit";
import CreateWithdraw from "./pages/AdminAccess/CreateWithdraw";

import {
  getAllProject,
  getTopCustomer,
  getUnpaidCustomer,
} from "./redux/actions/adminAction";
import PaymentHistory from "./pages/AdminAccess/PaymentHistory";

// import { getRevenue } from "../../backend/controllers/adminControllers";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import UpdateClient from "./pages/HrAccess/UpdateClient";
import SingleClient from "./pages/HrAccess/SingleClient";
import SingleEmployee from "./pages/HrAccess/SingleEmployee";
import UpdateEmployee from "./pages/HrAccess/UpdateEmployee";
import SalaryDistribution from "./pages/HrAccess/SalaryDistribution";
import SingleProject from "./pages/HrAccess/SingleProject";
import Notification from "./pages/HrAccess/Notification";
import axios from "axios";
import { isEmpty } from "lodash";
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  const dispatch = useDispatch();
  const { isAutenticated, user } = useSelector((state) => state.user);

  //Set Role Type for Forgot Authentication
  const [role, setRole] = useState("Admin");
  const [roleType, setRoleType] = useState(true);
  const currentUser = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  //Show Sidebar
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setRole(currentUser?.role);
      // dispatch({ type: "LoginSuccess", payload: user });
    }
  }, [currentUser]);

  if (!user && currentUser) {
    dispatch(
      dispatch({
        type: "LoginSuccess",
        payload: {
          ...currentUser,
        },
      })
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
      <Sidebar showSidebar={showSidebar} />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              role={role}
              setRole={setRole}
              roleType={roleType}
              setRoleType={setRoleType}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword role={role} />}
        />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute user={currentUser}>
              <Home user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create/employee"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <AddEmployee />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/all/employee"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <AllEmployee />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/:id"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <SingleEmployee />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/employee/:id"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <UpdateEmployee />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create/project"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <AddProject />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/all/project"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <AllProject />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/project/:id"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <SingleProject />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/create/client"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <AddClient />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/all/client"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <AllClient />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/client/:id"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <SingleClient />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/client/:id"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <UpdateClient />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/salary/distribution"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <SalaryDistribution />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/notification"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Hr">
                <Notification />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/create/deposit"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Admin">
                <CreateDeposit />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/create/withdraw"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Admin">
                <CreateWithdraw />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/payment/history"
          element={
            <ProtectedRoute user={currentUser}>
              <RoleRoute role="Admin">
                <PaymentHistory />
              </RoleRoute>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
