import React, { useState } from 'react';
import { Input, Textarea, Select, SelectItem, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import ServiceService from '../../../services/services/Fetch';
export const planStatus = [
    { key: 'active', label: 'Active' },
    { key: 'inactive', label: 'Inactive' },
];
const service = new ServiceService();
export default function PlanForm({ onSubmit, onClose, initialData, onEdit }) {
    const [submitted, setSubmitted] = useState(null);
    const [errors, setErrors] = useState({});
    const isEditMode = !!initialData;
    const [services, setServices] = useState([]);
    const fetchService = async () => {
        try {
            const response = await service.fetchServices();
            return response;
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    };
    React.useEffect(() => {
        const fetchData = async () => {
            const servicesData = await fetchService();
            setServices(servicesData);
        }
        fetchData();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        const selectedServices = formData.getAll('services');
        data.services = selectedServices.map(serviceId => ({ _id: serviceId }));
        if (isEditMode) {
            const updatedData = {
                ...data,
                id: initialData.id,
                name: data.name,
                descripcion: data.descripcion,
                price: parseFloat(data.price),
                capacidad: parseInt(data.capacidad, 10),
                status: data.status,
                idService: data.services,
                image: data.image.size > 0
                    ? URL.createObjectURL(data.image)
                    : initialData.image
            };
            onEdit(updatedData);
        } else {
            const newData = {
                ...data,
                name: data.name,
                descripcion: data.descripcion,
                price: parseFloat(data.price),
                capacidad: parseInt(data.capacidad, 10),
                status: data.status,
                idService: data.services,
                image: data.image.size > 0
                    ? URL.createObjectURL(data.image)
                    : null
            };
            onSubmit(newData);
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
                    <div className="flex flex-col gap-2">
                        <CheckboxGroup
                            isRequired
                            name="services"
                            labelPlacement="outside"
                            label="Services included"
                            defaultValue={initialData?.idService?.map(s => typeof s === 'string' ? s : s._id) || []}
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {services.map((service) => (
                                    <Checkbox key={service._id} value={service._id}>
                                        {service.name}
                                    </Checkbox>
                                ))}
                            </div>
                        </CheckboxGroup>
                    </div>
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
