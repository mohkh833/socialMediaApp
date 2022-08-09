import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "../../requestMethod";

export const userLogin = createAsyncThunk(
    'user/login',
    async({email, password}, {rejectWithValue}) => {
        try{
            const {data} = await publicRequest.post('/auth/login', {email,password})
            localStorage.setItem('userToken', data.data.accessToken)
            return data
        } catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userRegister = createAsyncThunk(
    'user/register',
    async(dataArray, {rejectWithValue}) => {
        try{
            const {data} = await publicRequest.post('/auth/register', dataArray)
            localStorage.setItem('userToken', data.data.accessToken)
            return data
        } catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userEdit = createAsyncThunk(
    'user/edit',
    async({dataArray,id}, {rejectWithValue}) => {
        try{
            const {data} = await userRequest.put(`/user/${id}` , dataArray)
            return data
        } catch(error){
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)