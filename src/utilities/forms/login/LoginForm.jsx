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

    useEffect(() => {
        if (isAuthenticated) {
            onClose();

            // Determine where to navigate based on user role
            if (user && user.rol) {
                switch (user.rol) {
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'user':
                        navigate('/client/MyBookings');
                        break;
                    default:
                        // Reload page if no specific route
                        window.location.reload();
                }
            } else {
                // Reload page if user object doesn't have role
                window.location.reload();
            }
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

