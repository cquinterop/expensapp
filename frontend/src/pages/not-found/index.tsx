import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
			<div className="w-full space-y-6 text-center">
				<div className="space-y-3">
					<h1 className="text-4xl font-bold tracking-tighter sm:text-5xl transition-transform hover:scale-110">
						404
					</h1>
					<p className="text-gray-500">Nothing to see here.</p>
					<img
						className="mx-auto my-6"
						src="https://media.tenor.com/HdCNuyIa2c4AAAAM/the-simpsons-homer-simpson.gif"
						width={300}
						alt="Hiding Homer"
					/>
				</div>
				<Button className="cursor-pointer" onClick={() => navigate(-1)}>
					Return
				</Button>
			</div>
		</div>
	);
};

export default NotFoundPage;
