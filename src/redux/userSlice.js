import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:{},
  loggedIn: false
};

const mySlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    // Generic Errors for AJAX
    setUserData: (state, action) => {
      state = {...action.payload}
      return state;
    }
  },
});

export const { setUserData, getLoggedInUser } = mySlice.actions;
export default mySlice.reducer;
