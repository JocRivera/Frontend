import React from "react";
import { Form } from "@nextui-org/form";

export default function UserForm({ onSubmit, onClose }) {
    const [submitted, setSubmitted] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        onSubmit(data);
        if (onClose) {
            onClose();
        }
    }

    return (
        <Form
            id="user-form"
            className="items-center justify-center w-full space-y-4"
            validationBehavior="native"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={handleSubmit}
        >
        </Form>
    )
}