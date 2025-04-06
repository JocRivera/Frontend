import { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/auth/Fetch';
import Cookies from 'js-cookie';
import axios from 'axios';

export const authService = new AuthService();
export const AuthContext = createContext();

axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);

    const singup = async (user) => {
        try {
            const response = await authService.register(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
            Cookies.set('token', response.token, { expires: 1 }); // Set cookie to expire in 1 day
            setUser(response.user);
            setIsAuthenticated(true);
            setErrors([]);
            console.log("Registered successfully:", response.token);
            return response;
        } catch (error) {
            console.error("Registration error:", error);
            setErrors([error.message]);
        }
    }

    const signin = async (user) => {
        try {
            const response = await authService.login(user.email, user.password);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
            Cookies.set('token', response.token, { expires: 1 }); // Set cookie to expire in 1 day
            setUser(response.user);
            setIsAuthenticated(true);
            setErrors([]);
            console.log("Logged in successfully:", response.token);
            return response;
        } catch (error) {
            console.error("Login error:", error);
            setErrors([error.message]);
        }
    }

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
            Cookies.remove('token');
            delete axios.defaults.headers.common['Authorization'];
            console.log("Logged out successfully");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    useEffect(() => {
        const verifyToken = async () => {
            console.log("Verifying token...");
            const cookies = Cookies.get();
            if (cookies.token) {
                try {
                    const response = await authService.verify(cookies.token);
                    setUser(response.user);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Token verification error:", error);
                    setErrors([error.message]);
                }

            }
        }
        verifyToken();
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            errors,
            singup,
            signin,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}