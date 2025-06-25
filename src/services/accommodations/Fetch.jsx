import axios from 'axios';

const API_URL = 'http://localhost:3000/alojamiento';

class AccommodationService {
    async fetchAccommodations() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching accommodations:', error);
            throw error;
        }
    }
    async addAccommodation(data) {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (error) {
            console.error('Error adding accommodation:', error);
            throw error;
        }
    }
    async editAccommodation(id, data) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error editing accommodation:', error);
            throw error;
        }
    }
    async deleteAccommodation(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting accommodation:', error);
            throw error;
        }
    }
    async fetchAccommodationById(id) {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            
            return response.data;
        }
        catch (error) {
            console.error('Error fetching accommodation by ID:', error);
            throw error;
        }
    }
}
export default AccommodationService;