import { ExpenseList } from "@/pages/expenses/table-section/expense-list";
import ExpenseFilter from "@/pages/expenses/expense-filter";
import HeaderSection from "@/pages/expenses/header-section";
import LayoutPage from "@/components/layout";
import ErrorBoundary from "@/components/shared/error-boundary";

const ExpensesPage = () => {
	return (
		<LayoutPage>
			<HeaderSection />
			<ExpenseFilter />
			<ErrorBoundary>
				<ExpenseList />
			</ErrorBoundary>
		</LayoutPage>
	);
};

export default ExpensesPage;
