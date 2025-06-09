import axios from 'axios';
const API_URL = 'http://localhost:3000/servicio';

class ServiceService {
    async fetchServices() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching services:', error);
            throw error;
        }
    }

    async addService(data) {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (error) {
            console.error('Error adding service:', error);
            throw error;
        }
    }

    async editService(data) {
        try {
            const response = await axios.put(API_URL, data);
            return response.data;
        } catch (error) {
            console.error('Error editing service:', error);
            throw error;
        }
    }

    async deleteService(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting service:', error);
            throw error;
        }
    }
}

export default ServiceService;
