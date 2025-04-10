import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { FilterTypes, useFilterExpenses } from "@/hooks/useFilterExpenses";

const FormSchema = z.object({
	status: z.string().nullable().optional(),
	startDate: z.date().nullable().optional(),
	endDate: z.date().nullable().optional(),
});

const ExpenseFilter = () => {
	const { filters, setFilters } = useFilterExpenses();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			status: filters?.status ?? null,
			startDate: filters?.startDate ?? null,
			endDate: filters?.endDate ?? null,
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		setFilters(data as FilterTypes);
	}

	function clearForm() {
		const initialValues = {
			status: null,
			startDate: null,
			endDate: null,
		};

		setFilters(initialValues);
		form.reset(initialValues);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8 flex flex-row gap-2 w-full justify-end"
			>
				<FormField
					control={form.control}
					name="startDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="sr-only">Start Date</FormLabel>
							<FormControl>
								<DatePicker
									value={field.value ?? new Date()}
									onChange={field.onChange}
									disabledDates={(date) => {
										const today = new Date(
											new Date().setHours(23, 59, 59, 999)
										);
										return date > today;
									}}
									placeholder="Start Date"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="endDate"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="sr-only">End Date</FormLabel>
							<FormControl>
								<DatePicker
									value={field.value ?? new Date()}
									onChange={field.onChange}
									disabledDates={(date) => {
										const startDate = form.getValues("startDate");
										const today = new Date(
											new Date().setHours(23, 59, 59, 999)
										);

										return (startDate && date < startDate) || date > today;
									}}
									placeholder="End Date"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="sr-only">Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value ?? ''} value={field.value ?? ''}>
								<FormControl>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="All" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="all">All</SelectItem>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="approved">Approved</SelectItem>
									<SelectItem value="rejected">Rejected</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="cursor-pointer">
					Filter
				</Button>
				<Button
					className="cursor-pointer"
					type="button"
					variant="link"
					onClick={clearForm}
				>
					Clear Form
				</Button>
			</form>
		</Form>
	);
};

export default ExpenseFilter;
