import { createContext, useContext, useState } from 'react';
import AuthService from '../services/auth/Fetch';

export const authService = new AuthService();
export const AuthContext = createContext();

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

    const signin = async (user) => {
        try {
            const response = await authService.login(user.email, user.password);
            setUser(response.user);
            setIsAuthenticated(true);
            setErrors([]);
            return response;
        } catch (error) {
            console.error("Login error:", error);
            setErrors([error.message]);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            errors,
            signin
        }}>
            {children}
        </AuthContext.Provider>
    );
}