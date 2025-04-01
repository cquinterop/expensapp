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
import { toast } from "sonner";

const FormSchema = z.object({
	status: z.string({
		required_error: "Please select an email to display.",
	}),
});

const ExpenseFilter = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}
	/*
	const [filters, setFilters] = useState({
		status: "",
		startDate: null as Date | null,
		endDate: null as Date | null,
		page: 1,
		perPage: 10,
	}); */

	// Use stable callbacks for state updates
	/* 	const handleStatusChange = useCallback((status: string) => {
		setFilters((prev) => ({ ...prev, status, page: 1 }));
	}, []);

	const handleStartDateChange = useCallback((date: Date | null) => {
		setFilters((prev) => ({ ...prev, startDate: date, page: 1 }));
	}, []);

	const handleEndDateChange = useCallback((date: Date | null) => {
		setFilters((prev) => ({ ...prev, endDate: date, page: 1 }));
	}, []); */

	return (
		/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div>
					<Label htmlFor="statusFilter" className="text-sm font-medium">
						Status
					</Label>
					<Select
						id="statusFilter"
						value={filters.status}
						onValueChange={handleStatusChange}
					>
						<SelectTrigger>
							<SelectValue placeholder="All statuses" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="pending">Pending</SelectItem>
							<SelectItem value="approved">Approved</SelectItem>
							<SelectItem value="rejected">Rejected</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="startDate" className="text-sm font-medium">
						Start Date
					</Label>
					<DatePicker
						id="startDate"
						selected={filters.startDate}
						onSelect={handleStartDateChange}
						placeholderText="Select start date"
					/>
				</div>
				<div>
					<Label htmlFor="endDate" className="text-sm font-medium">
						End Date
					</Label>
					<DatePicker
						id="endDate"
						selected={filters.endDate}
						onSelect={handleEndDateChange}
						placeholderText="Select end date"
					/>
				</div>
			</div>
		</> */
		/* <Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex">
				<FormField
					control={form.control}
					name="dob"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Start Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										today={new Date()}
										defaultMonth={new Date()}
										disabled={(date) =>
											date > new Date() || date < new Date("1900-01-01")
										}
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/> */
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
				<FormField
					control={form.control}

					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue defaultValue="All" />
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
			</form>
		</Form>
	);
};

export default ExpenseFilter;
