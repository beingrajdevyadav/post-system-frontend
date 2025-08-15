import { configureStore } from "@reduxjs/toolkit";

import posts from './features/postSlice';

export const store = configureStore({
   reducer: {
    posts,
   }
});