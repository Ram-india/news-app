
const API = axios.create({
    baseURL: import.meta.env.API_BASE_URL,
});

//add a token to the request header
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;