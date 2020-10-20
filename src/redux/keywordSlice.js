import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getReq, postReq} from '../api';

const initialState = {
	keywords: [],
	loading: false,
	message: {
		error:"",
		text:""
	},
};

// First, create the thunk to fetch all keywords
const fetchAllKeywords = createAsyncThunk(
	'keyword/fetchAllKeywords',
	async (thunkAPI) => {
		const response = await getReq('/keywords')
		return response.data
	}
)

// create a thunk to add a keyword
const addKeyword = createAsyncThunk(
	'keyword/addKeyword',
	async(payload, thunkAPI) => {
		const response = await postReq('/keywords/add', payload)
		return response.data
	}
)

// create a thunk to delete a keyword
const deleteKeyword = createAsyncThunk(
	'keyword/deleteKeyword',
	async(payload, thunkAPI) => {
		const response = await postReq('/keywords/delete', payload)
		return response.data
	}
)

const mySlice = createSlice({
	name: 'keyword',
	initialState: initialState,
	reducers: {
		setKeywords(state, {payload}) {
			state.keywords = {payload, ...state.keywords};
			return state;
		},
		setLoading(state, {payload}) {
			state.loading = payload;
			return state;
		},
		setMessage(state, {payload}) {
			state.message = payload;
			return state;
		},
	},
	extraReducers: {
		[fetchAllKeywords.fulfilled]: (state, action) => {
			// when sucesfull, add it to the state
			state.keywords = action.payload;
			state.loading = false;
			state.message.text = "";
			state.message.error =" ";
		},
		[fetchAllKeywords.pending]: (state, action) => {
			// when the request to get all keywords a re pending
			state.loading = true;
		},
		[fetchAllKeywords.rejected]: (state, action) => {
			// if there was an error, indicate so 
			state.loading = false;
			state.message.error = "there was an error fetcing all keywords";
			state.message.text = "";
		},
		[addKeyword.fulfilled]: (state, action) => {
			// if there was an error, indicate so 
			state.loading = false;
			state.message.error = "";
			state.message.text = "sucesfully added keywords.";
		},
		[addKeyword.pending]: (state, action) => {
			// if there was an error, indicate so 
			state.loading = true;
		},
		[addKeyword.rejected]: (state, action) => {
			// if there was an error, indicate so 
			state.loading = false;
			state.message.error = "there was an error adding this keyword, please try again later";
			state.message.text = "";
		},
		[deleteKeyword.fulfilled]: (state, action) => {
			// if there was an error, indicate so 
			state.loading = false;
			state.message.error = "";
			state.message.text = "sucesfully deleted keywords.";
		},
		[deleteKeyword.pending]: (state, action) => {
			// if there was an error, indicate so 
			state.loading = true;
		},
		[deleteKeyword.rejected]: (state, action) => {
			// if there was an error, indicate so 
			state.loading = false;
			state.message.error = "there was an error deleting  this keyword, please try again later";
			state.message.text = "";
		},
	}
});

const {setKeywords, setLoading, setMessage} = mySlice.actions;


export {
	fetchAllKeywords, addKeyword, deleteKeyword,
	setKeywords, setLoading, setMessage
}

export default mySlice.reducer;
