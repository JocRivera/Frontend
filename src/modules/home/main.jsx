import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Video from "../../utilities/home/video/video_widget";
import Cardcomponent from "../../utilities/home/card/cardComponent";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Home() {
    return (
        <div className="settings-container ">
            <Card className="py-4">
                <CardBody className="py-2 overflow-visible">
                    <div className="mb-10">
                        <Video />
                    </div>
                    <div className="grid grid-cols-3 gap-6 mx-auto">
                        <Cardcomponent />
                        <Cardcomponent />
                        <Cardcomponent />
                        <Cardcomponent />
                        <Cardcomponent />
                        <Cardcomponent />
                        <Cardcomponent />
                        <Cardcomponent />
                        <Cardcomponent />
                    </div>

                </CardBody>
            </Card>
        </div>

    );
}