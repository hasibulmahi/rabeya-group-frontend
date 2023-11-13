import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  ploading: true,
};

export const projectReducer = createReducer(initialState, {
  ProjectRequest: (state) => {
    state.ploading = true;
  },
  ProjectSuccess: (state, action) => {
    state.ploading = false;
    state.project = action.payload;
  },
  ProjectFail: (state, action) => {
    state.ploading = false;
    state.error = action.payload;
  },

  AddExpensesRequest: (state) => {
    state.ploading = true;
  },
  AddExpensesSuccess: (state, action) => {
    state.ploading = false;
    state.project = action.payload.project;
    state.success = action.payload.message;
  },
  AddExpensesFail: (state, action) => {
    state.ploading = false;
    state.error = action.payload;
  },

  DeleteExpensesRequest: (state) => {
    state.ploading = true;
  },
  DeleteExpensesSuccess: (state, action) => {
    state.ploading = false;
    state.project = action.payload.project;
    state.success = action.payload.message;
  },
  DeleteExpensesFail: (state, action) => {
    state.ploading = false;
    state.error = action.payload;
  },

  AddLabourRequest: (state) => {
    state.ploading = true;
  },
  AddLabourSuccess: (state, action) => {
    state.ploading = false;
    state.project = action.payload.project;
    state.success = action.payload.message;
  },
  AddLabourFail: (state, action) => {
    state.ploading = false;
    state.error = action.payload;
  },

  DeleteLabourRequest: (state) => {
    state.ploading = true;
  },
  DeleteLabourSuccess: (state, action) => {
    state.ploading = false;
    state.project = action.payload.project;
    state.success = action.payload.message;
  },
  DeleteLabourFail: (state, action) => {
    state.ploading = false;
    state.error = action.payload;
  },

  /* Deposit */
  AddDepositRequest: (state) => {
    state.ploading = true;
  },
  AddDepositSuccess: (state, action) => {
    state.ploading = false;
    state.project = action.payload.project;
    state.success = action.payload.message;
  },
  AddDepositFail: (state, action) => {
    state.ploading = false;
    state.error = action.payload;
  },

  DeleteDepositRequest: (state) => {
    state.ploading = true;
  },
  DeleteDepositSuccess: (state, action) => {
    state.ploading = false;
    state.project = action.payload.project;
    state.success = action.payload.message;
  },
  DeleteDepositFail: (state, action) => {
    state.ploading = false;
    state.error = action.payload;
  },

  AddWithdrawRequest: (state) => {
    state.ploading = true;
  },
  AddWithdrawSuccess: (state, action) => {
    state.ploading = false;
    state.project = action.payload.project;
    state.success = action.payload.message;
  },
  AddWithdrawFail: (state, action) => {
    state.ploading = false;
    state.error = action.payload;
  },

  DeleteWithdrawRequest: (state) => {
    state.ploading = true;
  },
  DeleteWithdrawSuccess: (state, action) => {
    state.ploading = false;
    state.project = action.payload.project;
    state.success = action.payload.message;
  },
  DeleteWithdrawFail: (state, action) => {
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
