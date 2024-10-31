import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import BarsChart from './Bars.jsx';
import LinesChart from './Lines.jsx';
import DoughnutsChart from './Doughnut.jsx';

const DashboardManagement = () => {
    return (
        <div>
            <Card className="py-4">
                <CardBody className="py-2 overflow-visible">
                    <BarsChart />
                </CardBody>
            </Card>
            <Card className="py-4 mt-4">
                <CardBody className="py-2 overflow-visible">
                    <LinesChart />
                </CardBody>
            </Card>
            <Card className="py-4 mt-4">
                <CardBody className="py-2 overflow-visible">
                    <DoughnutsChart />
                </CardBody>
            </Card>
        </div>
    );
}

export default DashboardManagement;