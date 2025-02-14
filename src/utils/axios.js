import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000', // Adjust as per your backend configuration
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient; // Ensure this is a default export
