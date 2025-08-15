import axios from "axios";

export const api = axios.create({
    baseURL: "https://posty-b3hx.onrender.com/api"
});

//for demo : fake token, Replace with your real auth token flow.
api.interceptors.request.use(config=>{
    const token = localStorage.getItem("token"); // store after login
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});