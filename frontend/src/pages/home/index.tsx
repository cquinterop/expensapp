import FooterSection from "@/pages/home/footer-section";
import HeroSection from "@/pages/home/hero-section";
import FeaturesSection from "@/pages/home/features-section";
import ReviewsSection from "@/pages/home/reviews-section";

const HomePage = () => {
	return (
		<main className="flex flex-col items-center max-w-6xl mx-auto gap-6 px-6">
			<HeroSection />
			<FeaturesSection />
			<ReviewsSection />
			<FooterSection />
		</main>
	);
};

export default HomePage;
