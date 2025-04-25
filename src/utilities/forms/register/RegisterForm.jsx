import React from "react";
import { Input, Checkbox, Select, SelectItem, DatePicker } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import { useAuth } from "../../../context/AuthContext";


export default function Register({ onSubmit }) {
    const [password, setPassword] = React.useState("");
    const [submitted, setSubmitted] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const { singup } = useAuth();

    const getPasswordError = (value) => {
        if (value.length < 4) {
            return "Password must be 4 characters or more";
        }
        if ((value.match(/[A-Z]/g) || []).length < 1) {
            return "Password needs at least 1 uppercase letter";
        }
        return null;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        try {
            await singup(data);
            if (onSubmit) {
                onSubmit(data);
            }
        }
        catch (error) {
            console.error("Error during register", error);
            setErrors((prev) => ({ ...prev, ...error }));
        } finally {
            setSubmitted(false);
        }
    }

    return (
        <Form
            className="items-center justify-center w-full space-y-4"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={handleSubmit}
            id="register-form"
        >
            <div className="flex flex-col max-w-md gap-4">
                <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                            return "Please enter your name";
                        }

                        return errors.name;
                    }}
                    label="Name"
                    labelPlacement="outside"
                    name="nombre"
                    placeholder="Enter your name"
                />
                <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                            return "Please enter your last name";
                        }

                        return errors.name;
                    }}
                    label="Last Name"
                    labelPlacement="outside"
                    name="apellido"
                    placeholder="Enter your lastname"
                />
                <div className="flex flex-wrap w-full gap-4 mb-6 md:flex-nowrap md:mb-0">
                    <DatePicker label="Fecha de nacimiento"
                        isRequired
                        errorMessage={errors.birthDate}
                        labelPlacement="outside"
                        name="fechaNacimiento"
                        placeholder="Select a date"
                        isInvalid={!!errors.birthDate}
                    />
                </div>
                <div className="flex space-x-4">
                    <Select
                        isRequired
                        isInvalid={!!errors.documentType}
                        errorMessage={errors.documentType}
                        label="Tipo de documento"
                        labelPlacement="outside"
                        name="tipoDocumento"
                        placeholder="Select a type"
                    >
                        <SelectItem key="cc" value="cc">
                            Cedula de Ciudadania
                        </SelectItem>
                        <SelectItem key="ce" value="ce">
                            Cedula de Extranjeria
                        </SelectItem>
                        <SelectItem key="pp" value="pp">
                            Pasaporte
                        </SelectItem>
                    </Select>
                    <Input
                        isRequired
                        isInvalid={!!errors.number}
                        errorMessage={errors.number}
                        label="Numero de documento"
                        labelPlacement="outside"
                        name="documento"
                        placeholder="Enter your number"
                    />

                </div>
                <div className="flex space-x-4">
                    <Input
                        isRequired
                        label="Telefono"
                        labelPlacement="outside"
                        name="telefono"
                        placeholder="Enter your phone number"
                        type="tel"
                        isInvalid={!!errors.phone}
                        errorMessage={errors.phone}
                    />
                    <Input
                        isRequired
                        label="Eps"
                        labelPlacement="outside"
                        name="eps"
                        placeholder="Enter your eps"
                        type="text"
                        isInvalid={!!errors.eps}
                        errorMessage={errors.eps}
                    />
                </div>
                <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                            return "Please enter your email";
                        }
                        if (validationDetails.typeMismatch) {
                            return "Please enter a valid email address";
                        }
                    }}
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                />

                <Input
                    isRequired
                    errorMessage={getPasswordError(password)}
                    isInvalid={getPasswordError(password) !== null}
                    label="Password"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onValueChange={setPassword}
                />

                <Checkbox
                    isRequired
                    classNames={{
                        label: "text-small",
                    }}
                    isInvalid={!!errors.terms}
                    name="terms"
                    validationBehavior="aria"
                    value="true"
                    onValueChange={() => setErrors((prev) => ({ ...prev, terms: undefined }))}
                >
                    I agree to the terms and conditions
                </Checkbox>

                {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}
            </div>

            {submitted && (
                <div className="mt-4 text-small text-default-500">
                    Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
                </div>
            )}
        </Form>
    )

}