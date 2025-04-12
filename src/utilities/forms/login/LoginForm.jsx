import React from "react";
import { Input } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login({ onSubmit, onClose }) {
    const [submitted, setSubmitted] = React.useState(false);
    const { signin, user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    function parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Error parsing JWT", e);
            return null;
        }
    }

    useEffect(() => {
        console.log("Auth state changed:", { isAuthenticated, user });

        if (isAuthenticated) {
            console.log("User is authenticated, closing modal");

            if (onClose) {
                onClose();
                console.log("Modal closed");
            }

            // Get token from cookies to parse role if user object is undefined
            const cookies = document.cookie.split(';');
            const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
            let userRole = null;

            if (tokenCookie) {
                const token = tokenCookie.split('=')[1];
                const decodedToken = parseJwt(token);
                userRole = decodedToken?.rol;
                console.log("Extracted role from token:", userRole);
            }

            // Determine role from user object or token
            const role = user?.rol || userRole;

            setTimeout(() => {
                console.log("Ready to redirect based on role:", role);

                if (role) {
                    switch (role) {
                        case 'admin':
                            console.log("Navigating to admin dashboard");
                            window.location.href = "/admin/dashboard";
                            break;
                        case 'user':
                            console.log("Navigating to user bookings");
                            window.location.href = "/client/MyBookings";
                            break;
                        default:
                            console.log("Unknown role, reloading page");
                            window.location.href = "/";
                    }
                } else {
                    console.warn("Could not determine user role");
                    window.location.href = "/";
                }
            }, 300);
        }
    }, [isAuthenticated, onClose, navigate, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            await signin(data);
            if (onSubmit) {
                onSubmit(data);
            }
        } catch (error) {
            console.error("Error during login", error);
        } finally {
            setSubmitted(false);
        }
    };
    return (
        <Form
            id="login-form"
            className="flex flex-col w-full max-w-xs gap-4"
            onSubmit={handleSubmit}
            onReset={() => setSubmitted(null)}

        >
            <Input
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
            />
            <Input
                isRequired
                errorMessage="Please enter a valid password"
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type="text"
            />

        </Form>
    );
}

