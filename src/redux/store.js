import { configureStore } from "@reduxjs/toolkit";
import { forgotPasswordReducer, userReducer } from "./reducers/userReducer";
import { projectReducer } from "./reducers/projectReducer";
import {
  adminCustomerReducer,
  deletePaymentReducer,
  getPaymentReducer,
  paymentReducer,
  projectsReducer,
  revenueReducer,
  totalPaymentReducer,
} from "./reducers/adminReducer";
import {
  clientReducer,
  employeeReducer,
  hrProjectReducer,
  notificationReducer,
  projectUserReducer,
  salaryReducer,
} from "./reducers/hrReducer";
import { clientNotificationReducer } from "./reducers/clientReducer";
import { pdfReducer } from "./reducers/pdfReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    projects: projectsReducer,
    project: projectReducer,
    revenue: revenueReducer,
    employee: employeeReducer,
    client: clientReducer,
    payment: paymentReducer,
    allpayment: getPaymentReducer,
    customer: adminCustomerReducer,
    totalPayment: totalPaymentReducer,
    deletepayment: deletePaymentReducer,
    projectUser: projectUserReducer,
    hrProject: hrProjectReducer,
    salary: salaryReducer,
    notification: notificationReducer,
    clientNotification: clientNotificationReducer,
    pdf: pdfReducer,
  },
});

export default store;
