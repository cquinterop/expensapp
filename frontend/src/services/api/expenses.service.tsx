import api from "@/lib/api";

export interface ExpensePayload {
	tenantId: string;
	status?: string;
	startDate?: string;
	endDate?: string;
	page?: number;
	limit?: number;
}

export const getExpenses = async (params: ExpensePayload) => {
	const { data: response } = await api.get("/expenses", { params });

	return response;
};

export const createExpense = async (data: object) => {
	const { data: response } = await api.post("/expenses", data);

	return response;
};

export const approveExpense = async (id: string) => {
	const { data: response } = await api.get(`/expenses/${id}/approve`);

	return response;
};

export const rejectExpense = async (id: string) => {
	const { data: response } = await api.get(`/expenses/${id}/reject`);

	return response;
};
