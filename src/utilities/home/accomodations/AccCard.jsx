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
            console.log('Fetched accommodations:', response);
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
            <div>
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    itemClass="px-2"
                    className='z-0'
                >
                    {accommodations.map((accommodation) => (
                        <Card
                            key={accommodation._id}
                            isFooterBlurred
                            className="h-[474px] py-4 mx-2"
                            onClick={() => handleCardClick(accommodation)}
                        >

                            <Image
                                removeWrapper
                                alt={accommodation.tipo || 'Alojamiento'}
                                className="z-0 object-cover w-full h-full scale-125 -translate-y-6"
                                src={
                                    accommodation?.images?.[0]
                                        ? accommodation.images[0]
                                        : "https://res.cloudinary.com/dbipj114j/image/upload/v1750868376/WhatsApp-Image-2024-09-18-at-5.19.20-PM-4-scaled_avfjhf.jpg"
                                }
                            />


                            <CardFooter className="absolute bottom-0 z-10 justify-between bg-white/30 border-t-1 border-zinc-100/50">
                                <div className="flex flex-col flex-1 gap-1">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Users size={16} />
                                        <span className="text-sm font-medium">
                                            {accommodation.capacidad || 0} persona{accommodation.capacidad > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-black drop-shadow-lg">
                                        {accommodation.tipo || 'Alojamiento'} {accommodation.idAlojamiento || ''}
                                    </h4>
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