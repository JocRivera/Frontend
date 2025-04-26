import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Video from "../../utilities/home/video/video_widget";
import Cardcomponent from "../../utilities/home/card/cardComponent";
import Carousel from 'react-multi-carousel';
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
                <Card className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardBody className="w-full overflow-hidden shadow-lg h-96 rounded-xl">
                        <MapWidget />
                    </CardBody>
                </Card>

            </div>
        </div>

    );
}