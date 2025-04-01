import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ExpenseList } from "@/pages/dashboard/expense-list";
import { getCurrentUser, getExpenses } from "@/lib/api";
import { useNavigate } from "react-router";
import BasePagination from "./base-pagination";
import ExpenseFilter from "./expense-filter";

interface User {
	id: string;
	full_name: string;
	role: string;
	tenant: {
		name: string;
	};
}

export default function Dashboard() {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [expenses, setExpenses] = useState<Expense[]>([]);
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
		const fetchUser = async () => {
			try {
				setLoading(true);
				const response = await getCurrentUser();
				setUser(response.data);
			} catch (error) {
				console.error("Error fetching user:", error);
				navigate("/");
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, [navigate]);



	useEffect(() => {
		const fetchExpenses = async () => {
			setLoading(true);

			try {
				const params: any = {
					page: filters.page,
					limit: filters.perPage,
				};

				if (filters.status) params.status = filters.status;
				if (filters.startDate) params.startDate = filters.startDate.toISOString();
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
			<div className="flex items-center justify-center mx-auto min-h-screen">
				Loading...
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center">
			<div className="container h-[var(--header-height) - 100vh] mx-auto px-6 py-16">
				<div className="flex justify-between items-center mb-8">
					<div>
						<h1 className="text-3xl font-bold font-fira">Expenses</h1>
						<p className="text-muted-foreground">
							Welcome {user?.fullName} ({user?.role})
						</p>
					</div>
				</div>
				<ExpenseFilter />
				<ExpenseList isAdmin={user?.role === "admin"} expenses={expenses} />
				<BasePagination pagination={pagination} setFilters={setFilters} expenses={expenses}/>
			</div>
		</div>
	);
}
