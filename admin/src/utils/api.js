import axios from "axios";

axios.defaults.withCredentials = true;

const API = axios.create({
    baseURL: `${import.meta.env.VITE_SERV_URL}/api/v3`,
    withCredentials: true,
});

// auth
export const checkAuthStatus = () => API.get("/auth/checkStatus");
export const logoutAdmin = () => API.get("/auth/logout");
export const loginWithGoogle = (idToken) =>
    API.post("/auth/google-login", { credential: idToken });
export const verifyPasskey = (passkey) =>
    API.post("/auth/verify-passkey", { passkey });
export const getAllRegistrations = () => API.get("/evregister/all");

export default API;