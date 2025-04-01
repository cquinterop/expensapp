import ModeToggle from "@/components/ui/mode-toggle";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/api";
import { toast } from "sonner";

const Header = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();

			localStorage.removeItem("user");
			navigate("/");
		} catch (error) {
			console.error("Logout error:", error);
			toast.error("Error", { description: "Failed to logout" });
		}
	};

	return (
		<header className="container border-b-1 border-b-gray-200 mx-auto flex h-14 items-center justify-between px-6">
			<nav className="flex items-center">
				<Link to="/" className="text-2xl text-[#ff355e] font-bold font-fira">
					expensapp
				</Link>
			</nav>
			<div>
				<ModeToggle />
				{localStorage.getItem("user") && <Button
					variant="ghost"
					className="cursor-pointer"
					onClick={handleLogout}
				>
					<LogOut />
					<span className="sr-only">Logout</span>
				</Button>}
			</div>
		</header>
	);
};

export default Header;
