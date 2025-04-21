import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import BaseForm from "@/pages/expenses/create-section/base-form";
import { useQueryState, parseAsBoolean } from "nuqs";

const ActionsSection = () => {
	const [newExpenseModal, setNewExpenseModal] = useQueryState('newExpenseModal', parseAsBoolean.withDefault(false));

	return (
		<Dialog open={newExpenseModal} onOpenChange={setNewExpenseModal}>
			<DialogTrigger asChild>
				<Button
					className="rounded-full bg-[#ff355e] hover:bg-[#ff355e]/85 cursor-pointer"
					onClick={() => setNewExpenseModal(true)}
				>
					<Plus /> New
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle>Create New Expense</DialogTitle>
				</DialogHeader>
				<BaseForm />
			</DialogContent>
		</Dialog>
	);
};

export default ActionsSection;
