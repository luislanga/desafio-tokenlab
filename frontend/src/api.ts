import axios from "axios";
import { useAuth } from "react-oidc-context";
export const useApi = () => {
  const auth = useAuth();
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: `Bearer ${auth.user?.id_token}`,
    },
  });
};