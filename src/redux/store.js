import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import speakerReducer from './speakerSlice';
// import keywordReducer from './keywordSlice';

const rootReducer = combineReducers({
	user: userReducer,
	speakers: speakerReducer
	// data: dataReducer,
	// keywords: keywordReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: false,
		immutableCheck: false
	})
});

export default store;