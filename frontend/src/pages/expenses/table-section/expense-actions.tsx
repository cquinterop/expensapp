import { Button } from "@/components/ui/button";
import { approveExpense, rejectExpense } from "@/services/api/expenses.service";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { hasPermission, Role } from "@/utils/auth";
import { useAuth } from "@/hooks/useAuth";
import { Expense } from "@/pages/expenses/table-section/expense-list";

interface ExpenseAction {
	expense: Expense;
}

const ExpenseActions = ({ expense }: Readonly<ExpenseAction>) => {
	const { user } = useAuth();

	const handleApprove = async (id: string) => {
		try {
			await approveExpense(id);
			toast.success("Success", {
				description: "Expense approved successfully",
			});
		} catch (error) {
			console.error("Error approving expense:", error);
			toast.error("Error", { description: "Failed to approve expense" });
		}
	};

	const handleReject = async (id: string) => {
		try {
			await rejectExpense(id);
			toast.success("Success", {
				description: "Expense rejected successfully",
			});
		} catch (error) {
			console.error("Error rejecting expense:", error);
			toast.error("Error", { description: "Failed to reject expense" });
		}
	};

	const isPending = expense.status === "pending";

	return (
		<>
			{isPending && (
				<div className="flex space-x-2">
					{hasPermission(user?.role as Role, "approve:expenses") && (
						<Button
							className="cursor-pointer"
							variant="ghost"
							size="icon"
							onClick={() => handleApprove(expense.id)}
						>
							<Check />
						</Button>
					)}
					{hasPermission(user?.role as Role, "reject:expenses") && (
						<Button
							className="cursor-pointer"
							variant="ghost"
							size="icon"
							onClick={() => handleReject(expense.id)}
						>
							<X />
						</Button>
					)}
				</div>
			)}
		</>
	);
};

export default ExpenseActions;
