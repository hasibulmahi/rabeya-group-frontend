import axios from "axios";
const localStorageUserData = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

// axios.interceptors.request.use(
//   (config) => {
//     config.headers[
//       "Authorization"
//     ] = `Bearer ${localStorageUserData?.authToken}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
