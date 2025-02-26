import React, { useState } from 'react';
import TableComponent from '../../utilities/table/TableComponent';
import ServiceForm from '../../utilities/forms/services/ServiceForm';
export default function ServicesManagement() {
    const serviceColumns = [
        { uid: "service", name: "Service Name" },
        { uid: "description", name: "Description" },
        { uid: "price", name: "Price" },
        { uid: "status", name: "Status" },
        { uid: "actions", name: "Actions" }
    ];
    const initialVisibleColumns = ["service", "status", "actions"];
    const statusOptions = [{ name: "Active", uid: "active" }, { name: "Inactive", uid: "inactive" }];
    const [services, setServices] = useState([
        {
            id: 1,
            service: "Room Service",
            description: "Room service description",
            price: "50",
            status: "active",
        },
        {
            id: 2,
            service: "Laundry Service",
            description: "Laundry service description",
            price: "25",
            status: "active",
        },
    ]);
    const handleAddService = (formData) => {
        const newService = {
            id: services.length + 1,
            service: formData.service,
            description: formData.description,
            price: formData.price,
            status: "active",
        };
        setServices([...services, newService]);
    }

    const handleUpdateService = (formData) => {
    }

    const handleDeleteService = (id) => {
        setServices(services.filter(service => service.id !== id));
    }

    return (
        <div>
            <TableComponent
                deleteData={handleDeleteService}
                updateData={handleUpdateService}
                columns={serviceColumns} data={services} initialVisibleColumns={initialVisibleColumns} statusOptions={statusOptions}
                Dynamic={(onClose, onEdit, data) => (
                    <ServiceForm
                        onSubmit={(data) => {
                            handleAddService(data);
                        }}
                        onClose={onClose}
                        initialData={data}
                        onEdit={onEdit}
                    />
                )}
                formId="service-form"
                size="sm"
            />

        </div>
    );
}