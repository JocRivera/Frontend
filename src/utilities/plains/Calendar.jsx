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
// Importar CalendarDate desde @internationalized/date
import { CalendarDate, parseDate } from '@internationalized/date';
import axios from 'axios';

moment.locale('es');
const localizer = momentLocalizer(moment);

export default function CalendarComponent() {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [plan, setPlan] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Inicializar fechas como CalendarDate
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const fetchPlan = async () => {
        try {
            const apiUrl = 'http://localhost:3000/plan';
            const response = await axios.get(apiUrl);
            console.log(apiUrl);
            setPlan(response.data || []);
        } catch (error) {
            console.error('Error al obtener el plan:', error);
            setPlan([]);
        }
    };

    const fetchProgrammed = async () => {
        try {
            const res = await axios.get('http://localhost:3000/programacion');
            console.log('Programación obtenida:', res.data);

            // Alternativa si sigues teniendo problemas:
            const formattedEvents = res.data.map((event, index) => {
                const plan = event.idPlan?.name;

                // Extraer solo la parte de la fecha (YYYY-MM-DD) y crear Date local
                const startDateStr = event.fechaInicio.split('T')[0]; // "2025-06-27"
                const endDateStr = event.fechaFin.split('T')[0]; // "2025-06-30"

                // Crear Date usando solo la fecha, sin hora
                const [startYear, startMonth, startDay] = startDateStr.split('-');
                const [endYear, endMonth, endDay] = endDateStr.split('-');

                const startDate = new Date(parseInt(startYear), parseInt(startMonth) - 1, parseInt(startDay));
                const endDate = new Date(parseInt(endYear), parseInt(endMonth) - 1, parseInt(endDay));
                console.log(plan, startDate, endDate);

                return {
                    title: plan || `Evento ${index + 1}`,
                    start: startDate,
                    end: endDate,
                    allDay: true,
                };
            });

            console.log('Eventos formateados para el calendario:', formattedEvents);
            setCalendarEvents(formattedEvents);
        } catch (error) {
            console.error('Error al obtener la programación:', error);
        }
    };

    // Función helper para convertir Date a CalendarDate
    const dateToCalendarDate = (date) => {
        if (!date) return null;
        const jsDate = new Date(date);
        return new CalendarDate(
            jsDate.getFullYear(),
            jsDate.getMonth() + 1, // Date usa 0-indexed, CalendarDate usa 1-indexed
            jsDate.getDate()
        );
    };

    // Función helper para convertir CalendarDate a string formato ISO simple
    const calendarDateToString = (calendarDate) => {
        if (!calendarDate || !calendarDate.year) return null;
        const year = calendarDate.year;
        const month = String(calendarDate.month).padStart(2, '0');
        const day = String(calendarDate.day).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSelectSlot = (slotInfo) => {
        if (slotInfo && slotInfo.start) {
            console.log('Slot seleccionado:', slotInfo.start);

            // Validar que la fecha seleccionada no sea anterior a hoy
            const today = new Date();
            const selectedDate = new Date(slotInfo.start);

            // Comparar solo fechas, sin hora
            today.setHours(0, 0, 0, 0);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                return;
            }

            const selectedCalendarDate = dateToCalendarDate(slotInfo.start);
            console.log('CalendarDate creado:', selectedCalendarDate);

            setStartDate(selectedCalendarDate);
            setEndDate(selectedCalendarDate);
            onOpen();
        }
    };

    const handleSaveEvent = async () => {
        if (!selectedPlan || !startDate || !endDate) {
            console.error('Faltan datos para guardar el evento');
            window.alert('Por favor completa todos los campos');
            return;
        }

        // Validar que la fecha de inicio no sea anterior a la fecha actual
        const today = new Date();
        const startDateObj = new Date(startDate.year, startDate.month - 1, startDate.day);

        // Comparar solo las fechas, sin considerar la hora
        today.setHours(0, 0, 0, 0);
        startDateObj.setHours(0, 0, 0, 0);

        if (startDateObj < today) {
            window.alert('No se puede programar para una fecha anterior a la actual');
            return;
        }

        // Validar que la fecha de fin no sea anterior a la fecha de inicio
        const endDateObj = new Date(endDate.year, endDate.month - 1, endDate.day);
        if (endDateObj < startDateObj) {
            window.alert('La fecha de fin no puede ser anterior a la fecha de inicio');
            return;
        }

        try {
            const apiUrl = 'http://localhost:3000/programacion';

            const newEvent = {
                idPlan: selectedPlan,
                fechaInicio: calendarDateToString(startDate),
                fechaFin: calendarDateToString(endDate),
            };

            console.log('Fechas a guardar:', {
                startDate: calendarDateToString(startDate),
                endDate: calendarDateToString(endDate)
            });
            console.log('Nuevo evento a guardar:', newEvent);

            await axios.post(apiUrl, newEvent);
            onClose();
            fetchProgrammed();
        } catch (error) {
            console.error('Error al guardar el evento:', error);
        }
    };

    useEffect(() => {
        fetchPlan();
        fetchProgrammed();
    }, []);

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
                                    {plan.map((planItem) => (
                                        <SelectItem key={planItem._id} value={planItem._id}>
                                            {planItem.name}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <DatePicker
                                    label="Fecha de inicio"
                                    value={startDate}
                                    onChange={(date) => {
                                        console.log('Nueva fecha de inicio:', date);
                                        setStartDate(date);
                                    }}
                                />

                                <DatePicker
                                    label="Fecha de fin"
                                    onChange={(date) => {
                                        console.log('Nueva fecha de fin:', date);
                                        setEndDate(date);
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={handleSaveEvent}
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