import ModeToggle from "@/components/ui/mode-toggle";
import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { signout } from "@/services/api/auth.service";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";

const Header = () => {
	const navigate = useNavigate();
	const { user, setUser } = useAuth();

	const handleSignout = async () => {
		try {
			await signout();

			navigate(ROUTES.SIGNIN);
			setUser(null);
		} catch (error) {
			console.error("Logout error:", error);
			toast.error("Error", { description: "Failed to logout" });
		}
	};

	if (!user) {
		return null;
	}

	return (
		<header className="container border-b border-b-gray-200 mx-auto flex h-14 justify-between px-6">
			<nav className="flex items-center gap-6">
				<Link to="/" className="text-2xl text-[#ff355e] font-bold font-fira">
					expensapp
				</Link>
				<Link to="/expenses">Expenses</Link>
				{user?.role === "admin" && <Link to="/dashboard">Dashboard</Link>}
			</nav>
			<div className="flex items-center gap-2">
				<ModeToggle />
				<Button
					variant="ghost"
					className="cursor-pointer"
					onClick={() => handleSignout()}
				>
					<LogOut />
					<span className="sr-only">Signout</span>
				</Button>
			</div>
		</header>
	);
};

export default Header;
