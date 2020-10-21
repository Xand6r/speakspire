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
      state.loggedIn = action.payload || true;
      return state;
    }
  },
});

export const { setUserData, getLoggedInUser, setLoggedIn } = mySlice.actions;
export default mySlice.reducer;
