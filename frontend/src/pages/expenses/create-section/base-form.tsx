import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import RegularForm from "./regular-form";
import MileageForm from "./mileage-form";
import TravelForm from "./travel-form";
import { useCallback } from "react";
import { createExpense } from "@/services/api/expenses.service";
import { isAxiosError } from "axios";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm, UseFormReturn } from "react-hook-form";
import {
	expenseFormSchema,
	mileageExpenseSchema,
	regularExpenseSchema,
	travelExpenseSchema,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

type FieldsProps<T extends z.ZodTypeAny = typeof expenseFormSchema> =
	UseFormReturn<z.infer<T>>;

const types = ["regular", "mileage", "travel"] as const;

const BaseForm = () => {
	const form = useForm<z.input<typeof expenseFormSchema>>({
		resolver: zodResolver(expenseFormSchema),
		defaultValues: {
			expenseType: "regular",
		},
	});
	const [newExpenseModal, setNewExpenseModal] = useQueryState(
		"newExpenseModal",
		parseAsBoolean
	);
	const expenseType = form.watch("expenseType");
	const mutation = useMutation({
		mutationFn: createExpense,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["expenses"] });
		},
	});

	const onSubmit = useCallback(
		async (data: z.input<typeof expenseFormSchema>) => {
			console.log(data);
			try {
				await mutation.mutateAsync(data);
				setNewExpenseModal(!newExpenseModal);
			} catch (error) {
				if (!isAxiosError(error)) {
					return;
				}
				if (error.response?.data?.message) {
					form.setError("root", {
						type: error.status?.toString(),
						message: error.response?.data?.message,
					});
				}
				if (error.response?.data?.details) {
					Object.entries(error.response.data.details).forEach(
						([property, message]) => {
							form.setError(
								property as keyof z.input<typeof expenseFormSchema>,
								{
									type: "server",
									message: message as string,
								}
							);
						}
					);
				}
			}
		},
		[newExpenseModal, form, setNewExpenseModal, mutation]
	);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex gap-6 flex-col my-4"
			>
				<FormField
					control={form.control}
					name="expenseType"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Expense Type</FormLabel>
							<FormControl>
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger className="w-full capitalize">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{types.map(
												(type) =>
													!!type && (
														<SelectItem
															key={type}
															value={type}
															className="capitalize"
														>
															{type}
														</SelectItem>
													)
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="space-y-2">
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter expense description"
									value={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{expenseType === "regular" && (
					<RegularForm
						form={form as FieldsProps<typeof regularExpenseSchema>}
					/>
				)}

				{expenseType === "mileage" && (
					<MileageForm
						form={form as FieldsProps<typeof mileageExpenseSchema>}
					/>
				)}

				{expenseType === "travel" && (
					<TravelForm form={form as FieldsProps<typeof travelExpenseSchema>} />
				)}

				<Button
					type="submit"
					className="rounded-full bg-[#ff355e] hover:bg-[#ff355e]/85 cursor-pointer"
				>
					Create
				</Button>
			</form>
		</Form>
	);
};

export default BaseForm;
