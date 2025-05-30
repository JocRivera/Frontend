import React, { useState, useEffect } from "react";
import { DatePicker, Input, Select, SelectItem, Checkbox, Button, Card } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import { parseDate } from '@internationalized/date';
import { Trash2 } from "lucide-react";
import axios from "axios";

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
    const [availableAccommodations, setAvailableAccommodations] = useState([]);
    const [selectedAccommodation, setSelectedAccommodation] = useState("");
    const [totalGuests, setTotalGuests] = useState(1);
    const [plan, setPlan] = useState([]);
    const isEditMode = !!initialData;
    //actualizar el conteo de huespedes
    useEffect(() => {
        setTotalGuests(1 + (hasAccompanists ? parseInt(numAccompanists) : 0));
    }, [numAccompanists, hasAccompanists]);
    //manejar cambios en el plan seleccionado
    useEffect(() => {
        if (selectedPlan === "67cb9c3bed658211aca19559") {
            setIsEndDateDisabled(true);
            setEndDate(startDate); // Establece la fecha de fin igual a la de inicio cuando se selecciona el plan
        } else {
            setIsEndDateDisabled(false);
            // Solo reseteamos la fecha de fin si ya teníamos un plan seleccionado anteriormente
            if (selectedPlan !== "") {
            }
        }
    }, [selectedPlan, startDate]);
    // manejar cambios en el número de acompañantes
    useEffect(() => {
        if (hasAccompanists) {
            const currentCount = accompanists.length;
            const targetCount = parseInt(numAccompanists);

            if (currentCount < targetCount) {
                // añadir acompañantes
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
                // eliminar excendentes
                setAccompanists(accompanists.slice(0, targetCount));
            }
        }
    }, [numAccompanists, hasAccompanists]);
    // resetear acompañantes si se desactiva la opción
    useEffect(() => {
        if (!hasAccompanists) {
            setAccompanists([]);
            setNumAccompanists(1);
        }
    }, [hasAccompanists]);
    // verificar disponibilidad
    const fetchAvailableAccommodations = async () => {
        if (!startDate || (!endDate && !isEndDateDisabled) || !selectedPlan) {
            return;
        }

        if (selectedPlan !== "67cb9c91ed658211aca1955d" && selectedPlan !== "67cb9ce3ed658211aca1955f") {
            setAvailableAccommodations([]);
            return;
        }

        try {
            const formattedStartDate = startDate.toString();
            const formattedEndDate = endDate ? endDate.toString() : formattedStartDate;

            const apiUrl = `http://localhost:3000/disponibilidad`;
            const response = await axios.get(apiUrl, {
                params: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    guests: totalGuests,
                    plan: selectedPlan,
                    id: initialData?._id || ""
                }
            });

            console.log(apiUrl, response.config.params); // Solo para debug

            const data = response.data;

            // Filtrar los datos según la capacidad
            const accommodationsWithSufficientCapacity = data.filter(
                acc => acc.estado && acc.capacidad >= totalGuests
            );
            setAvailableAccommodations(accommodationsWithSufficientCapacity);

        } catch (error) {
            console.error("Error al buscar alojamientos disponibles:", error);
            // Aquí podrías mostrar un mensaje de error al usuario
        }
    };

    useEffect(() => {
        if (startDate && (endDate || isEndDateDisabled) && selectedPlan && selectedPlan !== "") {
            fetchAvailableAccommodations();
        } else {
            setAvailableAccommodations([]);
        }
    }, [startDate, endDate, selectedPlan, totalGuests]);
    //
    const fetchPlan = async () => {
        try {
            const apiUrl = 'http://localhost:3000/plan';
            const response = await axios.get(apiUrl);
            console.log(apiUrl);
            setPlan(response.data);
        } catch (error) {
            console.error('Error al obtener el plan:', error);
        }
    };
    useEffect(() => {
        fetchPlan();
    }, [])
    // cargar datos iniciales en edicion
    useEffect(() => {
        if (initialData?.startDate) {
            setStartDate(parseDate(initialData.startDate));
        }
        if (initialData?.endDate) {
            setEndDate(parseDate(initialData.endDate));
        }
        if (initialData?.idPlan) {
            setSelectedPlan(initialData.idPlan._id);
        }
        if (initialData?.idAccommodation) {
            setSelectedAccommodation(initialData.idAccommodation);
        }
        if (initialData?.companion) {
            setHasAccompanists(true);
            setNumAccompanists(initialData.companion.length);
            setAccompanists(initialData.companion.map((acc, index) => ({
                id: acc._id,
                name: acc.nombre,
                email: acc.email,
                telefono: acc.telefono,
                eps: acc.eps,
                documentType: acc.tipoDocumento,
                documentNumber: acc.documento
            })));
        }

    }, []);
    const validateForm = (data) => {
        const newErrors = {};

        // Validate plan selection
        if (!data.plan) {
            newErrors.plan = "Please select a plan";
        }

        // Validate dates
        if (!startDate) {
            newErrors.startDate = "Start date is required";
        }

        if (!isEndDateDisabled && !endDate) {
            newErrors.endDate = "End date is required";
        }

        if (startDate && endDate && !isEndDateDisabled && startDate > endDate) {
            newErrors.endDate = "End date must be after start date";
        }

        // Validate client information
        if (!data.name || data.name.trim() === "") {
            newErrors.name = "Name is required";
        }
        else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
            newErrors.name = "Please enter a valid name";
        }

        if (!data.email || data.email.trim() === "") {
            newErrors.email = "Email is required";
        }

        // Validate document information
        if (!data.documentType) {
            newErrors.documentType = "Document type is required";
        }

        if (!data.number || data.number.trim() === "") {
            newErrors.number = "Document number is required";
        } else if (!/^[0-9]+$/.test(data.number)) {
            newErrors.number = "Please enter a valid document number";
        }

        // Validate accompanists if applicable
        if (hasAccompanists) {
            let hasAccompanistErrors = false;

            accompanists.forEach((acc, index) => {
                if (!acc.name || acc.name.trim() === "") {
                    newErrors[`accompanist_${index}_name`] = "Name is required";
                    hasAccompanistErrors = true;
                }

                if (!acc.documentType) {
                    newErrors[`accompanist_${index}_documentType`] = "Document type is required";
                    hasAccompanistErrors = true;
                }

                if (!acc.documentNumber || acc.documentNumber.trim() === "") {
                    newErrors[`accompanist_${index}_documentNumber`] = "Document number is required";
                    hasAccompanistErrors = true;
                }
            });

            if (hasAccompanistErrors) {
                newErrors.accompanists = "Please complete all accompanist information";
            }
        }

        // Validate terms
        if (data.terms !== "true") {
            newErrors.terms = "Please accept the terms and conditions";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        // Custom validation checks
        const newErrors = validateForm(data);

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        if (hasAccompanists && accompanists.length > 0) {
            data.accompanists = JSON.stringify(accompanists);
        }

        // Agregar el alojamiento seleccionado
        if (selectedAccommodation) {
            data.accommodation = selectedAccommodation;
        }
        if (isEditMode) {
            const updatedData = {
                ...initialData,  // Mantener todos los datos originales
                client: data.name,
                plan: data.plan,
                startDate: data.startDate,
                endDate: data.endDate,
                email: data.email,
                documentType: data.documentType,
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
            onReset={() => {
                setSubmitted(null);
                setErrors({});
            }}
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-2 gap-6 ">
                <div className="flex flex-col max-w-md gap-4">
                    {
                        plan.length > 0 && (

                            < Select
                                isRequired
                                isInvalid={!!errors.plan}
                                errorMessage={errors.plan}
                                onChange={(e) => setSelectedPlan(e.target.value)}
                                label="Plan"
                                labelPlacement="outside"
                                name="plan"
                                placeholder="Select a plan"
                                defaultSelectedKeys={initialData?.idPlan._id ? [initialData.idPlan._id] : undefined}
                            >
                                {plan.map((data) => (

                                    <SelectItem key={data._id} >
                                        {data.name}
                                    </SelectItem>

                                ))}
                            </Select>

                        )
                    }
                    <div className="flex space-x-4">
                        <DatePicker
                            isRequired
                            label="Fecha de inicio"
                            onChange={setStartDate}
                            placeholder="yyyy-mm-dd"
                            name="startDate"
                            value={startDate}
                            isInvalid={!!errors.startDate}
                            errorMessage={errors.startDate}

                        />
                        <DatePicker
                            isRequired
                            label="Fecha de Fin"
                            onChange={setEndDate}
                            placeholder="yyyy-mm-dd"
                            isDisabled={isEndDateDisabled}
                            name="endDate"
                            value={endDate}
                            isInvalid={!!errors.endDate}
                            errorMessage={errors.endDate}
                        />
                    </div>
                    <Input
                        isRequired
                        label="Name"
                        labelPlacement="outside"
                        name="name"
                        placeholder="Enter your name"
                        defaultValue={initialData?.cliente || ""}
                        isInvalid={!!errors.name}
                        errorMessage={errors.name}
                    />

                    <Input
                        isRequired
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        defaultValue={initialData?.client.email || ""}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email}
                    />
                    <div className="flex space-x-4">
                        <Input
                            isRequired
                            label="Telefono"
                            labelPlacement="outside"
                            name="phone"
                            placeholder="Enter your phone number"
                            type="tel"
                            defaultValue={initialData?.client.telefono || ""}
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
                            defaultValue={initialData?.eps || ""}
                            isInvalid={!!errors.eps}
                            errorMessage={errors.eps}
                        />
                    </div>
                    <div className="flex space-x-4">
                        <Select
                            isRequired
                            isInvalid={!!errors.documentType}
                            errorMessage={errors.documentType}
                            label="Tipo de documento"
                            labelPlacement="outside"
                            name="documentType"
                            placeholder="Select a type"
                            defaultSelectedKeys={initialData?.client.tipoDocumento ? [initialData.client.tipoDocumento] : undefined}
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
                                                <div className="flex space-x-4">
                                                    <Input
                                                        isRequired
                                                        label="Name"
                                                        labelPlacement="outside"
                                                        value={accompanist.name}
                                                        onChange={(e) => updateAccompanist(accompanist.id, 'name', e.target.value)}
                                                        placeholder="Enter accompanist name"
                                                        isInvalid={!!errors[`accompanist_${index}_name`]}
                                                        errorMessage={errors[`accompanist_${index}_name`]}
                                                    />
                                                    <Input
                                                        isRequired
                                                        label="Email"
                                                        labelPlacement="outside"
                                                        name="email"
                                                        onChange={(e) => updateAccompanist(accompanist.id, 'email', e.target.value)}
                                                        placeholder="Enter your email"
                                                        type="email"
                                                        value={accompanist.email}
                                                    />
                                                </div>
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
                                            <div className="flex space-x-4">
                                                <Input
                                                    isRequired
                                                    label="Telefono"
                                                    labelPlacement="outside"
                                                    name="phone"
                                                    placeholder="Enter your phone number"
                                                    type="tel"
                                                    value={accompanist.telefono}
                                                    onChange={(e) => updateAccompanist(accompanist.id, 'phone', e.target.value)}
                                                    isInvalid={!!errors[`accompanist_${index}_name`]}
                                                    errorMessage={errors[`accompanist_${index}_name`]}
                                                />
                                                <Input
                                                    isRequired
                                                    label="Eps"
                                                    labelPlacement="outside"
                                                    name="eps"
                                                    placeholder="Enter your eps"
                                                    type="text"
                                                    value={accompanist.eps}
                                                    onChange={(e) => updateAccompanist(accompanist.id, 'eps', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex gap-4">
                                                <Select
                                                    defaultSelectedKeys={accompanist.documentType ? [accompanist.documentType] : undefined}
                                                    isInvalid={!!errors[`accompanist_${index}_documentType`]}
                                                    errorMessage={errors[`accompanist_${index}_documentType`]}
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
                                                    isInvalid={!!errors[`accompanist_${index}_documentNumber`]}
                                                    errorMessage={errors[`accompanist_${index}_documentNumber`]}
                                                    labelPlacement="outside"
                                                    isRequired
                                                    label="Document Number"
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
                    {availableAccommodations.length > 0 && (
                        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
                            <div className="flex flex-col gap-4">
                                <h2 className="text-xl font-semibold">Alojamiento</h2>
                                <div className="grid gap-4">
                                    {availableAccommodations.map((acc) => (
                                        <Card key={acc.id} className="p-4 shadow-none">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{acc.idAlojamiento}</h3>
                                                    <p className="text-sm text-gray-500">{acc.tipo}</p>
                                                </div>
                                                <div>
                                                    <span className="flex flex-col text-sm text-gray">Capacity: {acc.capacidad}</span>
                                                    <Checkbox
                                                        isSelected={selectedAccommodation === acc._id}
                                                        onValueChange={() => setSelectedAccommodation(acc._id)}                                                  >
                                                        Select
                                                    </Checkbox>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
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