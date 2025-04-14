import Spinner from "@/components/ui/spinner";
import {
	CurrentUserResponse,
	getCurrentUser,
} from "@/services/api/auth.service";
import { PropsWithChildren, useState, useMemo, useEffect } from "react";
import { AuthContext } from "@/providers/context/auth-context";
import { useQuery } from "@tanstack/react-query";

export default function AuthProvider({
	children,
}: Readonly<PropsWithChildren>) {
	const [user, setUser] = useState<CurrentUserResponse | null>(null);
	const value = useMemo(() => ({ user, setUser }), [user]);
	const {
		data: currentUser,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["currentUser"],
		queryFn: getCurrentUser,
		gcTime: 0,
	});

	useEffect(() => {
		if (currentUser) {
			setUser(currentUser);
		}
		if (error) {
			setUser(null);
		}
	}, [currentUser, error]);

	return (
		<AuthContext.Provider value={value}>
			{isLoading ? <Spinner /> : children}
		</AuthContext.Provider>
	);
}
