import HeaderSection from "@/pages/dashboard/header-section";
import ChartsSection from "@/pages/dashboard/charts-section";
import Spinner from "@/components/ui/spinner";
import { Suspense } from "react";
import ErrorFallback from "@/components/shared/error-boundary";
import LayoutPage from "@/components/layout";

const DashboardPage = () => {
	return (
		<LayoutPage>
			<HeaderSection />
			<Suspense fallback={<Spinner />}>
				<ErrorFallback>
					<ChartsSection />
				</ErrorFallback>
			</Suspense>
		</LayoutPage>
	);
};

export default DashboardPage;
