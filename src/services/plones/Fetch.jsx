import axios from "axios";

const API_URL = "http://localhost:3000/plan";

class PlanService {
    async fetchPlans() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching plans:", error);
            throw error;
        }
    }

    async addPlan(data) {
        try {
            const response = await axios.post(API_URL, data);
            return response.data;
        } catch (error) {
            console.error("Error adding plan:", error);
            throw error;
        }
    }

    async editPlan(data) {
        try {
            const response = await axios.put(API_URL, data);
            return response.data;
        } catch (error) {
            console.error("Error editing plan:", error);
            throw error;
        }
    }

    async deletePlan(id) {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting plan:", error);
            throw error;
        }
    }
}

export default PlanService;
