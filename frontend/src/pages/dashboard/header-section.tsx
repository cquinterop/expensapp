import { LayoutDashboard } from "lucide-react";

const HeaderSection = () => {
	return (
		<div className="mb-8">
			<h1 className="text-3xl font-bold font-fira flex gap-3 items-center">
				<LayoutDashboard /> Dashboard
			</h1>
		</div>
	);
};

export default HeaderSection;
