import axios from "axios";
import auth from "./auth";

const api = axios.create({
    baseURL: process.env.apiEndPoint,
    headers: {
        authToken: auth.getKey()
    }
});

export default api;