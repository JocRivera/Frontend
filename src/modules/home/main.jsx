import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Video from "../../utilities/home/video/video_widget";

export default function Home() {
    const navigate = useNavigate();

    const handleAdminRedirect = () => {
        navigate('/dashboard');
    };
    return (
        <div className="settings-container">
            <Card className="py-4">
                <CardBody className="py-2 overflow-visible">
                    <Video />
                </CardBody>
            </Card>
        </div>

    );
}