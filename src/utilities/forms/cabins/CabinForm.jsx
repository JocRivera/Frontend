
import React, { useState } from 'react';
import { Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Form } from "@nextui-org/form";

export const cabinStatus = [
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
]

export default function CabinForm({ onSubmit, onClose }) {
    const [submitted, setSubmitted] = useState(null);
    const [errors, setErrors] = useState({});

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
            id="cabin-form"
            className="items-center justify-center w-full space-y-4"
            validationBehavior="native"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={handleSubmit}
        >
            <div className="grid w-full grid-cols-2 gap-6">
                <div className='flex flex-col max-w-md gap-4'>
                    <Input
                        isRequired
                        name="name"
                        placeholder="Cabin name"
                        labelPlacement='outside'
                        label='Cabin name'
                    />
                    <Input
                        type='number'
                        isRequired
                        name="capacity"
                        placeholder="Cabin capacity"
                        labelPlacement='outside'
                        label='Cabin capacity'
                    />
                    <Textarea
                        name="description"
                        label="Description"
                        placeholder="Enter your description"
                        labelPlacement='outside'
                        isRequired
                    />
                </div>
                <div className='flex flex-col max-w-md gap-4'>
                    <Input
                        isRequired
                        name="price"
                        type='number'
                        placeholder="Cabin price"
                        labelPlacement='outside'
                        label='Cabin price'
                    />
                    <Select
                        isRequired
                        name="status"
                        placeholder="Cabin status"
                        labelPlacement='outside'
                        label='Cabin status'
                    >
                        {cabinStatus.map((status) => (
                            <SelectItem key={status.key} value={status.key}>{status.label}</SelectItem>
                        ))}
                    </Select>
                    <Input
                        type='file'
                        isRequired
                        name="image"
                        placeholder="Cabin image"
                        labelPlacement='outside'
                        label='Cabin image'
                    />
                </div>
            </div>
        </Form>
    )
}