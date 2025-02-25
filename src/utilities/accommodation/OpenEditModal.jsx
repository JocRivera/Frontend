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

export default function OpenEditModal({ FormComponent, formId, data, onEdit }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const targetRef = React.useRef(null);
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");

    return (
        <>
            <Button className="text-tiny" color="primary" radius="full" size="sm"
                onPress={onOpen}
            >
                Editar
            </Button>
            <Modal
                ref={targetRef}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior={scrollBehavior}
                size={"3xl"}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Editar
                            </ModalHeader>
                            <ModalBody>
                                {FormComponent && FormComponent(onClose, data, onEdit)}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cerrar
                                </Button>
                                <Button
                                    form={formId}
                                    type="submit"
                                    color="primary"
                                >
                                    Confirmar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}