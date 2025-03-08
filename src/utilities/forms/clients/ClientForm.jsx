
import React, { useState, useEffect } from "react";
import { Input, } from "@nextui-org/react";
import { Form } from "@nextui-org/form";

export default function SettingForm({ onSubmit, onClose }) {
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
            id="client-form"
            className="items-center justify-center w-full space-y-4"
            validationBehavior="native"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={handleSubmit}
        >
        </Form>
    )

}