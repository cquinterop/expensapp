import { useSuspenseQuery } from "@tanstack/react-query";
import ExpenseSummaryCharts from "@/pages/dashboard/charts-section/expense-summary-charts";
import ExpenseStatusChart from "@/pages/dashboard/charts-section/expense-status-chart";
import ExpenseTypeChart from "@/pages/dashboard/charts-section/expense-type-chart";
import EmptyState from "@/components/ui/empty-state";
import { getExpenseReport } from "@/services/api/report.service";

interface ReportData {
	summary: {
		[key: string]: {
			expenses: string;
			amount: number;
		};
	};
	expenses: {
		id: string;
		expenseType: string;
		amount: number;
	}[];
}

const ChartSection = () => {
	const { data }: { data: ReportData } = useSuspenseQuery({
		queryKey: ["expenses"],
		queryFn: getExpenseReport,
	});

	if (!data) {
		return <EmptyState />;
	}

	return (
		<>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
				<ExpenseSummaryCharts data={data.summary} />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<ExpenseStatusChart data={data.summary} />
				<ExpenseTypeChart expenses={data.expenses} />
			</div>
		</>
	);
};

export default ChartSection;
