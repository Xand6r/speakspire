import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../utilities/axios';

const initialState = {
  data: [],
  loading: true,
	message: '',
};

// first, create the thunkk to fetch all the stats 
const fetchAllOrganizers = createAsyncThunk(
  'data/fetchAllOrganizers',
  async (thunkAPI) => {
    const response = await axios.get('/organizers');
    return response.data.data
  }
)

const mySlice = createSlice({
  name: "organizers",
  initialState: initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      return state;
    },
  },
  extraReducers: {
    [fetchAllOrganizers.fulfilled]: (state, action) => {
        // when sucesfull, add it to the state
        state.data = action.payload;
        state.loading = false;
    },
    [fetchAllOrganizers.pending]: (state, action) => {
        // when the request to get all keywords a re pending
        state.loading = true;
    },
    [fetchAllOrganizers.rejected]: (state, action) => {
        // if there was an error, indicate so 
        state.message = "there was an error, loading speakers";
        state.loading = false;
    },
  }
});

const { setData } = mySlice.actions;

export {
  setData,
  fetchAllOrganizers
}
export default mySlice.reducer;
