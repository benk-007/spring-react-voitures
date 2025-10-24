
import axios from "axios";
const api = axios.create({ baseURL: "/api" }); // same origin via the proxy

export const withAuth = (cfg = {}) => ({
  ...cfg,
  headers: { ...(cfg.headers || {}), Authorization: "Basic " + btoa("user:pass") },
});

api.interceptors.request.use((cfg) => {
  cfg.headers = cfg.headers || {};
  // For GETs you can omit this since GET /api/** is permitAll now:
  // cfg.headers.Authorization = BASIC;
  return cfg;
});

export default api;

