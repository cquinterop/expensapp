import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { getExpenses } from "@/lib/api";
import ExpenseActions from "@/pages/dashboard/expense-actions";
import ExpenseDetail from "@/pages/dashboard/expense-detail";
import { Button } from "@/components/ui/button";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

interface Expense {
	id: string;
	description: string;
	amount: number;
	status: string;
	expenseType: string;
	submittedAt: string;
	user: {
		fullName: string;
	};
	regularExpense?: {
		receiptUrl: string;
	};
	travelExpense?: {
		travelSubtype: string;
		startDate: string;
		endDate: string;
		accommodationDetail?: {
			hotelName: string;
			check_in_date: string;
			checkOutDate: string;
		};
		transportationDetail?: {
			transportationMode: string;
			route: string;
		};
	};
	mileageExpense?: {
		distanceKm: number;
		ratePerKm: number;
	};
}

interface ExpenseListProps {
	isAdmin: boolean;
}

export function ExpenseList({ isAdmin, expenses }) {
	const COLUMNS = [
		"",
		"Description",
		"Type",
		"Submitted By",
		"Submitted At",
		"Amount",
		"Status",
		"Action",
	];

	const STATUS_STYLES = {
		pending: "bg-yellow-100 text-yellow-800 dark:text-black",
		approved: "bg-green-100 text-green-800 dark:text-black",
		rejected: "bg-red-100 text-red-800 dark:text-black",
	};

	// Use useCallback to prevent unnecessary re-renders

	if (!expenses.length) {
		return <div className="text-center py-10">No expenses found</div>;
	}

	return (
		<div className="space-y-4">
			<Table className="w-full">
				<TableHeader>
					<TableRow>
						{COLUMNS.map((key) => (
							<TableHead key={key}>{key}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{expenses.map((expense) => (
						<Collapsible key={expense.id} asChild>
							<>
								<TableRow>
									<TableCell>
										<CollapsibleTrigger asChild>
											<Button
												className="cursor-pointer"
												variant="ghost"
												size="sm"
											>
												<ChevronsUpDown className="h-4 w-4" />
												<span className="sr-only">Toggle</span>
											</Button>
										</CollapsibleTrigger>
									</TableCell>
									<TableCell>{expense.description}</TableCell>
									<TableCell className="capitalize">
										{expense.expenseType}
									</TableCell>
									<TableCell>{expense.user.fullName}</TableCell>
									<TableCell>
										{format(new Date(expense.submittedAt), "PPp")}
									</TableCell>
									<TableCell>€{expense.amount.toFixed(2)}</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={`capitalize ${STATUS_STYLES[expense.status]}`}
										>
											{expense.status}
										</Badge>
									</TableCell>
									<TableCell>
										{isAdmin && <ExpenseActions expense={expense} />}
									</TableCell>
								</TableRow>
								<CollapsibleContent asChild>
									<TableRow>
										<TableCell
											colSpan={COLUMNS.length}
											className="bg-gray-50 px-16 py-4"
										>
											<ExpenseDetail expense={expense} />
										</TableCell>
									</TableRow>
								</CollapsibleContent>
							</>
						</Collapsible>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
