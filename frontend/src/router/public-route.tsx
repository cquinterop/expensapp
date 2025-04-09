import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const PublicRoute = ({ redirectPath = ROUTES.EXPENSES }) => {
	const { user } = useAuth();

	if (user?.role) {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};

export default PublicRoute;
