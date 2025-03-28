import Dashboard from "@/pages/dashboard";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import { Navigate } from "react-router";

const routes = [
	{
		path: "/",
		element: <Navigate to="/signin" />,
	},
	{
		path: "signin",
		element: <SignIn />,
	},
	{
		path: "signup",
		element: <SignUp />,
	},
	{
		path: "dashboard",
		element: <Dashboard />,
	},
];

export default routes;
