import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "Auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        isLoading: true
    },
    reducers: {

        setUser(state, actions) {

            state.user = actions.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        stopLoading: (state) => {
            state.isLoading = false;
        }

    }
})

export const { setUser, logout, stopLoading } = authSlice.actions;

export default authSlice.reducer;