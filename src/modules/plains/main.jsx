import React, { useState } from "react";
import PlainsCard from "../../utilities/plains/plainsCard";
export default function PlainsManagement() {
    const [plains, setPlains] = useState([
        {
            id: 1,
            name: "Romatico",
            description: "Description 1",
            startDate: "",
            endDate: "",
            price: 100,
            capacity: 2,
            image: "https://fincahotelwayra.com/wp-content/uploads/elementor/thumbs/CabanaVIP-qdtenuig3j064luzquyfpncbo4afdldijcgycvwihs.webp"
        },
        {
            id: 2,
            name: "Alojamiento",
            description: "Description 2",
            startDate: "",
            endDate: "",
            price: 200,
            capacity: "",
            image: "https://hosterialoslagos.com/wp-content/uploads/2025/02/DSC00620-scaled.jpg"
        },
        {
            id: 3,
            name: "Spa",
            description: "Description 3",
            startDate: "2025-02-2",
            endDate: "2025-02-27",
            price: 300,
            capacity: 1,
            image: "https://hosterialoslagos.com/wp-content/uploads/2025/02/plan-spa-masaje-relajacion-hosteria-los-lagos-barbosa-antioquia.jpg"
        },
        {
            id: 4,
            name: "Empresarial",
            description: "Description 4",
            startDate: "",
            endDate: "",
            price: 400,
            capacity: "",
            image: "https://hosterialoslagos.com/wp-content/uploads/2024/12/13136cc1-cfe7-4f75-9ea4-b09599f000a6-1024x768.jpg"
        },
        {
            id: 5,
            name: "Dia de sol",
            description: "Description 5",
            startDate: "",
            endDate: "",
            price: 500,
            capacity: ""
        }
    ]);

    return (

        <PlainsCard data={plains} />

    )
}