import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardFooter, Image, Button, Spinner } from "@nextui-org/react";
import { Users, ChevronLeft, ChevronRight } from "lucide-react";
import AccommodationService from "../../../services/accommodations/Fetch";
import AccDetail from './AccDetail';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const accommodationService = new AccommodationService();

function AccCard({ type }) {
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [error, setError] = useState(null);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1
        }
    };

    const fetchAccommodations = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await accommodationService.fetchAccommodations();

            if (response && Array.isArray(response)) {
                // Filtrar por tipo: 'cabaña' o 'habitacion'
                const filtered = response.filter(acc => acc.tipo === type);
                setAccommodations(filtered);
            } else {
                setAccommodations([]);
                setError('No se encontraron alojamientos.');
            }
        } catch (err) {
            console.error('Error fetching accommodations:', err);
            setError('No se pudieron cargar los alojamientos.');
            setAccommodations([]);
        } finally {
            setLoading(false);
        }
    }, [type]);

    useEffect(() => {
        fetchAccommodations();
    }, [fetchAccommodations]);

    const handleCardClick = (accommodation) => {
        setSelectedAccommodation(accommodation);
        console.log('Alojamiento seleccionado:', accommodation._id);
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedAccommodation(null);
    };

    const CustomLeftArrow = () => (
        <Button
            isIconOnly
            className="absolute z-10 transform -translate-y-1/2 left-2 top-1/2 bg-white/70 backdrop-blur-sm hover:bg-white"
            radius="full"
            size="sm"
        >
            <ChevronLeft size={18} />
        </Button>
    );

    const CustomRightArrow = () => (
        <Button
            isIconOnly
            className="absolute z-10 transform -translate-y-1/2 right-2 top-1/2 bg-white/70 backdrop-blur-sm hover:bg-white"
            radius="full"
            size="sm"
        >
            <ChevronRight size={18} />
        </Button>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Spinner size="lg" color="primary" label="Cargando alojamientos..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-600">
                {error}
            </div>
        );
    }

    if (accommodations.length === 0) {
        return (
            <div className="p-4 text-center text-gray-600">
                No hay {type === 'cabaña' ? 'cabañas' : 'habitaciones'} disponibles en este momento.
            </div>
        );
    }

    return (
        <>
            <div className="relative px-4">
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
                    containerClass="carousel-container"
                    itemClass="px-2"
                >
                    {accommodations.map((accommodation) => (
                        <Card
                            key={accommodation._id}
                            isFooterBlurred
                            className="w-full h-[400px] cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                            onClick={() => handleCardClick(accommodation)}
                        >
                            <CardHeader className="absolute z-10 top-1 flex-col !items-start bg-black/20 backdrop-blur-sm rounded-lg m-2">
                                <h4 className="text-lg font-bold text-white drop-shadow-lg">
                                    {accommodation.tipo || 'Alojamiento'} {accommodation.idAlojamiento || ''}
                                </h4>
                            </CardHeader>

                            <Image
                                removeWrapper
                                alt={accommodation.tipo || 'Alojamiento'}
                                className="z-0 object-cover w-full h-full"
                                src={
                                    accommodation?.images?.[0]?.imagePath
                                        ? `${API_BASE_URL}/uploads/${accommodation.images[0].imagePath}`
                                        : "https://res.cloudinary.com/dbipj114j/image/upload/v1750868376/WhatsApp-Image-2024-09-18-at-5.19.20-PM-4-scaled_avfjhf.jpg"
                                }
                            />

                            <CardFooter className="absolute bottom-0 z-10 justify-between bg-white/90 backdrop-blur-md border-t-1 border-zinc-100/50">
                                <div className="flex flex-col flex-1 gap-1">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Users size={16} />
                                        <span className="text-sm font-medium">
                                            {accommodation.capacidad || 0} persona{accommodation.capacidad > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    {accommodation.description && (
                                        <p className="text-xs text-gray-600 line-clamp-2">
                                            {accommodation.description}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    color="primary"
                                    size="sm"
                                    className="ml-2 font-semibold"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCardClick(accommodation);
                                    }}
                                >
                                    Ver Detalles
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </Carousel>
            </div>

            {selectedAccommodation && (
                <AccDetail
                    isOpen={showDetail}
                    onClose={handleCloseDetail}
                    accommodationId={selectedAccommodation._id}
                />
            )}
        </>
    );
}

export default AccCard;