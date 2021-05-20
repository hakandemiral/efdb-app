import axios from "axios";

const api = axios.create({
    baseURL: process.env.apiBase|| "http://hakan.local:3001",
});

export default api;