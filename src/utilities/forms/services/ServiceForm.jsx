import React, { useState, useEffect } from "react";
import { Input, } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
export default function ServiceForm() {
    const [service, setService] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        const newErrors = {};

        setErrors(newErrors);
        setSubmitted(data);

    }

    return (
        <Form
            className="items-center justify-center w-full space-y-4"
            validationBehavior="native"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col max-w-md gap-4">
                <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                            return "This field is required";
                        }
                        return errors.service;
                    }}
                    label="Service"
                    name="service"
                    labelPlacement="outside"
                    placeholder="Enter service name"
                />

            </div>
        </Form>
    )
}