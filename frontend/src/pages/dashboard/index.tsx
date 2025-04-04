import HeaderSection from "@/pages/dashboard/header-section";
import ChartsSection from "@/pages/dashboard/charts-section";
import Spinner from "@/components/ui/spinner";
import { Suspense } from "react";
import ErrorFallback from "@/components/ui/error";

const ReportsDashboard = () => {
	return (
		<>
			<HeaderSection />
			<Suspense fallback={<Spinner />}>
				<ErrorFallback>
					<ChartsSection />
				</ErrorFallback>
			</Suspense>
		</>
	);
};

export default ReportsDashboard;
