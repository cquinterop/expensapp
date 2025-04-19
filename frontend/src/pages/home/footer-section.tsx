import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const FooterSection = () => {
	return (
		<footer className="w-full my-12 pb-16">
			<h2 className="text-3xl font-semibold text-gray-900 mb-6 font-fira">
				Start managing expenses smarter
			</h2>
			<p className="text-lg text-gray-600 mb-6">Try it out. It's free!</p>
			<Link to="/signup">
				<Button
					size="lg"
					className="rounded-full bg-[#ff355e] hover:bg-[#ff355e]/85 cursor-pointer"
				>
					Create Account <ArrowRight className="h-5 w-5" />
				</Button>
			</Link>
		</footer>
	);
};

export default FooterSection;
