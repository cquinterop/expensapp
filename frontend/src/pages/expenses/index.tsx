import { ExpenseList } from "@/pages/expenses/table-section/expense-list";
import FilterSection from "@/pages/expenses/filter-section";
import CreateSection from "@/pages/expenses/create-section";
import HeaderSection from "@/pages/expenses/header-section";
import LayoutPage from "@/components/layout";
import ErrorBoundary from "@/components/shared/error";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";

const ExpensesPage = () => {
	return (
		<LayoutPage>
			<HeaderSection />
			<CreateSection />
			<FilterSection />
			<ErrorBoundary>
				<Suspense fallback={<Spinner />}>
					<ExpenseList />
				</Suspense>
			</ErrorBoundary>
		</LayoutPage>
	);
};

export default ExpensesPage;
