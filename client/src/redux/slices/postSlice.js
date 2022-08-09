import { createSlice } from "@reduxjs/toolkit";
import {postAdd, postDelete,postEdit,postGet} from "../actions/postAction";

const initialState = {
    loading: false,
    postsInfo: {}, // for user object
    error: null,
    success: false, // for monitoring the registration process.
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: {
        [postAdd.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [postAdd.fulfilled]: (state) => {
            state.loading = false;
            //state.postsInfo = payload;
            state.success=true;
        },
        [postAdd.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [postDelete.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [postDelete.fulfilled]: (state) => {
            state.loading = false;
            //state.postsInfo = payload;
            state.success=true;
        },
        [postDelete.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [postGet.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [postGet.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.postsInfo = payload;
            state.success=true;
        },
        [postGet.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [postEdit.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [postEdit.fulfilled]: (state) => {
            state.loading = false;
            //state.postsInfo = payload;
            state.success=true;
        },
        [postEdit.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default postSlice.reducer;
