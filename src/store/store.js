import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from "./slices/sessionSlice"; // Import the session reducer

const store = configureStore({
    reducer: {
        session: sessionReducer, // Add session slice to the store
    }
});

export default store;
