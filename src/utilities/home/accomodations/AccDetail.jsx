import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Image, Button, Spinner, Chip } from "@nextui-org/react";
import AccommodationService from "../../../services/accommodations/Fetch";
import { X, ChevronLeft, ChevronRight, Users, CheckCircle } from "lucide-react";

const accommodationService = new AccommodationService();

const AccDetail = ({ isOpen, onClose, accommodationId }) => {
    const [accommodation, setAccommodation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchAccommodation = async () => {
            if (!accommodationId) return;
            try {
                setLoading(true);
                const imageData = await accommodationService.fetchAccommodationById(accommodationId);
                if (imageData) {
                    setImages(imageData.images || []);
                    setAccommodation(imageData);
                } else {
                    setError("No se encontraron datos del alojamiento.");
                }
            } catch (error) {
                console.error("Error fetching accommodation:", error);
            }
            setLoading(false);
        };
        fetchAccommodation();
    }, [accommodationId]);
    useEffect(() => {
        if (accommodation) {
            console.log("Accommodation recibido:", accommodation);
        }
    }, [accommodation]);

    const handleNextImage = () => {
        if (images.length === 0) return;
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images
            .length);
    };
    const handlePrevImage = () => {
        if (images.length === 0) return;
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    const handleClose = () => {
        setAccommodation(null);
        setImages([]);
        setCurrentImageIndex(0);
        setLoading(false);
        setError(null);
        onClose();
    };
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="5xl"
            scrollBehavior="inside"
            classNames={{
                backdrop: "bg-black/60 backdrop-blur-sm",
                base: "max-h-[90vh]",
                body: "p-0",
                header: "p-0",
            }}
        >
            <ModalContent>
                <ModalHeader className="relative p-0">
                    <Button
                        isIconOnly
                        className="absolute z-20 text-white right-2 top-2 bg-black/20 backdrop-blur-sm hover:bg-black/40"
                        onClick={onClose}
                        radius="full"
                        size="sm"
                    >
                        <X size={18} />
                    </Button>
                </ModalHeader>

                <ModalBody className="p-0">
                    <div className="flex flex-col h-full lg:flex-row">
                        {/* Galería de imágenes */}
                        <div className="relative lg:w-3/5">
                            {loading ? (
                                <div className="flex items-center justify-center h-64 lg:h-96">
                                    <Spinner size="lg" color="primary" label="Cargando imágenes..." />
                                </div>
                            ) : images.length > 0 ? (
                                <>
                                    <div className="relative h-64 lg:h-96">
                                        <Image
                                            src={`${API_BASE_URL}/uploads/${images[currentImageIndex].imagePath}`}
                                            alt={`${accommodation.tipo} - Vista ${currentImageIndex + 1}`}
                                            className="object-cover w-full h-full"
                                            radius="none"
                                        />

                                        {images.length > 1 && (
                                            <>
                                                <Button
                                                    isIconOnly
                                                    className="absolute text-white transform -translate-y-1/2 left-2 top-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40"
                                                    onClick={handlePrevImage}
                                                    radius="full"
                                                    size="sm"
                                                >
                                                    <ChevronLeft size={18} />
                                                </Button>

                                                <Button
                                                    isIconOnly
                                                    className="absolute text-white transform -translate-y-1/2 right-2 top-1/2 bg-black/20 backdrop-blur-sm hover:bg-black/40"
                                                    onClick={handleNextImage}
                                                    radius="full"
                                                    size="sm"
                                                >
                                                    <ChevronRight size={18} />
                                                </Button>

                                                <div className="absolute px-2 py-1 text-xs text-white rounded-full bottom-2 right-2 bg-black/50 backdrop-blur-sm">
                                                    {currentImageIndex + 1} / {images.length}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {images.length > 1 && (
                                        <div className="flex gap-2 p-4 overflow-x-auto">
                                            {images.map((image, index) => (
                                                <button
                                                    key={image.idCabinImage || index}
                                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index
                                                        ? "border-blue-500 scale-105"
                                                        : "border-gray-200 hover:border-gray-300"
                                                        }`}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                >
                                                    <Image
                                                        src={`${API_BASE_URL}/uploads/${image.imagePath}`}
                                                        alt={`Miniatura ${index + 1}`}
                                                        className="object-cover w-full h-full"
                                                        radius="sm"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-64 bg-gray-100 lg:h-96">
                                    <p className="text-gray-500">No hay imágenes disponibles</p>
                                </div>
                            )}
                        </div>

                        {/* Información de la cabaña */}
                        <div className="flex flex-col p-6 lg:w-2/5">
                            <div className="mb-4">
                                <h1 className="mb-2 text-2xl font-bold text-gray-800 lg:text-3xl">
                                    {accommodation.tipo}
                                </h1>
                                <div className="flex items-center gap-2 text-blue-600">
                                    <Users size={20} />
                                    <span className="font-medium">
                                        Capacidad para {accommodation.capacidad} persona{accommodation.capacidad > 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-6">
                                {/* <div>
                                    <h2 className="mb-2 text-lg font-semibold text-gray-800">
                                        Descripción
                                    </h2>
                                    <p className="leading-relaxed text-gray-600">
                                        {accommodation.description || "Sin descripción disponible"}
                                    </p>
                                </div> */}
                                <div>
                                    <h2 className="mb-3 text-lg font-semibold text-gray-800">
                                        Comodidades
                                    </h2>
                                    {accommodation.comodidad && accommodation.comodidad.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {accommodation.comodidad.map((comfort) => (
                                                <Chip
                                                    key={comfort.idComfort}
                                                    color="success"
                                                    variant="flat"
                                                    startContent={<CheckCircle size={14} />}
                                                    className="text-sm"
                                                >
                                                    {comfort.tipo}
                                                </Chip>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="italic text-gray-500">
                                            No hay comodidades registradas
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 mt-6 border-t border-gray-200">
                                <Button
                                    color="primary"
                                    size="lg"
                                    className="w-full font-semibold"
                                    onClick={() => {
                                        // Aquí puedes agregar lógica para reservar
                                        console.log('Reservar cabaña:', accommodation.tipo);
                                    }}
                                >
                                    Reservar Ahora
                                </Button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AccDetail;