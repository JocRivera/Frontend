import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Video from "../../utilities/home/video/video_widget";
import Cardcomponent from "../../utilities/home/card/cardComponent";
import MapWidget from "../../utilities/home/map/MapWidget";
import 'react-multi-carousel/lib/styles.css';

export default function Home() {
    return (
        <div>
            <div className="py-4">
                <div className="py-2 overflow-visible">
                    <div className="mb-7">
                        <Video />
                    </div>
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold">¡Reserva ahora!</h2>
                    </div>
                    <Cardcomponent />
                    <div className="mt-4">
                        <h2 className="text-2xl font-bold">¿Cómo llegar?</h2>
                        <p className="text-gray-600">Vereda El Cortado Cortado, El Hatillo, Barbosa, Antioquia, Colombia</p>
                    </div>
                </div>
                {/* Asegurar que el Card tenga altura fija */}
                <div className="w-full h-[400px] mb-6">
                    <Card className="w-full h-full">
                        <CardBody className="p-0">
                            <MapWidget />
                        </CardBody>
                    </Card>
                </div>
            </div>
            {/* footer */}
            <footer className="py-4 text-white bg-gray-800 rounded-xl">
                <div className="container mx-auto text-center">
                    <p>&copy; Copyright 2025 | Hotel Los Lagos SPA
                    </p>
                </div>
            </footer>
        </div>
    );
}