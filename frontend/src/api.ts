import axios from "axios";
import { useAuth } from "react-oidc-context";

const useApi = () => {
  const auth = useAuth();

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  api.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${auth.user?.id_token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
};

export default useApi;