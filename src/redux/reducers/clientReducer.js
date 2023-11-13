import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const clientNotificationReducer = createReducer(initialState, {
  CreateNotificationRequest: (state) => {
    state.cnloading = true;
  },
  CreateNotificationSuccess: (state, action) => {
    state.cnloading = false;
    state.cnsuccess = action.payload.message;
  },
  CreateNotificationFail: (state, action) => {
    state.cnloading = false;
    state.cnerror = action.payload;
  },

  ClearErrors: (state) => {
    state.cnerror = null;
  },
  ClearSuccess: (state) => {
    state.cnsuccess = null;
  },
});
