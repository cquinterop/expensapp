import { ExpenseList } from "@/pages/expenses/table-section/expense-list";
import ExpenseFilter from "@/pages/expenses/expense-filter";
import HeaderSection from "@/pages/expenses/header-section";
import LayoutPage from "@/components/layout";
import ErrorBoundary from "@/components/shared/error";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";

const ExpensesPage = () => {
	return (
		<LayoutPage>
			<HeaderSection />
			<ExpenseFilter />
			<ErrorBoundary>
				<Suspense fallback={<Spinner />}>
					<ExpenseList />
				</Suspense>
			</ErrorBoundary>
		</LayoutPage>
	);
};

export default ExpensesPage;
