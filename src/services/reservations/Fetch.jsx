import axios from "axios";

const API_URL = "http://localhost:3000/reserva";
class ReservationService {
    async fetchReservations() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching reservations:", error);
            throw error;
        }
    }
    async addReservation(data) {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (error) {
            console.error("Error adding reservation:", error);
            throw error;
        }
    }
    async editReservation(data) {
        try {
            const response = await axios.put(API_URL, data);
            return response.data;
        } catch (error) {
            console.error("Error editing reservation:", error);
            throw error;
        }
    }
    async deleteReservation(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting reservation:", error);
            throw error;
        }
    }
}

export default ReservationService;




