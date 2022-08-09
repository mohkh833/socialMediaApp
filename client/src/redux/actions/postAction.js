import { createAsyncThunk } from '@reduxjs/toolkit';
import { publicRequest, userRequest } from '../../requestMethod';

export const postAdd = createAsyncThunk('post/add', async (dataArray, { rejectWithValue }) => {
	try {
		const { data } = await publicRequest.post('/post/', dataArray);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const postDelete = createAsyncThunk('post/delete', async (id, { rejectWithValue }) => {
	try {
		const { data } = await userRequest.delete(`/post/${id}`);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const postGet = createAsyncThunk('post/get', async (id, { rejectWithValue }) => {
	try {
		const { data } = await publicRequest.get(`/post/${id}`);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});

export const postEdit = createAsyncThunk('post/edit', async ({dataArray,id}, { rejectWithValue }) => {
	try {
		const { data } = await publicRequest.put(`/post/${id}`, dataArray);
		return data;
	} catch (error) {
		if (error.response && error.response.data.message) {
			return rejectWithValue(error.response.data.message);
		} else {
			return rejectWithValue(error.message);
		}
	}
});
