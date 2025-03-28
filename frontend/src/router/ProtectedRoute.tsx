import { Navigate, Outlet } from "react-router";


const ProtectedRoute = ({ isAllowed = true, redirectPath = "/signin" }) => {
	if (isAllowed) {
		return <Outlet />;
  }

	return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
