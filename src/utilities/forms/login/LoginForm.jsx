import React from "react";
import { Input } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Login({ onSubmit }) {
    const [submitted, setSubmitted] = React.useState(false);
    const { signin } = useAuth();

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

