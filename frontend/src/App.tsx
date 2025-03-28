import { Outlet } from "react-router";

export default function App() {
	return (
		<div className="bg-gray-200 flex items-center justify-center min-h-screen">
			<Outlet />
		</div>
	);
};
