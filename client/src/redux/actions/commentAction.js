import { createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest, userRequest } from '../../requestMethod';

export const commentAdd = createAsyncThunk('comment/add', async ({content,post_id,user_id}, { rejectWithValue }) => {
	try {
		const { data } = await publicRequest.post('/comment/', {content,post_id,user_id});
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const commentDelete = createAsyncThunk('comment/del', async (id, { rejectWithValue }) => {
	try {
		const { data } = await userRequest.delete(`/comment/${id}`);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const commentEdit = createAsyncThunk('comment/edit', async ({commentId,content}, { rejectWithValue }) => {
	try {
		const { data } = await userRequest.put(`/comment/${commentId}`,{content});
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});