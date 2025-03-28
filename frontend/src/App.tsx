import { Outlet } from "react-router";

export default function App() {
	return (
		<div className="bg-red-500 flex items-center justify-center min-h-screen">
			<Outlet />
		</div>
	);
};
