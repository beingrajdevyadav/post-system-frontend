import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api";

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
    const { data } = await api.get("/posts");
    return data;
});

export const createPost = createAsyncThunk("posts/create", async (payload) => {
    // payload is formdata
    const { data } = await api.post("/posts", payload);
    return data;
});

const slice = createSlice({
    name: "posts",
    initialState: {
        items: [],
        status: "idle"
    },
    reducers: {},
    extraReducers: builder =>{
        builder
        .addCase(fetchPosts.pending, s=>{s.status = "loading";})
        .addCase(fetchPosts.fulfilled, (s, a)=>{
            s.items = a.payload;
            s.status = "succeeded";
        })
        .addCase(createPost.fulfilled, (s, a)=>{
            s.items.unshift(a.payload);
        });
    }
});

export default slice.reducer;
