import axios from "axios";
import { apiBase } from "../../config";
import { isEmpty } from "lodash";

const localStorageUserData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

export const getRevenue = (token) => async (dispatch) => {
  try {
    dispatch({ type: "RevenueRequest" });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("/api/v1/total/revenue", config);

    // const { data } = await axios.get(apiBase + `/api/v1/total/revenue`);
    if (data) {
      dispatch({ type: "RevenueSuccess", payload: data });
    }
  } catch (err) {
    dispatch({ type: "RevenueFail", payload: err?.response?.data.message });
  }
};

export const getMonthlyRevenue = (token) => async (dispatch) => {
  try {
    dispatch({ type: "MontlyRevenueRequest" });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      apiBase + `/api/v1/monthly/revenue`,
      config
    );
    if (data) {
      dispatch({ type: "MonthlyRevenueSuccess", payload: data });
    }
  } catch (err) {
    dispatch({
      type: "MonthlyRevenueFail",
      payload: err?.response?.data?.message,
    });
  }
};
export const getAllProject = (keyword, token) => async (dispatch) => {
  try {
    dispatch({ type: "AllProjectRequest" });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      apiBase + `/api/v1/all/project?keyword=${keyword}`,
      config
    );
    dispatch({ type: "AllProjectSuccess", payload: data.projects });
  } catch (err) {
    dispatch({ type: "AllProjectFail", payload: err.response.data.message });
  }
};

export const adminDeposit = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "AdminDepositRequest" });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      apiBase + "/api/v1/create/deposit",
      userData,
      config
    );
    dispatch({ type: "AdminDepositSuccess", payload: data.message });
  } catch (err) {
    dispatch({ type: "AdminDepositFail", payload: err.response.data.message });
  }
};

export const adminWithdraw = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "AdminWithdrawRequest" });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      apiBase + "/api/v1/create/withdraw",
      userData,
      config
    );
    dispatch({ type: "AdminWithdrawSuccess", payload: data.message });
  } catch (err) {
    dispatch({ type: "AdminWithdrawFail", payload: err.response.data.message });
  }
};

export const getAllDeposit = () => async (dispatch) => {
  try {
    dispatch({ type: "GetAdminDepositRequest" });

    const config = {
      headers: {
        Authorization: `Bearer ${localStorageUserData?.authToken}`,
      },
    };

    const { data } = await axios.get(apiBase + `/api/v1/admin/deposit`, config);
    dispatch({ type: "GetAdminDepositSuccess", payload: data.adminDeposit });
  } catch (err) {
    dispatch({
      type: "GetAdminDepositFail",
      payload: err.response.data.message,
    });
  }
};

export const getAllWithdraw = () => async (dispatch) => {
  try {
    dispatch({ type: "GetAdminWithdrawRequest" });

    const { data } = await axios.get(apiBase + `/api/v1/admin/withdraw`);
    dispatch({ type: "GetAdminWithdrawSuccess", payload: data.adminWithdraw });
  } catch (err) {
    dispatch({
      type: "GetAdminWithdrawFail",
      payload: err.response.data.message,
    });
  }
};

export const deleteDeposit = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteDepositRequest" });

    const { data } = await axios.delete(
      apiBase + `/api/v1/delete/deposit/${id}`
    );
    if (data) {
      console.log("data is", data);
      dispatch({ type: "DeleteDepositSuccess", payload: data });
    }
  } catch (err) {
    dispatch({
      type: "DeleteDepositFail",
      payload: err.response.data.message,
    });
  }
};
export const deleteWithdraw = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteWithdrawRequest" });

    const { data } = await axios.delete(
      apiBase + `/api/v1/delete/withdraw/${id}`
    );
    dispatch({ type: "DeleteWithdrawSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "DeleteWithdrawFail",
      payload: err.response.data.message,
    });
  }
};

export const getTopCustomer = () => async (dispatch) => {
  try {
    dispatch({ type: "TopCustomerRequest" });

    const { data } = await axios.get(apiBase + `/api/v1/top/customer`);
    dispatch({ type: "TopCustomerSuccess", payload: data.topCustomer });
  } catch (err) {
    dispatch({
      type: "TopCustomerFail",
      payload: err.response.data.message,
    });
  }
};
export const getUnpaidCustomer = (token) => async (dispatch) => {
  try {
    dispatch({ type: "TopUnpaidCustomerRequest" });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      apiBase + `/api/v1/top/unpaid/customer`,
      config
    );
    dispatch({
      type: "TopUnpaidCustomerSuccess",
      payload: data.topUnpaidCustomer,
    });
  } catch (err) {
    dispatch({
      type: "TopUnpaidCustomerFail",
      payload: err.response.data.message,
    });
  }
};

export const getTotalDeposit = (token) => async (dispatch) => {
  try {
    dispatch({ type: "TotalDepositRequest" });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(apiBase + `/api/v1/total/deposit`, config);
    if (data) {
      dispatch({
        type: "TotalDepositSuccess",
        payload: data,
      });
    }
  } catch (err) {
    dispatch({
      type: "TotalDepositFail",
      payload: err?.response?.data?.message,
    });
  }
};
export const getTotalWithdraw = (token) => async (dispatch) => {
  try {
    dispatch({ type: "TotalWithdrawRequest" });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      apiBase + `/api/v1/total/withdraw`,
      config
    );
    dispatch({
      type: "TotalWithdrawSuccess",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "TotalWithdrawFail",
      payload: err?.response?.data?.message,
    });
  }
};
//Clearing Errors
export const clearError = () => async (dispatch) => {
  dispatch({ type: "ClearErrors" });
};

//Clearing Success
export const clearSuccess = () => async (dispatch) => {
  dispatch({ type: "ClearSuccess" });
};
