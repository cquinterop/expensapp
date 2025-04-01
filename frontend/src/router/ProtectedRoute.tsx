import { Navigate, Outlet } from "react-router";


const ProtectedRoute = ({ redirectPath = "/" }) => {
	if (localStorage.getItem("user")) {
		return <Outlet />;
  }

	return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
