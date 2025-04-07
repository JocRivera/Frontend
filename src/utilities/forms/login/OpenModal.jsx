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

export default function ModalView({ login, formId, size }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const targetRef = React.useRef(null);
    const [scrollBehavior, setScrollBehavior] = React.useState("inside");
    
    return (
        <>
            <Button className="text-white shadow-lg bg-gradient-to-tr from-pink-500 to-yellow-500" color="primary" onPress={onOpen}>Login</Button>
            <Modal ref={targetRef} isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={scrollBehavior} size={size} >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Login
                            </ModalHeader>
                            <ModalBody>
                                {login && login(onClose)}
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

