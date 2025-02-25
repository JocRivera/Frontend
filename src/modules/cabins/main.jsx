import React, { useState } from 'react';
import AccommodationCard from "../../utilities/accommodation/accommodationCard";
import CabinForm from '../../utilities/forms/cabins/CabinForm';

export default function CabinsManagement() {
    const [cabins, setCabins] = useState([
        {
            id: 1,
            name: "Cabin 1",
            capacity: 5,
            description: "Cabin 1 description",
            price: "50",
            image: "https://hosterialoslagos.com/wp-content/uploads/2024/09/IMG_5384-768x541.jpg",
            status: "active",
        },
        {
            id: 2,
            name: "Cabin 2",
            capacity: 5,
            description: "Cabin 2 description",
            price: "25",
            image: "https://hosterialoslagos.com/wp-content/uploads/elementor/thumbs/IMG_5388-scaled-qucg8be0s886i3twvywubxb11be90jqk2sabc4tf34.jpg",
            status: "active",
        },
        {
            id: 3,
            name: "Cabin 3",
            capacity: 5,
            description: "Cabin 3 description",
            price: "25",
            image: "https://hosterialoslagos.com/wp-content/uploads/2024/09/IMG_5391-scaled.jpg",
            status: "active",
        },
        {
            id: 4,
            name: "Cabin 4",
            capacity: 5,
            description: "Cabin 4 description",
            price: "25",
            image: "https://hosterialoslagos.com/wp-content/uploads/2024/10/WhatsApp-Image-2024-10-22-at-10.51.07-AM-2-scaled.jpeg",
            status: "active",
        }
    ]);

    const handleAddCabin = (data) => {
        const newCabin = {
            id: cabins.length + 1,
            ...data,
            status: "active",
            image: data.image ? URL.createObjectURL(data.image) : '',
        }
        setCabins([...cabins, newCabin]);
    }

    return (
        <div>
            <AccommodationCard data={cabins} size="3xl" formId="cabin-form" Dynamic={(onClose) => (
                <CabinForm onSubmit={(data) => {
                    handleAddCabin(data);
                }}
                    onClose={onClose} />
            )} />
        </div>
    );

}