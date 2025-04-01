import Dashboard from "@/pages/dashboard";
import NotFoundPage from "@/pages/not-found";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import { Navigate } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
	{
		path: "/signin",
		element: <SignIn />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
	{
		path: "/",
		element: <Navigate to="/signin" />,
	},
	{
		path: "/",
		element: <ProtectedRoute />,
		children: [
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
		],
    },
	{
		path: "*",
		element: <NotFoundPage />,
	},
];

export default routes;
