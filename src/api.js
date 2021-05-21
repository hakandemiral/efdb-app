import axios from "axios";
import auth from "./auth";

const api = axios.create({
    baseURL: "https://efdb.hakandemiral.com.tr",
    headers: {
        authToken: auth.getKey()
    }
});

export default api;