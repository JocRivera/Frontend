import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Video from "../../utilities/home/video/video_widget";
import Cardcomponent from "../../utilities/home/card/cardComponent";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Home() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div className="settings-container ">
            <Card className="py-4">
                <CardBody className="py-2 overflow-visible">
                    <div className="mb-10">
                        <Video />
                    </div>
                    <Carousel responsive={responsive}
                        infinite={true}
                    >
                        <Cardcomponent />
                        <Cardcomponent />
                        <Cardcomponent />
                        <Cardcomponent />
                    </Carousel>

                </CardBody>
            </Card>
        </div>

    );
}