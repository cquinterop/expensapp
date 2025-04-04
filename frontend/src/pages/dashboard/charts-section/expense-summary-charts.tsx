import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as lucide from "lucide-react";

interface ExpenseSummaryProps {
	data?: {
		[key: string]: {
			expenses: string;
			amount: number;
		};
	};
}

const renderIcon = (index: number) => {
	const icons = ['Euro', 'BanknoteArrowUp','Banknote', 'BanknoteX'] as const;
  const Icon = lucide[icons[index]];

  return <Icon />;
};

const ExpenseSummary = ({ data }: Readonly<ExpenseSummaryProps>) => {
	return (
		<>
			{Object.entries(data as ExpenseSummaryProps).map(([key, { amount, expenses }], index) => (
				<Card key={key}>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium capitalize">
							{key} Expenses
						</CardTitle>
						{renderIcon(index)}
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">${amount?.toFixed(2) ?? 0}</div>
						<p className="text-xs text-muted-foreground">
							{expenses ?? 0} in total
						</p>
					</CardContent>
				</Card>
			))}
		</>
	);
};

export default ExpenseSummary;
