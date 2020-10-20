import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errorMessage: "",
  sucessMessage: "",
  showLoader: false,
};

const mySlice = createSlice({
  name: "errors",
  initialState: initialState,
  reducers: {
    // Generic Errors for AJAX
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
      return state;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = "";
      return state;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
      return state;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = "";
      return state;
    },
    showLoader: (state, action) => {
      state.showLoader = action.payload;
      return state;
    },
  },
});

export const {
  setErrorMessage,
  clearErrorMessage,
  setSuccessMessage,
  clearSuccessMessage,
  showLoader,
} = mySlice.actions;
export default mySlice.reducer;
