import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

const reviews = [
	{
		name: "Sarah P.",
		genre: "girl",
		review:
			"Expensapp made expense tracking in my startup seamless! Love the dashboard.",
	},
	{
		name: "Mark T.",
		genre: "boy",
		review:
			"Multi-tenant support is a game changer. Managing clients separately has never been easier.",
	},
	{
		name: "Lena K.",
		genre: "girl",
		review:
			"Simple UI, powerful features. We especially love the mileage expense automation.",
	},
	{
		name: "Tom W.",
		genre: "boy",
		review:
			"Our accounting team loves Expensapp. It saved us countless hours each month.",
	},
	{
		name: "Anita D.",
		genre: "girl",
		review:
			"As an admin, the approval flow is exactly what I needed to streamline reporting.",
	},
	{
		name: "Carlos G.",
		genre: "boy",
		review: "Best expense app out there. Clean, fast, and smart!",
	},
];

const ReviewsSection = () => {
	return (
		<section className="w-full my-12">
			<h2 className="text-3xl font-semibold text-gray-900 mb-6 font-fira">
				What our users say
			</h2>
			<Carousel
				plugins={[Autoplay({ delay: 3000 })]}
				className="mx-auto max-w-xl"
			>
				<CarouselContent>
					{reviews.map((review, index) => (
						<CarouselItem key={index} className="p-6">
							<Card className="p-6 text-left shadow-sm">
								<div className="flex items-center gap-4">
									<img
										src={`https://avatar.iran.liara.run/public/${review.genre}?username=${review.name}`}
										alt={review.name}
										className="w-12 h-12 rounded-full object-cover"
									/>
									<p className="text-sm font-semibold text-gray-900">
										{review.name}
									</p>
								</div>
								<div className="flex gap-1">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className="w-4 h-4 text-yellow-400 fill-yellow-400"
										/>
									))}
								</div>
								<p className="text-gray-700 italic">“{review.review}”</p>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</section>
	);
};

export default ReviewsSection;
