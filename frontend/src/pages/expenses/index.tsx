import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExpenseList } from "@/pages/expenses/table-section/expense-list";
import { getExpenses } from "@/services/api/expenses.service";
import BasePagination from "./table-section/base-pagination";
import ExpenseFilter from "./expense-filter";
import { Factory } from "lucide-react";
import LayoutPage from "@/components/layout";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/ui/spinner";

const ExpensesPage = () => {
	const { user } = useAuth();
	const [expenses, setExpenses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState({
		status: "",
		startDate: null as Date | null,
		endDate: null as Date | null,
		page: 1,
		perPage: 10,
	});
	const [pagination, setPagination] = useState({
		totalPages: 1,
		currentPage: 1,
		totalCount: 0,
	});

	useEffect(() => {
		const fetchExpenses = async () => {
			setLoading(true);

			try {
				const params: any = {
					page: filters.page,
					limit: filters.perPage,
				};

				if (filters.status) params.status = filters.status;
				if (filters.startDate)
					params.startDate = filters.startDate.toISOString();
				if (filters.endDate) params.endDate = filters.endDate.toISOString();

				const response = await getExpenses(params);
				const data = response.data;

				setExpenses(data.expenses);
				setPagination({
					totalPages: data.totalPages,
					currentPage: data.page,
					totalCount: data.total,
				});
			} catch (error) {
				console.error("Error fetching expenses:", error);
				toast.error("Error", { description: "Failed to fetch expenses" });
			} finally {
				setLoading(false);
			}
		};

		fetchExpenses();
	}, [filters]);

	if (loading) {
		return (
			<Spinner />
		);
	}

	return (
		<LayoutPage>
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-bold font-fira flex gap-3 items-center">
						<Factory /> {user?.tenantName}
					</h1>
					<p className="text-muted-foreground">
						Welcome {user?.fullName} ({user?.role})
					</p>
				</div>
			</div>
			<ExpenseFilter />
			<ExpenseList isAdmin={user?.role === "admin"} expenses={expenses} />
			<BasePagination
				pagination={pagination}
				setFilters={setFilters}
				expenses={expenses}
			/>
		</LayoutPage>
	);
};

export default ExpensesPage;
