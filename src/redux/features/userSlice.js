import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api";


// to handle login
export const loginUser = createAsyncThunk("user/login", async ({ email, password }, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/auth/login", { email, password });

        // save token and user in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
});


// to handle register
export const registerUser = createAsyncThunk("user/register", async (formData, { rejectWithValue }) => {
    try {
        const { data } = await api.post("auth/register", formData);

        // save token and user in localstorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Register Failed");
    }
});


const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.pending, (state)=>{
                state.loading = true;
                state.error =null;
            })
            .addCase(registerUser.fulfilled, (state, action)=>{
                state.loading =false;
                state.user = action.payload;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload;
            });

    }
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;