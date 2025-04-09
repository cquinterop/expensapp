import api from "@/lib/api";

export const getExpenseReport = async () => {
	const { data } = await api.get("/reports/expenses");

	return data;
};

