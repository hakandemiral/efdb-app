import axios from "axios";
import auth from "./auth";

console.log(auth.getKey);

const api = axios.create({
    baseURL: "https://efdb.hakandemiral.com.tr"
});

export default api;