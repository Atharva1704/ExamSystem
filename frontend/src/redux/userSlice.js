// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for user
const initialState = {
    email: null,
    jwtToken: null,
    sessionId: null,
    grievanceId: null,
    role: null, // Add role to the initial state
};

// Create the user slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action to set login data (email, jwtToken, and role)
        setLogin: (state, action) => {
            state.email = action.payload.email;
            state.jwtToken = action.payload.jwtToken;
            state.role = action.payload.role; // Add role to the state
        },
        // Action to set sessionId only
        setSessionId: (state, action) => {
            state.sessionId = action.payload.sessionId;
        },
        // Action to set grievanceId only
        setGrievanceId: (state, action) => {
            state.grievanceId = action.payload.grievanceId;
        },
        // Action to clear user data (logout)
        clearUserData: (state) => {
            state.email = null;
            state.jwtToken = null;
            state.sessionId = null;
            state.grievanceId = null;
            state.role = null; // Clear the role as well
        },
    },
});

// Export actions
export const { setLogin, setSessionId, setGrievanceId, clearUserData } = userSlice.actions;

// Export selector to get user data from state
export const selectUser = (state) => state.user;

// Export reducer
export default userSlice.reducer;
