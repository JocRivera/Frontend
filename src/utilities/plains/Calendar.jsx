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
    useDisclosure
} from '@nextui-org/react';

moment.locale('es');
const localizer = momentLocalizer(moment);

export default function CalendarComponent({ events }) {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

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

    const handleSelectSlot = (slotInfo) => {
        setSelectedDate(slotInfo.start);
        onOpen();
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
                onSelectSlot={handleSelectSlot}
                style={{ height: '100%', width: '100%' }}
            />

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear Evento</ModalHeader>
                            <ModalBody>
                                <p className="text-sm text-default-500">
                                    Fecha seleccionada:{" "}
                                    <span className="font-medium text-blue-600">
                                        {selectedDate ? moment(selectedDate).format("LLLL") : ''}
                                    </span>
                                </p>
                                {/* Aquí puedes agregar un formulario para nombre, hora, etc */}
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
