import { createSlice } from "@reduxjs/toolkit";
import { userEdit, userLogin, userRegister } from "../actions/userAction";

const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

const initialState = {
    loading: false,
    userInfo: {}, // for user object
    userToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
    isAdmin:false,
    login:false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userToken"); // delete token from storage
            state.loading = false;
            state.userInfo = {};
            state.userToken = null;
            state.error = null;
            state.isAdmin=false;
            state.login=false;
            state.success=false
        },
    },
    extraReducers: {
        [userLogin.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.userToken = payload.data.accessToken;
            state.login = true; // logged in successful
            state.isAdmin = payload.data.isAdmin
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false;
            state.login = false;
            state.error = payload;
        },
        [userRegister.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [userRegister.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.userToken = payload.data.accessToken;
            state.success = true; // registration successful
            state.login = true; // logged in successful
            state.isAdmin = payload.data.isAdmin
        },
        [userRegister.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [userEdit.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [userEdit.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.userInfo = payload;
            state.success=true;
        },
        [userEdit.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const { logout } = userSlice.actions
export default userSlice.reducer;
