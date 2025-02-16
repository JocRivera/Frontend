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

export default function ModalView({ FormComponent }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const targetRef = React.useRef(null);
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");
    const [size, setSize] = React.useState("5xl");

    return (
        <>
            <Button className="text-white shadow-lg bg-gradient-to-tr from-pink-500 to-yellow-500" color="primary" endContent={<PlusIcon />} onPress={onOpen}>Add New</Button>
            <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior} size={size} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Añadir
                            </ModalHeader>
                            <ModalBody>
                                {FormComponent && FormComponent(onClose)}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>

                                <Button form="reservation-form"
                                    type="submit"
                                    color="primary"


                                >
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

