import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo } from "react";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Legend,
	Tooltip,
} from "recharts";

interface Expense {
	id: string;
	expenseType: string;
	amount: number;
}

interface ExpenseTypeChartProps {
	expenses?: Expense[];
}

const COLORS = ["#d73b89", "#9e4d9d", "#625697"];

const ExpenseTypeChart = ({ expenses = [] }: ExpenseTypeChartProps) => {
	const chartData = useMemo(() => {
		const expensesByType = Object.groupBy(
			expenses,
			({ expenseType }) => expenseType
		);

		const mappedData = Object.values(expensesByType).map((entries) => ({
			name: entries?.[0].expenseType,
			value: entries?.reduce((sum, { amount }) => sum + amount, 0) ?? 0,
			count: entries?.length ?? 0,
		}));

		return mappedData;
	}, [expenses]);

	if (!chartData.length) {
		return (
			<div className="h-[300px] w-full flex items-center justify-center">
				No expense data available
			</div>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Expenses by Type</CardTitle>
			</CardHeader>
			<CardContent className="h-[300px] w-full">
				<ResponsiveContainer className="capitalize">
					<PieChart>
						<Pie
							data={chartData}
							cx="50%"
							cy="50%"
							labelLine={false}
							outerRadius={80}
							dataKey="value"
							label={({ name, percent }) =>
								`${name}: ${(percent * 100).toFixed(0)}%`
							}
						>
							{COLORS.map((color) => (
								<Cell key={color} fill={color} />
							))}
						</Pie>
						<Tooltip
							formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]}
						/>
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default ExpenseTypeChart;
