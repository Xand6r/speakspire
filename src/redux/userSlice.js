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
      state.user = {...action.payload}
      return state;
    },
    setLoggedIn: (state, action) =>{
      state.loggedIn = true;
      return state;
    },
    setLoggedOut: (state, action) => {
      state.loggedIn = false;
      return state;
    }
  },
});

export const { setUserData, getLoggedInUser, setLoggedIn, setLoggedOut } = mySlice.actions;
export default mySlice.reducer;
