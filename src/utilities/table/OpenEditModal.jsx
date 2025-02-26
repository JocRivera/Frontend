import React from "react";
import { EditIcon } from "./EditIcon";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    ModalFooter,
} from "@nextui-org/react";

export default function OpenEditModal({ formId, data, onEdit, FormComponent, size }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const targetRef = React.useRef(null);
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");
    return (
        <>
            <EditIcon
                onClick={onOpen}
            />
            <Modal
                ref={targetRef}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size={"3xl"}
                scrollBehavior={scrollBehavior}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Edit </ModalHeader>
                            <ModalBody>
                                {FormComponent && FormComponent(onClose, data, onEdit)}
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={onClose}>Cerrar</Button>
                                <Button color="primary"
                                    type="submit"
                                    form={formId}
                                >Confirmar</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}