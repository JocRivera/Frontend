// api/reservationsApi.js
import axios from "axios";

export const fetchReservations = async () => {
    try {
        const response = await axios.get("http://localhost:3000/reserva");
        return response.data;
    } catch (error) {
        console.error("Error fetching reservations:", error);
        throw error; // Re-throw the error so it can be handled in the component
    }
};