import { createSlice } from "@reduxjs/toolkit";
import {commentAdd, commentDelete,commentEdit} from "../actions/commentAction";

const initialState = {
    loading: false,
    //commentsInfo: {}, // for user object
    error: null,
    success: false, // for monitoring the registration process.
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: {
        [commentAdd.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [commentAdd.fulfilled]: (state) => {
            state.loading = false;
            //state.postsInfo = payload;
            state.success=true;
        },
        [commentAdd.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [commentDelete.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [commentDelete.fulfilled]: (state) => {
            state.loading = false;
            //state.postsInfo = payload;
            state.success=true;
        },
        [commentDelete.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [commentEdit.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [commentEdit.fulfilled]: (state) => {
            state.loading = false;
            //state.postsInfo = payload;
            state.success=true;
        },
        [commentEdit.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export default commentSlice.reducer;