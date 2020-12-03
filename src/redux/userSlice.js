import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:{},
  role:null,
  id:null,
  loggedIn: false,
  image:null
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
      state.role = action.payload.role
      state.id = action.payload.id
      return state;
    },
    setLoggedOut: (state, action) => {
      state.loggedIn = false;
      return state;
    },
  },
});

const { setUserData, getLoggedInUser, setLoggedIn, setLoggedOut } = mySlice.actions;

export { setUserData, getLoggedInUser, setLoggedIn, setLoggedOut }  
export default mySlice.reducer;
