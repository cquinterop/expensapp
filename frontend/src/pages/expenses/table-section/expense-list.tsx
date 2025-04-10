import { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ExpensePayload, getExpenses } from "@/services/api/expenses.service";
import ExpenseActions from "@/pages/expenses/table-section/expense-actions";
import ExpenseDetail from "@/pages/expenses/table-section/expense-detail";
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
import EmptyState from "@/components/ui/empty-state";
import { EXPENSES_PER_PAGE } from "@/constants/expenses";
import { usePagination } from "@/hooks/usePagination";
import BasePagination from "@/components/shared/base-pagination";
import { useFilterExpenses } from "@/hooks/useFilterExpenses";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Expense {
	id: string;
	description: string;
	amount: number;
	status: string;
	submitter: string;
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
} as const;

export function ExpenseList() {
	const { setPage, page } = usePagination();
	const { filters } = useFilterExpenses();

	const params = {
		page,
		limit: EXPENSES_PER_PAGE,
		...filters,
	};

	const {
		data: { expenses, ...pagination },
	} = useSuspenseQuery({
		queryKey: ["expenses", params],
		queryFn: () => getExpenses(params as ExpensePayload),
	});

	const handleChangePage = useCallback(
		(page: number) => {
			setPage(page);
		},
		[setPage]
	);

	if (!expenses.length) {
		return <EmptyState />;
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
					{expenses.map((expense: Expense) => (
						<Collapsible key={expense.id} asChild>
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
								<TableCell>{expense.submitter}</TableCell>
								<TableCell>
									{format(new Date(expense.submittedAt), "PPp")}
								</TableCell>
								<TableCell>€{expense.amount.toFixed(2)}</TableCell>
								<TableCell>
									<Badge
										variant="outline"
										className={`capitalize ${STATUS_STYLES[expense.status as keyof typeof STATUS_STYLES]}`}
									>
										{expense.status}
									</Badge>
								</TableCell>
								<TableCell>{<ExpenseActions expense={expense} />}</TableCell>
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
							</TableRow>
						</Collapsible>
					))}
				</TableBody>
			</Table>
			<BasePagination
				totalPages={pagination.totalPages}
				page={pagination.page}
				changePage={(page) => handleChangePage(page)}
			/>
		</div>
	);
}
