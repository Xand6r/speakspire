import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: {},
	role: null,
	id: null,
	loggedIn: false,
	image: null,
};

const mySlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUserData: (state, action) => {
			state.user = { ...action.payload };
			state.user.favoriteSpeakers = action.payload.favoriteSpeakers === null ? [] : JSON.parse(action.payload.favoriteSpeakers);
			state.user.favoriteEvents = action.payload.favoriteEvents === null ? [] : JSON.parse(action.payload.favoriteEvents);
			return state;
		},
		setFavoriteSpeakers: (state, action) => {
			state.user.favoriteSpeakers = action.payload;
			return state;
		},
		setFavoriteEvents: (state, action) => {
			state.user.favoriteEvents = action.payload;
			return state;
		},
		setLoggedIn: (state, action) => {
			state.loggedIn = true;
			state.role = action.payload.role;
			state.id = action.payload.id;
			return state;
		},
		setLoggedOut: (state, action) => {
			state.loggedIn = false;
			return state;
		},
	},
});

const { setUserData, getLoggedInUser, setLoggedIn, setLoggedOut, setFavoriteSpeakers, setFavoriteEvents } = mySlice.actions;

export { setUserData, getLoggedInUser, setLoggedIn, setLoggedOut, setFavoriteSpeakers, setFavoriteEvents };
export default mySlice.reducer;
