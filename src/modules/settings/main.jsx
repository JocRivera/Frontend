import React from "react";
import { CircularProgress } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

export default function SettingsManagement() {
    return (
        <div className="settings-container">
            <Card className="py-4">
                <CardBody className="py-2 overflow-visible">
                    <CircularProgress label="Loading..."
                        className="m-auto"
                    />
                </CardBody>
            </Card>
        </div>

    );
}