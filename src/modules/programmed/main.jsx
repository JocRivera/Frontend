import React, { useState, useEffect } from "react";
import CalendarComponent from "../../utilities/plains/Calendar";

export default function ProgrammedManagement() {
    const [programmed, setProgrammed] = useState([]);

    // Simulate fetching programmed data
    useEffect(() => {
        const fetchData = async () => {
            // Replace with actual fetch logic
            const data = await new Promise((resolve) =>
                setTimeout(() => resolve([{ id: 1, name: "Programmed Item 1" }]), 1000)
            );
            setProgrammed(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            <CalendarComponent events={programmed.map(item => ({
                start: new Date(),
                end: new Date(new Date().getTime() + 3600000), // 1 hour later
                title: item.name
            }))} />
        </div>
    );
}