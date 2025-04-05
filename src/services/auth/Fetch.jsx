import axios from "axios";

const API_URL = "http://localhost:3000";
class AuthService {
    async login(email, password) {
        const data = { email, password };
        try {
            const response = await axios.post(`${API_URL}/login`, data,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            return response.data;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async register(data) {
        try {
            const response = await axios.post(`${API_URL}/register`, data);
            return response.data;
        } catch (error) {
            console.error("Error registering:", error);
            throw error;
        }
    }

    async verify(token) {
        try {
            const response = await axios.get('/verify', {
                withCredentials: true, // Importante para enviar cookies
                // NO incluir el token en headers, sino establecerlo como cookie
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response.data;
        } catch (error) {
            console.error("Error verifying token:", error);
            throw error;
        }
    }
}

export default AuthService;