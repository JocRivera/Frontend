import React, { useState, useEffect } from "react";
import { DatePicker, Input, Select, SelectItem, Checkbox, Button, Card } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import { parseDate } from "@internationalized/date";
import { Trash2 } from "lucide-react";

export default function BookForm({ onSubmit, onClose, initialData, onEdit }) {
    const [submitted, setSubmitted] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState("");
    const [isEndDateDisabled, setIsEndDateDisabled] = useState(false);
    const [hasAccompanists, setHasAccompanists] = useState(false);
    const [accompanists, setAccompanists] = useState([]);
    const [numAccompanists, setNumAccompanists] = useState(1);
    const isEditMode = !!initialData;
    useEffect(() => {
        if (selectedPlan === "ca") {
            setIsEndDateDisabled(true);
            setEndDate(startDate); // Establece la fecha de fin igual a la de inicio cuando se selecciona el plan
        } else {
            setIsEndDateDisabled(false);
            // Solo reseteamos la fecha de fin si ya teníamos un plan seleccionado anteriormente
            if (selectedPlan !== "") {
                setEndDate(null);
            }
        }
    }, [selectedPlan, startDate]);
    useEffect(() => {
        if (hasAccompanists) {
            const currentCount = accompanists.length;
            const targetCount = parseInt(numAccompanists);

            if (currentCount < targetCount) {
                // Add new accompanists
                const newAccompanists = [...accompanists];
                for (let i = currentCount; i < targetCount; i++) {
                    newAccompanists.push({
                        id: Date.now() + i,
                        name: "",
                        documentType: "",
                        documentNumber: ""
                    });
                }
                setAccompanists(newAccompanists);
            } else if (currentCount > targetCount) {
                // Remove excess accompanists
                setAccompanists(accompanists.slice(0, targetCount));
            }
        }
    }, [numAccompanists, hasAccompanists]);
    // Reset accompanists when checkbox is unchecked
    useEffect(() => {
        if (!hasAccompanists) {
            setAccompanists([]);
            setNumAccompanists(1);
        }
    }, [hasAccompanists]);
    useEffect(() => {
        if (initialData?.startDate) {
            setStartDate(parseDate(initialData.startDate));
        }
        if (initialData?.endDate) {
            setEndDate(parseDate(initialData.endDate));
        }
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        // Custom validation checks
        const newErrors = {};
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        if (data.terms !== "true") {
            setErrors({ terms: "Please accept the terms" });
            return;
        }
        if (isEditMode) {
            // Aquí está el problema - necesitamos mantener todos los datos originales
            // y solo actualizar los que cambiaron
            const updatedData = {
                ...initialData,  // Mantener todos los datos originales
                client: data.name,
                plan: data.plan,
                startDate: data.startDate,
                endDate: data.endDate,
                email: data.email,
                documentType: data.documentType,
                status: initialData.status,
                room: initialData.room,
                id: initialData.id
            };
            onEdit(updatedData);
        } else {
            onSubmit(data);
        }
        if (onClose) {
            onClose();
        }
        // Clear errors and submit
        setErrors({});

    };
    ;
    const updateAccompanist = (id, field, value) => {
        setAccompanists(accompanists.map(acc =>
            acc.id === id ? { ...acc, [field]: value } : acc
        ));
    };
    const removeAccompanist = (id) => {
        setAccompanists(accompanists.filter(acc => acc.id !== id));
    };



    return (
        <form
            id="reservation-form"
            className="w-full "
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-2 gap-6 ">
                <div className="flex flex-col max-w-md gap-4">
                    <Select
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        isRequired
                        label="Plan"
                        labelPlacement="outside"
                        name="plan"
                        placeholder="Select a plan"
                        defaultSelectedKeys={initialData?.plan ? [initialData.plan] : undefined}
                    >
                        <SelectItem key="ar" value="ar">
                            Romantico
                        </SelectItem>
                        <SelectItem key="us" value="us">
                            Alojamiento
                        </SelectItem>
                        <SelectItem key="ca" value="ca">
                            Dia de sol
                        </SelectItem>
                        <SelectItem key="uk" value="uk">
                            Empresarial
                        </SelectItem>
                        <SelectItem key="au" value="au">
                            Masaje
                        </SelectItem>
                    </Select>
                    <div className="flex space-x-4">
                        <DatePicker
                            label="Fecha de inicio"
                            onChange={setStartDate}
                            placeholder="yyyy-mm-dd"
                            name="startDate"
                            value={startDate}

                        />
                        <DatePicker
                            label="Fecha de Fin"
                            onChange={setEndDate}
                            placeholder="yyyy-mm-dd"
                            isDisabled={isEndDateDisabled}
                            name="endDate"
                            value={endDate}
                        />
                    </div>
                    <Input
                        isRequired
                        label="Name"
                        labelPlacement="outside"
                        name="name"
                        placeholder="Enter your name"
                        defaultValue={initialData?.client || ""}
                    />

                    <Input
                        isRequired
                        errorMessage="Please enter a valid email"
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        defaultValue={initialData?.email || ""}
                    />

                    <div className="flex space-x-4">
                        <Select
                            isRequired
                            label="Tipo de documento"
                            labelPlacement="outside"
                            name="documentType"
                            placeholder="Select a type"
                            defaultSelectedKeys={initialData?.documentType ? [initialData.documentType] : undefined}
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
                            errorMessage={({ validationDetails }) => {
                                if (validationDetails.valueMissing) {
                                    return "Please enter your number";
                                }

                                return errors.name;
                            }}
                            label="Numero de documento"
                            labelPlacement="outside"
                            name="number"
                            placeholder="Enter your number"
                        />
                    </div>
                    <div className="grid gap-4 ">
                        <Checkbox
                            isSelected={hasAccompanists}
                            onValueChange={setHasAccompanists}>
                            Añadir acompañantes
                        </Checkbox>
                        {hasAccompanists && (
                            <Input
                                type="number"
                                min={1}
                                max={30}
                                label="Número de acompañantes"
                                labelPlacement="outside"
                                name="accompanists"
                                value={numAccompanists}
                                onChange={(e) => setNumAccompanists(e.target.value)}
                                required
                            />
                        )}
                    </div>
                    <div className="mb-4">
                        <Checkbox
                            isRequired
                            isInvalid={!!errors.terms}
                            name="terms"
                            validationBehavior="aria"
                            value="true"
                            onValueChange={() => setErrors((prev) => ({ ...prev, terms: undefined }))}
                        >
                            I agree to the terms and conditions
                        </Checkbox></div>
                </div>
                <div className="flex flex-col max-w-md gap-4">
                    {hasAccompanists && (
                        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
                            <div>
                                <h2 className="text-xl font-semibold">Acompañantes</h2>
                                {accompanists.map((accompanist, index) => (
                                    <Card key={accompanist.id} className="p-4 shadow-none">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-start justify-between">
                                                <Input
                                                    isRequired
                                                    label="Name"
                                                    labelPlacement="outside"
                                                    value={accompanist.name}
                                                    onChange={(e) => updateAccompanist(accompanist.id, 'name', e.target.value)}
                                                    placeholder="Enter accompanist name"
                                                />
                                                <div className="flex items-center justify-between mb-2">
                                                    <Button
                                                        isIconOnly
                                                        color="danger"
                                                        size="sm"
                                                        onPress={() => removeAccompanist(accompanist.id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <Select
                                                    isRequired
                                                    label="Tipo de documento"
                                                    labelPlacement="outside"
                                                    name="type"
                                                    placeholder="Select a type"
                                                    value={accompanist.documentType}
                                                    onChange={(e) => updateAccompanist(accompanist.id, 'documentType', e.target.value)}
                                                >
                                                    <SelectItem key="cc" value="cc">Cedula de Ciudadania</SelectItem>
                                                    <SelectItem key="ce" value="ce">Cedula de Extranjeria</SelectItem>
                                                    <SelectItem key="pp" value="pp">Pasaporte</SelectItem>
                                                </Select>
                                                <Input
                                                    labelPlacement="outside"
                                                    isRequired
                                                    label="Document Number"
                                                    value={accompanist.documentNumber}
                                                    onChange={(e) => updateAccompanist(accompanist.id, 'documentNumber', e.target.value)}
                                                    placeholder="Enter document number"
                                                />
                                            </div>

                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}
                    <h2 className="text-xl font-semibold">Pago</h2>
                </div>
            </div>
            {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}
            <div className="flex gap-4">
                <Button type="reset" variant="bordered">
                    Reset
                </Button>
            </div>
            {
                submitted && (
                    console.log(JSON.stringify(submitted, null, 2))
                )
            }
        </form >
    );
}

