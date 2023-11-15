import axios from "axios";
// const localStorageUserData = localStorage.getItem("userData")
//   ? JSON.parse(localStorage.getItem("userData"))
//   : null;

const { user } = useSelector((state) => state.user);

console.log("user>>", user);

// axios.interceptors.request.use(
//   (config) => {
//     config.headers["Authorization"] = `Bearer ${user?.authToken}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
