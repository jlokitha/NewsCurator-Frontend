import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.100:5000/api/v1",
    withCredentials: true,
});

export default api;