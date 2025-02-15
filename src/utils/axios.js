import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/auth/`, // Adjust as per your backend configuration
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient; // Ensure this is a default export
