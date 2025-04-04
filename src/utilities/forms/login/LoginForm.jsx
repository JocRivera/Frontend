import React from "react";
import { Input } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import AuthService from "../../../services/auth/Fetch";

const authService = new AuthService();

export default function Login({ onSubmit, onClose }) {
    const [submitted, setSubmitted] = React.useState(false);

    const handleLogin = async (data) => {
        setSubmitted(true);

        const { email, password } = data;
        try {
            const response = await authService.login(email, password);
            const token = response.token; // Extrae el token
            if (token) { // Verifica si hay un token
                onSubmit(token); // Pasa el token a onSubmit
            } else {
                console.error("Login failed, token not found");
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

