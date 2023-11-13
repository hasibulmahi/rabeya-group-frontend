import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const revenueReducer = createReducer(initialState, {
  RevenueRequest: (state) => {
    state.rloading = true;
  },
  RevenueSuccess: (state, action) => {
    state.rloading = false;
    state.revenue = action.payload.revenue;
    state.dailyRevenue = action.payload.dailyRevenue;
  },
  RevenueFail: (state, action) => {
    state.rloading = false;
    state.error = action.payload;
  },

  MonthlyRevenueRequest: (state) => {
    state.rloading = true;
  },
  MonthlyRevenueSuccess: (state, action) => {
    state.rloading = false;
    state.monRevenue = action.payload.monthlyRevenueArray;
  },
  MonthlyRevenueFail: (state, action) => {
    state.rloading = false;
    state.error = action.payload;
  },

  ClearErrors: (state) => {
    state.error = null;
  },
  ClearSuccess: (state) => {
    state.success = null;
  },
});

export const projectsReducer = createReducer(initialState, {
  AllProjectRequest: (state) => {
    state.ploading = true;
  },
  AllProjectSuccess: (state, action) => {
    state.ploading = false;
    state.projects = action.payload;
  },
  AllProjectFail: (state, action) => {
    state.ploading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
  ClearSuccess: (state) => {
    state.success = null;
  },
});

export const paymentReducer = createReducer(initialState, {
  AdminDepositRequest: (state) => {
    state.payloading = true;
  },
  AdminDepositSuccess: (state, action) => {
    state.payloading = false;
    state.success = action.payload;
  },
  AdminDepositFail: (state, action) => {
    state.payloading = false;
    state.error = action.payload;
  },
  AdminWithdrawRequest: (state) => {
    state.payloading = true;
  },
  AdminWithdrawSuccess: (state, action) => {
    state.payloading = false;
    state.success = action.payload;
  },
  AdminWithdrawFail: (state, action) => {
    state.payloading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
  ClearSuccess: (state) => {
    state.success = null;
  },
});

export const getPaymentReducer = createReducer(initialState, {
  GetAdminDepositRequest: (state) => {
    state.getloading = true;
  },
  GetAdminDepositSuccess: (state, action) => {
    state.getloading = false;
    state.allDeposit = action.payload;
  },
  GetAdminDepositFail: (state, action) => {
    state.getloading = false;
    state.error = action.payload;
  },

  GetAdminWithdrawRequest: (state) => {
    state.getloading = true;
  },
  GetAdminWithdrawSuccess: (state, action) => {
    state.getloading = false;
    state.allWithdraw = action.payload;
  },
  GetAdminWithdrawFail: (state, action) => {
    state.getloading = false;
    state.error = action.payload;
  },

  DeleteDepositRequest: (state) => {
    state.getloading = true;
  },
  DeleteDepositSuccess: (state, action) => {
    state.getloading = false;
    state.allDeposit = action.payload.allDeposit;
    state.message = action.payload.message;
  },
  DeleteDepositFail: (state, action) => {
    state.getloading = false;
    state.error = action.payload;
  },

  DeleteWithdrawRequest: (state) => {
    state.getloading = true;
  },
  DeleteWithdrawSuccess: (state, action) => {
    state.getloading = false;
    state.allWithdraw = action.payload.allWithdraw;
    state.message = action.payload.message;
  },
  DeleteWithdrawFail: (state, action) => {
    state.getloading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
  ClearSuccess: (state) => {
    state.success = null;
  },
});

export const deleteDepositReducer = createReducer(initialState, {
  DeleteDepositRequest: (state) => {
    state.dpdloading = true;
  },
  DeleteDepositSuccess: (state, action) => {
    state.dpdloading = false;
    state.message = action.payload.message;
    state.isLoaded = true;
    state.success = action.payload;
  },
  DeleteDepositFail: (state, action) => {
    state.dpdloading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
  ClearSuccess: (state) => {
    state.success = null;
  },
});

export const deletePaymentReducer = createReducer(initialState, {
  DeleteWithdrawRequest: (state) => {
    state.dpwloading = true;
  },
  DeleteWithdrawSuccess: (state, action) => {
    state.dpwloading = false;
    state.message = action.payload.message;
  },
  DeleteWithdrawFail: (state, action) => {
    state.dpwloading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
  ClearSuccess: (state) => {
    state.success = null;
  },
});
export const adminCustomerReducer = createReducer(initialState, {
  TopCustomerRequest: (state) => {
    state.cloading = true;
  },
  TopCustomerSuccess: (state, action) => {
    state.cloading = false;
    state.topcustomer = action.payload;
  },
  TopCustomerFail: (state, action) => {
    state.cloading = false;
    state.error = action.payload;
  },

  TopUnpaidCustomerRequest: (state) => {
    state.cloading = true;
  },
  TopUnpaidCustomerSuccess: (state, action) => {
    state.cloading = false;
    state.unpaidcustomer = action.payload;
  },
  TopUnpaidCustomerFail: (state, action) => {
    state.cloading = false;
    state.error = action.payload;
  },
  ClearErrors: (state) => {
    state.error = null;
  },
  ClearSuccess: (state) => {
    state.success = null;
  },
});

export const totalPaymentReducer = createReducer(initialState, {
  TotalDepositRequest: (state) => {
    state.tloading = true;
  },
  TotalDepositSuccess: (state, action) => {
    state.tloading = false;
    state.totalDeposit = action.payload.totalDeposit;
    state.chairmanDeposit = action.payload.chairmanDeposit;
    state.mdDeposit = action.payload.mdDeposit;
  },
  TotalDepositFail: (state, action) => {
    state.tloading = false;
    state.error = action.payload;
  },
  TotalWithdrawRequest: (state) => {
    state.tloading = true;
  },
  TotalWithdrawSuccess: (state, action) => {
    state.tloading = false;
    state.totalWithdraw = action.payload.totalWithdraw;
    state.chairmanWithdraw = action.payload.chairmanWithdraw;
    state.mdWithdraw = action.payload.mdWithdraw;
  },
  TotalWithdrawFail: (state, action) => {
    state.tloading = false;
    state.error = action.payload;
  },

  ClearErrors: (state) => {
    state.error = null;
  },
  ClearSuccess: (state) => {
    state.success = null;
  },
});

export const individualPaymentReducer = createReducer(initialState, {
  GetAdminDepositRequest: (state) => {
    state.initialStateloading = true;
  },
  GetAdminDepositSuccess: (state, action) => {
    state.iloading = false;
    state.deposit = action.payload;
  },
  GetAdminDepositFail: (state, action) => {
    state.iloading = false;
    state.error = action.payload;
  },

  GetAdminWithdrawRequest: (state) => {
    state.initialStateloading = true;
  },
  GetAdminWithdrawSuccess: (state, action) => {
    state.iloading = false;
    state.withdraw = action.payload;
  },
  GetAdminWithdrawFail: (state, action) => {
    state.iloading = false;
    state.error = action.payload;
  },

  ClearErrors: (state) => {
    state.error = null;
  },
  ClearSuccess: (state) => {
    state.success = null;
  },
});
