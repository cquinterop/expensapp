import axios from "axios";
import { cache } from "react";

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
	tenantName: string;
	fullName: string;
	email: string;
	password: string;
}) => {
	return api.post("/auth/signup", data);
};

export const logout = () => {
	return api.post("/auth/logout");
};

export const getCurrentUser = () => {
	return api.get("/auth/me");
};

// Expenses API
export const getExpenses = (params: {
	tenantId: string;
	status?: string;
	startDate?: string;
	endDate?: string;
	page?: number;
	limit?: number;
}) => {
	return api.get("/expenses", { params });
};

export const getExpenseReport = async () => {
	const { data } = await api.get("/reports/expenses");

	return data;
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
