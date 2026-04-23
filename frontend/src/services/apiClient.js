import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Intercepteur pour ajouter le token automatiquement
apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token01");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
