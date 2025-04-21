import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import AccommodationForm from "./accommodation-form";
import TransportationForm from "./trasportation-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { travelExpenseSchema } from "../schema";
import { z } from "zod";

interface TravelFormProps {
	form: UseFormReturn<z.input<typeof travelExpenseSchema>>;
}

const types = ["accommodation", "transportation", "other"] as const;

const TravelForm = ({ form }: Readonly<TravelFormProps>) => {
	const travelSubtype = form.watch("travelSubtype");

	return (
		<>
			<FormField
				control={form.control}
				name="travelSubtype"
				render={({ field }) => (
					<FormItem className="space-y-2">
						<FormLabel>Travel Type</FormLabel>
						<FormControl>
							<Select value={field.value} onValueChange={field.onChange}>
								<SelectTrigger className="w-full capitalize">
									<SelectValue placeholder="Select a travel type" />
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
				name="amount"
				render={({ field }) => (
					<FormItem className="space-y-2">
						<FormLabel>Amount (€)</FormLabel>
						<FormControl>
							<Input type="number" placeholder="0.00" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			{travelSubtype === "accommodation" && (
				<AccommodationForm form={form as TravelFormProps["form"]} />
			)}

			{travelSubtype === "transportation" && (
				<TransportationForm form={form as TravelFormProps["form"]} />
			)}
		</>
	);
};

export default TravelForm;
