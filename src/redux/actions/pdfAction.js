import axios from "axios";
import { apiBase } from "../../config";

export const meterialPdf = (userData, id) => async (dispatch) => {
  try {
    dispatch({ type: "GetMeterialExpensesPdfRequest" });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      apiBase + `/api/v1/meterial/genarate/pdf/${id}`,
      userData,
      config
    );
    dispatch({ type: "GetMeterialExpensesPdfSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "GetMeterialExpensesPdfFail",
      payload: err.response.data.message,
    });
  }
};

export const getMeterialPdf = () => async (dispatch) => {
  try {
    dispatch({ type: "GetMeterialExpensesRequest" });

    const { data } = await axios.get(apiBase + `/api/v1/meterial/pdf`);

    dispatch({
      type: "GetMeterialExpensesSuccess",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "GetMeterialExpensesFail",
      payload: err.response.data.message,
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
