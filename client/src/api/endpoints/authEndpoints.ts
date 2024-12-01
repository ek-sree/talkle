const BASE_URL = import.meta.env.VITE_API_URL_AUTH;


export const AUTH_ENDPOINTS = {
    REGISTER: `${BASE_URL}/auth/register`,
    LOGIN: `${BASE_URL}/auth/login`,
    OTPVERIFY: `${BASE_URL}/auth/otpVerify`,
    CREATEPROFILE: `${BASE_URL}/auth/create-profile`
  };
  