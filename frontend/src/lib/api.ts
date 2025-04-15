import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
	baseURL: `${API_URL}/api`,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status !== 401) {
			toast.error(error.response.data.message);
		}

		return Promise.reject(error as Error);
	}
);

export default api;
