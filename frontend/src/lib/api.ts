import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
	baseURL: `${API_URL}/api`,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

// Auth API
export const login = (data: {
	email: string;
	password: string;
}) => {
	return api.post("/auth/login", data);
};

export const signup = (data: {
	tenant_name: string;
	email: string;
	password: string;
	first_name: string;
	last_name: string;
	is_first_user: boolean;
}) => {
	return api.post("/signup", data);
};

export const logout = () => {
	return api.delete("/logout");
};

export const getCurrentUser = () => {
	return api.get("/me");
};

// Expenses API
export const getExpenses = (params: {
	status?: string;
	start_date?: string;
	end_date?: string;
	page?: number;
	per_page?: number;
}) => {
	return api.get("/expenses", { params });
};

export const createExpense = (data: any) => {
	return api.post("/expenses", data);
};

export const approveExpense = (id: string) => {
	return api.patch(`/expenses/${id}/approve`);
};

export const rejectExpense = (id: string) => {
	return api.patch(`/expenses/${id}/reject`);
};

export default api;
