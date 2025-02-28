import {AxiosError} from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../api/api";
import User from "../model/User";
import * as SecureStore from 'expo-secure-store';

const initialState = {
    access_token: '',
    refresh_token: '',
    isAuthenticated: false,
    isRegistered: false,
    loading: false,
    error: '',
    user: {
        id: '',
        name: '',
        email: '',
        password: ''
    }
}

export const registerUser = createAsyncThunk(
    "user/ui",
    async (user: User, {rejectWithValue}) => {
        try {
            console.log('User', user);
            const response = await api.post('/auth/register', user);
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
)

export const loginUser = createAsyncThunk(
    "user/login",
    async (user: User, {rejectWithValue}) => {
        try {
            const response = await api.post('/auth/login', user);
            await SecureStore.setItemAsync('access_token', response.data.accessToken);
            await SecureStore.setItemAsync('refresh_token', response.data.refreshToken);
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue('An unknown error occurred');
        }
    }
)

export const refreshToken = createAsyncThunk(
    "user/refreshToken",
    async (refresh_token: string) => {

        try {
            const response = await api.post('/auth/refresh-token', null, {
                headers: {
                    Authorization: `Bearer ${refresh_token}`
                }
            });
            await SecureStore.setItemAsync('access_token', response.data.acessToken);
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            console.log(error);
        }
    }
);

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.access_token = '';
            state.refresh_token = '';
            state.isAuthenticated = false;
            state.user = {
                id: '',
                name: '',
                email: '',
                password: ''
            };
        }
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.error = '';
                state.isRegistered = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log('User Registration Failed', action.payload);
                state.error = action.payload as string;
            })
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.access_token = action.payload.accessToken;
                state.refresh_token = action.payload.refreshToken;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = '';
                console.log('User Login Success', action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log('User Login Failed', action.payload);
                state.error = action.payload as string;
            })
        builder
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.access_token = action.payload.accessToken
            })
    }
})

export const {logoutUser} = userReducer.actions;
export default userReducer.reducer;