import { Factory } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const HeaderSection = () => {
	const { user } = useAuth();

	return (
		<div className="flex justify-between items-center mb-8">
			<div>
				<h1 className="text-3xl font-bold font-fira flex gap-3 items-center">
					<Factory /> {user?.tenantName}
				</h1>
				<p className="text-muted-foreground">
					Welcome {user?.fullName} ({user?.role})
				</p>
			</div>
		</div>
	);
};

export default HeaderSection;
