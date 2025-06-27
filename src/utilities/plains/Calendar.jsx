import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    SelectItem,
    DatePicker
} from '@nextui-org/react';
import axios from 'axios';

moment.locale('es');
const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [plan, setPlan] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

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
    const fetchProgrammed = async () => {
        try {
            const res = await axios.get('http://localhost:3000/programacion');
            console.log('Programación obtenida:', res.data);

            const formattedEvents = res.data.map((event, index) => {
                const plan = event.idPlan?.[0]; // 👈 acceder al primer plan

                return {
                    title: plan?.name || `Evento ${index + 1}`,
                    start: moment(event.fechaInicio).toDate(), // ✅ SIN desfase de zona horaria
                    end: moment(event.fechaFin).toDate(),
                    allDay: true,
                };
            });

            console.log('Eventos formateados para el calendario:', formattedEvents);
            setCalendarEvents(formattedEvents);
        } catch (error) {
            console.error('Error al obtener la programación:', error);
        }
    };

    const handleSaveEvent = async () => {
        if (!selectedPlan || !startDate || !endDate) {
            console.error('Faltan datos para guardar el evento');
            return;
        }
        try {
            const apiUrl = 'http://localhost:3000/programacion';

            // Formatear directamente usando las propiedades del objeto fecha
            const formatDate = (dateObj) => {
                if (dateObj.year && dateObj.month && dateObj.day) {
                    // Asegurar formato YYYY-MM-DD con padding de ceros
                    const year = dateObj.year;
                    const month = String(dateObj.month).padStart(2, '0');
                    const day = String(dateObj.day).padStart(2, '0');
                    return `${year}-${month}-${day}`;
                }
                // Fallback para objetos Date nativos
                return moment(dateObj).format('YYYY-MM-DD');
            };

            const newEvent = {
                idPlan: selectedPlan,
                fechaInicio: formatDate(startDate),
                fechaFin: formatDate(endDate),
            };

            console.log('Fechas seleccionadas:', { startDate, endDate });
            console.log('Nuevo evento a guardar:', newEvent);

            await axios.post(apiUrl, newEvent);
            onClose();
            fetchProgrammed();
        } catch (error) {
            console.error('Error al guardar el evento:', error);
        }
    }

    useEffect(() => {
        fetchPlan();
        fetchProgrammed();
    }, []);


    const handleSelectSlot = (slotInfo) => {
        if (slotInfo && slotInfo.start) {
            const selectedStartDate = new Date(slotInfo.start);
            setStartDate(selectedStartDate);
            setEndDate(selectedStartDate);
            onOpen();
        }
    };

    return (
        <div className="w-full h-[600px] p-4 rounded-xl shadow-md">
            <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                selectable
                popup
                views={{
                    month: true,
                    agenda: true,
                }}
                onSelectSlot={handleSelectSlot}
                style={{ height: '100%', width: '100%' }}
            />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Programar Plan</ModalHeader>
                            <ModalBody>
                                <Select
                                    label="Seleccionar plan"
                                    selectedKeys={selectedPlan ? [selectedPlan] : []}
                                    onSelectionChange={(keys) => setSelectedPlan([...keys][0])}
                                >
                                    {plan.map((plan) => (
                                        <SelectItem key={plan._id} value={plan._id}>
                                            {plan.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {/* <input
                                    type="date"
                                    label="Fecha de inicio"
                                    value={startDate.toISOString().split('T')[0]}
                                    onChange={(e) => setStartDate(new Date(e.target.value))}
                                    className="w-full p-2 border rounded"
                                /> */}
                                <DatePicker
                                    label="Fecha de inicio"
                                    onChange={(date) => {
                                        setStartDate(date);
                                    }} />
                                <DatePicker
                                    label="Fecha de fin"
                                    onChange={(date) => setEndDate(date)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        handleSaveEvent();
                                    }
                                    }
                                >
                                    Guardar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
