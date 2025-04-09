import Expenses from "@/pages/expenses";
import Dashboard from "@/pages/dashboard";
import NotFoundPage from "@/pages/not-found";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import { Navigate } from "react-router";
import PublicRoute from "@/router/public-route";
import ProtectedRoute from "@/router/protected-route";
import PrivateRoute from "@/router/private-route";
import { ROUTES } from "@/constants/routes";

const routes = [
	{
		path: "/",
		element: <Navigate to={ROUTES.EXPENSES} />,
	},
	{
		path: "/",
		element: <PublicRoute />,
		children: [
			{ path: ROUTES.SIGNIN, element: <SignIn /> },
			{ path: ROUTES.SIGNUP, element: <SignUp /> },
		],
	},
	{
		path: "/",
		element: <ProtectedRoute />,
		children: [{ path: ROUTES.EXPENSES, element: <Expenses /> }],
	},
	{
		path: "/",
		element: <PrivateRoute />,
		children: [{ path: ROUTES.DASHBOARD, element: <Dashboard /> }],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
];

export default routes;
