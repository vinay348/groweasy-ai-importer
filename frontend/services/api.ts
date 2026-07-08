import axios from "axios";

const api = axios.create({
  baseURL: "https://groweasy-ai-importer-6kj7.onrender.com/api",
});

export default api;