import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const pdfReducer = createReducer(initialState, {
  GetMeterialExpensesPdfRequest: (state) => {
    state.loading = true;
  },
  GetMeterialExpensesPdfSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload.message;
    state.filename = action.payload.file;
  },
  GetMeterialExpensesPdfFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  GetMeterialExpensesRequest: (state) => {
    state.loading = true;
  },
  GetMeterialExpensesSuccess: (state, action) => {
    state.loading = false;
    state.filename = action.payload.data;
  },
  GetMeterialExpensesFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  ClearSuccess: (state) => {
    state.success = null;
  },
});
