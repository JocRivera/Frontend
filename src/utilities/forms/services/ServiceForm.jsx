import React from "react";
import { Input, } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
export default function ServiceForm({ onSubmit, onClose }) {
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
            id="service-form"
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
                <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                            return "This field is required";
                        }
                        return errors.service;
                    }
                    }
                    label="Description"
                    name="description"
                    labelPlacement="outside"
                    placeholder="Enter service description"
                />
                <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                            return "This field is required";
                        }
                        return errors.service;
                    }
                    }
                    label="Price"
                    name="price"
                    labelPlacement="outside"
                    placeholder="Enter service price"
                />

            </div>



        </Form>
    )
}