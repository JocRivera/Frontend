
import React, { useState } from 'react';
import { Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Form } from "@nextui-org/form";

export const cabinStatus = [
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
]

export default function CabinForm({ onSubmit, onClose, initialData, onEdit }) {
    const [submitted, setSubmitted] = useState(null);
    const [errors, setErrors] = useState({});
    const isEditMode = !!initialData;
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        if (isEditMode) {
            const updatedData = {
                ...data,
                id: initialData.id,
                image: data.image.size > 0
                    ? URL.createObjectURL(data.image)
                    : initialData.image
            };
            onEdit(updatedData);
        } else {
            onSubmit(data);
        }
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
                        defaultValue={initialData?.name || ''}
                    />
                    <Input
                        type='number'
                        isRequired
                        name="capacity"
                        placeholder="Cabin capacity"
                        labelPlacement='outside'
                        label='Cabin capacity'
                        defaultValue={initialData?.capacity || ''}
                    />
                    <Textarea
                        name="description"
                        label="Description"
                        placeholder="Enter your description"
                        labelPlacement='outside'
                        isRequired
                        defaultValue={initialData?.description || ''}
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
                        defaultValue={initialData?.price || ''}
                    />
                    <Select
                        isRequired
                        name="status"
                        placeholder="Cabin status"
                        labelPlacement='outside'
                        label='Cabin status'
                        defaultSelectedKeys={initialData?.status ? [initialData.status] : undefined}
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
                    {isEditMode && (
                        <p className="text-sm text-gray-500">
                            {initialData.image ? 'Current image will be kept if no new image is selected' : 'No image currently set'}
                        </p>
                    )}
                </div>
            </div>
        </Form>
    )
}