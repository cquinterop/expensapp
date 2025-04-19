import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const HeroSection = () => {
	return (
		<section className="w-full my-8 py-12">
			<div className="mx-auto flex flex-col-reverse items-center gap-12 lg:flex-row lg:items-center">
				<div className="space-y-6 text-center lg:text-left">
					<h1 className="text-5xl font-fira font-bold tracking-tight text-gray-900">
						Welcome to <span className="text-[#ff355e]">expensapp</span>
					</h1>
					<p className="text-lg text-gray-600">
						Effortlessly manage your team’s expenses in one place. Multi-tenant.
						Simple. Powerful.
					</p>
					<Link to="/signin">
						<Button
							size="lg"
							className="rounded-full bg-[#ff355e] hover:bg-[#ff355e]/85 cursor-pointer"
						>
							Get Started <ArrowRight className="h-5 w-5" />
						</Button>
					</Link>
				</div>
				<img
					src="/expensapp.png"
					alt="Expense illustration"
					width={700}
					height={400}
					className="mx-auto hidden lg:block"
				/>
			</div>
		</section>
	);
};

export default HeroSection;
