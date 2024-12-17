import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    ModalFooter,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon.jsx";
import BookForm from "../forms/reservation/client/ReservationForm.jsx";

export default function ModalView() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const targetRef = React.useRef(null);
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");
    const [size, setSize] = React.useState("5xl");
    const [submitted, setSubmitted] = React.useState(null);

    const handleFormSubmit = (data) => {
        setSubmitted(data);
        onOpenChange(false); // Cierra el modal automáticamente
        console.log("Submitted data:", data);
    };

    return (
        <>
            <Button className="text-white shadow-lg bg-gradient-to-tr from-pink-500 to-yellow-500" color="primary" endContent={<PlusIcon />} onPress={onOpen}>Add New</Button>
            <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior} size={size}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Añadir reserva
                            </ModalHeader>
                            <ModalBody>
                                <BookForm onSubmit={handleFormSubmit} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button form="reservation-form" // Vincula al formulario
                                    type="submit" color="primary">
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    );
}

