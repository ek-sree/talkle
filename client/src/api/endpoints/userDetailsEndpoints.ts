const BASE_URL = import.meta.env.VITE_API_URL;

export const USERDETAILS_ENDPOINTS ={
    updateName: `${BASE_URL}/userDetails/updateName`,
    updateUserName: `${BASE_URL}/userDetails/updateUserName`
}