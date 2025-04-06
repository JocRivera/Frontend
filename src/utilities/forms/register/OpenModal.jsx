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

export default function ModalView({ register, formId, size }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const targetRef = React.useRef(null);
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");

    return (
        <>
            <Button className="text-white shadow-lg bg-gradient-to-tr from-green-500 to-blue-500" color="primary" onPress={onOpen}>Register</Button>
            <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior} size={size} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                register
                            </ModalHeader>
                            <ModalBody>
                                {register && register(onClose)}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
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
            </Modal >
        </>
    );
}

