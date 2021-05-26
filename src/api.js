import axios from "axios";
import auth from "./auth";

const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        authToken: auth.getKey()
    }
});

export default api;