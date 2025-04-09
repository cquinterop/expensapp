import api from "@/lib/api";

export interface CurrentUserResponse {
	tenantId: string;
	email: string;
	fullName: string;
	tenantName?: string;
	role: string;
}

export const signin = async (data: {
	email: string;
	password: string;
}) => {
	const { data: response } = await api.post("/auth/signin", data);

	return response;
};

export const signup = async (data: {
	tenantName: string;
	fullName: string;
	email: string;
	password: string;
}) => {
	const { data: response } = await api.post("/auth/signup", data);

	return response;
};

export const signout = async () => {
	return await api.post("/auth/signout");
};

export const getCurrentUser = async () => {
	const { data: response } = await api.get<CurrentUserResponse>("/auth/me");

	return response;
};
