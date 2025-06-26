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

export default function CalendarComponent({ events }) {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [plan, setPlan] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    useEffect(() => {
        if (events && events.length > 0) {
            const formattedEvents = events.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end)
            }));
            setCalendarEvents(formattedEvents);
        }
    }, [events]);

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
                                <DatePicker
                                    label="Fecha de inicio"
                                    onChange={(date) => setStartDate(date)}
                                />
                                <DatePicker
                                    label="Fecha de fin"
                                    onChange={(date) => setEndDate(date)}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={() => {
                                    // Aquí puedes guardar el evento
                                    onClose();
                                }}>
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
