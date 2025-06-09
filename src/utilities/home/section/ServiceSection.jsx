import React, { useRef, useEffect, useState } from 'react';
import {
    UtensilsCrossed,
    Fish,
    Flower,
    Heart,
    Wifi,
    Coffee,
    Bed,
    Martini
} from "lucide-react";
import ServiceService from '../../../services/services/fetch';

export default function ServiceSection() {
    const [services, setServices] = useState([]);
    const serviceService = new ServiceService();
    const trackRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await serviceService.fetchServices();
                setServices(response.length > 0 ? response : defaultServices);
            } catch (error) {
                console.error("Error fetching services:", error);
                setServices(defaultServices);
            }
        };
        fetchServices();
    }, []);

    // Efecto de scroll infinito
    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        // Duplicamos el contenido para el efecto infinito
        content.innerHTML = content.innerHTML + content.innerHTML;

        let animationId;
        let speed = 1;
        let position = 0;

        const animate = () => {
            position -= speed;
            if (position <= -content.scrollWidth / 2) {
                position = 0;
            }
            content.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [services]);

    // Mapeo de iconos
    const iconsService = {
        "Desayuno": <UtensilsCrossed className="mb-5 text-4xl text-blue-600 transition-transform duration-300 sm:text-5xl group-hover:scale-110" />,
        "Almuerzo": <UtensilsCrossed className="mb-5 text-4xl text-blue-600 transition-transform duration-300 sm:text-5xl group-hover:scale-110" />,
        "Cena": <UtensilsCrossed className="mb-5 text-4xl text-blue-600 transition-transform duration-300 sm:text-5xl group-hover:scale-110" />,
        "Refrigerio": <Coffee className="mb-5 text-4xl text-blue-600 transition-transform duration-300 sm:text-5xl group-hover:scale-110" />,
        "Spa": <Flower className="mb-5 text-4xl text-blue-600 transition-transform duration-300 sm:text-5xl group-hover:scale-110" />,
        "Cena romantica": <Heart className="mb-5 text-4xl text-blue-600 transition-transform duration-300 sm:text-5xl group-hover:scale-110" />,
        "Coctel de bienvenida": <Martini className="mb-5 text-4xl text-blue-600 transition-transform duration-300 sm:text-5xl group-hover:scale-110" />,
        "Pezca": <Fish className="mb-5 text-4xl text-blue-600 transition-transform duration-300 sm:text-5xl group-hover:scale-110" />,
    };

    return (
        <section className="relative z-10 px-6 py-16 mx-4 my-8 overflow-hidden shadow-lg sm:px-8 lg:px-10 rounded-2xl">
            <div className="relative mb-8 -mt-8 text-center">
                <h2 className="pb-2 text-3xl font-bold sm:text-4xl">
                    Nuestros Servicios <span className="font-bold text-blue-600">Exclusivos</span>
                </h2>
                <div className="absolute bottom-0 w-32 h-1 transform -translate-x-1/2 bg-blue-600 rounded-full left-1/2"></div>
            </div>

            {/* Track del carrusel */}
            <div
                ref={trackRef}
                className="w-full overflow-hidden relative py-5 hover:[&>div]:pause"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 150px, black calc(100% - 150px), transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 150px, black calc(100% - 150px), transparent)'
                }}
            >
                {/* Contenido en movimiento */}
                <div
                    ref={contentRef}
                    className="flex will-change-transform"
                >
                    {services.map((service, index) => (
                        <div
                            key={`${service.id}-${index}`}
                            className="group min-w-[300px] lg:min-w-[300px] md:min-w-[280px] sm:min-w-[240px] xs:min-w-[220px] bg-gray-300 rounded-xl p-6 sm:p-8 mx-5 sm:mx-4 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 flex-shrink-0 relative overflow-hidden z-10"
                        >
                            {/* Icono */}
                            <div className="service-icon-container">
                                {iconsService[service.name] || <UtensilsCrossed className="mb-5 text-4xl text-blue-600 transition-transform duration-300 sm:text-5xl group-hover:scale-110" />}
                            </div>

                            {/* Nombre del servicio */}
                            <h3 className="relative mb-4 text-xl font-semibold text-center text-black sm:text-2xl">
                                {service.name}
                            </h3>

                            {/* Descripción */}
                            <p className="max-w-xs mb-4 text-base leading-relaxed text-center text-gray-600 sm:text-lg">
                                {service.descripcion}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Estilos CSS adicionales para el gradiente en los bordes */}
            <style jsx>{`
                @media (max-width: 640px) {
                    .group {
                        min-width: 220px;
                        padding: 1rem 0.75rem;
                        margin: 0 0.625rem;
                    }
                }
                @media (max-width: 768px) {
                    .service-icon-container svg {
                        font-size: 2.2rem;
                        margin-bottom: 0.9375rem;
                    }
                    .group h3 {
                        font-size: 1.1rem;
                    }
                    .group p {
                        font-size: 0.9rem;
                        max-width: 220px;
                    }
                }
            `}</style>
        </section>
    );
}