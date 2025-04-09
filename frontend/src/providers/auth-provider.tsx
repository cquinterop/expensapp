import Spinner from "@/components/ui/spinner";
import {
	CurrentUserResponse,
	getCurrentUser,
} from "@/services/api/auth.service";
import { PropsWithChildren, useEffect, useState, useMemo } from "react";
import { AuthContext } from "@/providers/context/auth-context";

export default function AuthProvider({
	children,
}: Readonly<PropsWithChildren>) {
	const [isLoading, setIsLoading] = useState(true);

	const [user, setUser] = useState<CurrentUserResponse | null>(null);
	const value = useMemo(() => ({ user, setUser }), [user]);

	useEffect(() => {
		const getUser = async () => {
			try {
				const currentUser = await getCurrentUser();
				setUser(currentUser);
			} catch {
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		getUser();
	}, []);

	return (
		<AuthContext.Provider value={value}>
			{isLoading ? <Spinner /> : children}
		</AuthContext.Provider>
	);
}
