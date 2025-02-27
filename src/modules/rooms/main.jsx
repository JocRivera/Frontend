import React, { useState } from 'react';
import AccommodationCard from "../../utilities/accommodation/accommodationCard";
import CabinForm from '../../utilities/forms/cabins/CabinForm';

export default function RoomsManagement() {
    const [cabins, setCabins] = useState([
        {
            id: 1,
            name: "Room 1",
            capacity: 5,
            description: "Cabin 1 description",
            price: "50",
            image: "https://hosterialoslagos.com/wp-content/uploads/2024/09/IMG_4055-scaled.jpg",
            status: "active",
        },
        {
            id: 2,
            name: "Room 2",
            capacity: 5,
            description: "Cabin 2 description",
            price: "25",
            image: "https://hosterialoslagos.com/wp-content/uploads/2025/02/DSC00509-scaled.jpg",
            status: "active",
        },
        {
            id: 3,
            name: "Room 3",
            capacity: 5,
            description: "Cabin 3 description",
            price: "25",
            image: "https://hosterialoslagos.com/wp-content/uploads/elementor/thumbs/WhatsApp-Image-2025-02-25-at-12.13.23-PM-scaled-r21bhhcfd6xjb2dx4pv6rb88mpyuhebji8y7901zsg.jpeg",
            status: "active",
        },
        {
            id: 4,
            name: "Room 4",
            capacity: 5,
            description: "Cabin 4 description",
            price: "25",
            image: "https://hosterialoslagos.com/wp-content/uploads/2025/02/WhatsApp-Image-2025-02-25-at-12.13.23-PM-1-2048x1062.jpeg",
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

    const handleDeleteCabin = (id) => {
        setCabins(cabins.filter(cabin => cabin.id !== id));
    }

    const handleUpdateCabin = (data) => {
        setCabins(cabins.map(cabin => cabin.id === data.id ? data : cabin));
        console.log(data);
    }

    return (
        <div>
            <AccommodationCard deleteAccommodation={handleDeleteCabin} editAccommodation={handleUpdateCabin} data={cabins} size="3xl" formId="cabin-form" Dynamic={(onClose, data, onEdit) => (
                <CabinForm
                    onSubmit={(data) => {
                        handleAddCabin(data);
                    }}
                    onClose={onClose}
                    initialData={data}
                    onEdit={onEdit}
                />
            )} />
        </div>
    );

}