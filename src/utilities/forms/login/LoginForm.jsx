import React from "react";
import { Input } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Login({ onSubmit, onClose }) {
    const [submitted, setSubmitted] = React.useState(false);
    const { signin, isAuthenticated } = useAuth(); // Desestructura signin del contexto de autenticación
    const navigate = useNavigate(); // Hook para la navegación

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/admin/dashboard"); // Redirige a la página de inicio si ya está autenticado
        }
    }, [isAuthenticated]);

    const handleLogin = async (data) => {
        setSubmitted(true);
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
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        handleLogin(data);
        if (onClose) {
            onClose();
        }
    }
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

