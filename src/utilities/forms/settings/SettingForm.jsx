
import React, { useState, useEffect } from "react";
import { Input, } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import { Switch } from "@nextui-org/react";
import { Select } from "@nextui-org/react";
export default function SettingForm({ onSubmit, onClose }) {
    const [submitted, setSubmitted] = React.useState(false);
    const [permissions, setPermissions] = useState([]);
    const [errors, setErrors] = React.useState({});

    useEffect(() => {
        // Ejemplo de carga de permisos iniciales (puedes reemplazar con tu lógica de obtención de datos)
        setPermissions([
            { uid: "ServiceModule", name: "Services", activo: true },
            { uid: "ConfigModule", name: "Configuracion", activo: false },
            { uid: "AdminModule", name: "Dashboard", activo: true },
            { uid: "UserModule", name: "Users", activo: false },
            { uid: "PlainsModule", name: "Planes", activo: true },
        ]);
    }, []);
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
            id="setting-form"
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
                        return errors.rol;
                    }}
                    label="Rol name"
                    name="rol"
                    labelPlacement="outside"
                    placeholder="Enter rol name"
                />
                {permissions.map((permission) => (
                    <div key={permission.uid} className="flex items-center justify-between">
                        <span>{permission.name}</span>
                        <Switch name={permission.uid} />
                    </div>
                ))}
                <Select
                    label="Status"
                />
            </div>
        </Form>
    )

}