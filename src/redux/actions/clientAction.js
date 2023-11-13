import axios from "axios";
import { apiBase } from "../../config";

export const createClientNotification = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "CreateNotificationRequest" });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      apiBase + "/api/v1/create/client/notification",
      userData,
      config
    );
    dispatch({ type: "CreateNotificationSuccess", payload: data });
  } catch (err) {
    dispatch({
      type: "CreateNotificationFail",
      payload: err.response.data.message,
    });
  }
};
