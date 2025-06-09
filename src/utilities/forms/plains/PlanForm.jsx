import React, { useState } from 'react';
import { Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import ServiceService from '../../../services/plones/Fetch';
export const planStatus = [
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
];

export default function PlanForm({ onSubmit, onClose, initialData, onEdit }) {
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
    };

    return (
        <Form
            id="plan-form"
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
                        placeholder="Plan name"
                        labelPlacement='outside'
                        label='Plan name'
                        defaultValue={initialData?.name || ''}
                    />
                    <Textarea
                        isRequired
                        name="descripcion"
                        placeholder="Plan description"
                        labelPlacement='outside'
                        label='Plan description'
                        defaultValue={initialData?.descripcion || ''}
                    />
                    <Input
                        type='number'
                        isRequired
                        name="price"
                        placeholder="Plan price"
                        labelPlacement='outside'
                        label='Plan price'
                        defaultValue={initialData?.price || ''}
                    />
                    <Input
                        type='number'
                        isRequired
                        name="capacidad"
                        placeholder="Plan capacity"
                        labelPlacement='outside'
                        label='Plan capacity'
                        defaultValue={initialData?.capacidad || ''}
                    />
                </div>
                <div className='flex flex-col max-w-md gap-4'>
                    <Input
                        type='file'
                        name="image"
                        accept="image/*"
                        labelPlacement='outside'
                        label='Plan image'
                    />
                    <Select
                        isRequired
                        name="status"
                        placeholder="Plan status"
                        labelPlacement='outside'
                        label='Plan status'
                        defaultValue={initialData?.status || 'active'}
                    >
                        {planStatus.map((status) => (
                            <SelectItem key={status.key} value={status.key}>
                                {status.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
        </Form>
    );
}
