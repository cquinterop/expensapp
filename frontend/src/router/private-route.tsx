import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = ({ redirectPath = ROUTES.EXPENSES }) => {
	const { user } = useAuth();

	if (user?.role === "admin") {
		return <Outlet />;
	}

	return <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
