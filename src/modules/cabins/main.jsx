import React, { useState } from 'react';
import AccommodationCard from "../../utilities/accommodation/accommodationCard";


export default function CabinsManagement() {
    const [cabins, setCabins] = useState([
        {
            id: 1,
            name: "Cabin 1",
            description: "Cabin 1 description",
            price: "50",
            status: "active",
        },
        {
            id: 2,
            name: "Cabin 2",
            description: "Cabin 2 description",
            price: "25",
            status: "active",
        },
        {
            id: 3,
            name: "Cabin 3",
            description: "Cabin 3 description",
            price: "25",
            status: "active",
        },
        {
            id: 4,
            name: "Cabin 4",
            description: "Cabin 4 description",
            price: "25",
            status: "active",
        }
    ]);

    return (
        <div>
            <AccommodationCard data={cabins} size="3xl" />
        </div>
    );

}