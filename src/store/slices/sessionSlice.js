import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    expires: null,
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.user = action.payload.user;
            state.expires = action.payload.expires;
        },
        clearSession: (state) => {
            state.user = null;
            state.expires = null;
        },
    },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
