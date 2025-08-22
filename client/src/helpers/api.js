import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:8000/api/v1", // Your base URL
  baseURL: "https://tampere-titans-backend.onrender.com/api/v1"
});

export default api;
