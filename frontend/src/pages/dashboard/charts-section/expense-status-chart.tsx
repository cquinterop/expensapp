import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	PieChart,
	Pie,
	Cell,
	ResponsiveContainer,
	Legend,
	Tooltip,
} from "recharts";

interface ExpenseStatusChartProps {
	data?: {
		[key: string]: {
			amount: number;
			expenses: string;
		};
	};
}

const COLORS = ["#ff355e", "#798897", "#865a67"];

const ExpenseStatusChart = ({ data }: ExpenseStatusChartProps) => {
	if (!data) {
		return (
			<div className="h-[300px] w-full flex items-center justify-center">
				No expense data available
			</div>
		);
	}

	const chartData = [
		{
			name: "Approved",
			value: data?.approved.expenses,
			count: data?.approved.amount,
		},
		{
			name: "Pending",
			value: data?.pending.expenses,
			count: data?.pending.amount,
		},
		{
			name: "Rejected",
			value: data?.rejected.expenses,
			count: data?.rejected.amount,
		},
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Expenses by Status</CardTitle>
			</CardHeader>
			<CardContent className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={chartData}
							cx="50%"
							cy="50%"
							labelLine={false}
							outerRadius={80}
							fill="#8884d8"
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

export default ExpenseStatusChart;
