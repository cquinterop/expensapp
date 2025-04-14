import { CurrentUserResponse } from "@/services/api/auth.service";
import { createContext, Dispatch, SetStateAction } from "react";

type User = CurrentUserResponse | null;

interface AuthContextType {
	user: User;
	setUser: Dispatch<SetStateAction<User>>;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	setUser: () => {},
});
