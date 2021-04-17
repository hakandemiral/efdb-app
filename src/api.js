import axios from "axios";

const api = axios.create({
    baseURL: "https:/efdb.hakandemiral.com.tr",
});

export default api;