import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ redirectPath = ROUTES.SIGNIN }) => {
	const { user } = useAuth();

	if (user?.role) {
		return <Outlet />;
	}

	return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
