import { Button } from "@/components/ui/button";
import { approveExpense, rejectExpense } from "@/lib/api";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

const ExpenseActions = ({ expense }) => {
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

	return (
		<>
			{expense.status === "pending" && (
				<div className="flex space-x-2">
					<Button
						className="cursor-pointer"
						variant="ghost"
						size="icon"
						onClick={() => handleApprove(expense.id)}
					>
						<Check />
					</Button>
					<Button
						className="cursor-pointer"
						variant="ghost"
						size="icon"
						onClick={() => handleReject(expense.id)}
					>
						<X />
					</Button>
				</div>
			)}
		</>
	);
};

export default ExpenseActions;
