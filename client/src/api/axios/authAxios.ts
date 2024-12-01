import axios from 'axios';
import { REFRESH_ENDPOINTS } from '../endpoints/refreshEndpoints';

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL_AUTH,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json', 
  },
});

const getAccessTokenFromSession = (): string | null => {
  return sessionStorage.getItem('accessToken');
};

const saveAccessTokenToSession = (token: string) => {
  sessionStorage.setItem('accessToken', token);
};

authAxios.interceptors.request.use((config) => {
  const accessToken = getAccessTokenFromSession(); 
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(REFRESH_ENDPOINTS.REFRESH_TOKEN, {}, { withCredentials: true });
        const newAccessToken = data.accessToken;

        saveAccessTokenToSession(newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return authAxios(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default authAxios;
