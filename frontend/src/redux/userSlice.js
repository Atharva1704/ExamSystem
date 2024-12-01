import { createSlice } from '@reduxjs/toolkit';

// Initial state for user
const initialState = {
    email: null,
    jwtToken: null,
    sessionId: null,
    grievanceId: null,
    role: null, // User's role(s)
    selectedRole: 1, // Default role set to 1 (student)
};

// Create the user slice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Action to set login data (email, jwtToken, role, and optionally selectedRole)
        setLogin: (state, action) => {
            state.email = action.payload.email;
            state.jwtToken = action.payload.jwtToken;
            state.role = action.payload.role; // Update roles
            state.selectedRole = action.payload.selectedRole || 1; // Default to student role if not provided
        },
        // Action to set sessionId only
        setSessionId: (state, action) => {
            state.sessionId = action.payload.sessionId;
        },
        // Action to set grievanceId only
        setGrievanceId: (state, action) => {
            state.grievanceId = action.payload.grievanceId;
        },
        // Action to set the selected role
        setSelectedRole: (state, action) => {
            state.selectedRole = action.payload.selectedRole;
        },
        // Action to clear user data (logout)
        clearUserData: (state) => {
            state.email = null;
            state.jwtToken = null;
            state.sessionId = null;
            state.grievanceId = null;
            state.role = null;
            state.selectedRole = 1; // Reset to default role (student)
        },
    },
});

// Export actions
export const { setLogin, setSessionId, setGrievanceId, setSelectedRole, clearUserData } = userSlice.actions;

// Export selector to get user data from state
export const selectUser = (state) => state.user;

// Export reducer
export default userSlice.reducer;
