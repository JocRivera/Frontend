import React from "react";
import { CircularProgress } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const handleAdminRedirect = () => {
        navigate('/dashboard');
    };
    return (
        <div className="settings-container">
            <Card className="py-4">
                <CardBody className="py-2 overflow-visible">
                    <CircularProgress label="Loading..."
                        className="m-auto"
                    />
                    <Button
                        radius="full"
                        className="text-white shadow-lg bg-gradient-to-tr from-pink-500 to-yellow-500"
                        onClick={handleAdminRedirect}
                    >
                        Go to Admin Dashboard
                    </Button>
                </CardBody>
            </Card>
        </div>

    );
}