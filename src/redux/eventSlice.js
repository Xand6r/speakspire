import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../utilities/axios';

const initialState = {
  data: [],
  loading: true,
	message: '',
};

// first, create the thunkk to fetch all the stats 
const fetchAllEvents = createAsyncThunk(
  'data/fetchAllEvents',
  async (thunkAPI) => {
    const response = await axios.get('/events');
    return response.data.data
  }
)

const mySlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      return state;
    },
  },
  extraReducers: {
    [fetchAllEvents.fulfilled]: (state, action) => {
			// when sucesfull, add it to the state
      state.data = action.payload;
      state.loading = false;
      state.loading = false;
    },
    [fetchAllEvents.pending]: (state, action) => {
			// when the request to get all keywords a re pending
			state.loading = true;
    },
    [fetchAllEvents.rejected]: (state, action) => {
			// if there was an error, indicate so 
      state.message = "there was an error, loading speakers";
      state.loading = false;
		},
  }
});

const { setData } = mySlice.actions;

export {
  setData,
  fetchAllEvents
}
export default mySlice.reducer;
