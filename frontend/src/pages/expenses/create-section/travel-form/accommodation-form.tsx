import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { UseFormReturn } from "react-hook-form";
import { travelExpenseSchema } from "../schema";
import { z } from "zod";

interface AccommodationFormProps {
	form: UseFormReturn<z.input<typeof travelExpenseSchema>>;
}

const AccommodationForm = ({ form }: Readonly<AccommodationFormProps>) => {
	return (
		<>
			<FormField
				control={form.control}
				name="hotelName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Hotel Name</FormLabel>
						<FormControl>
							<Input placeholder="Overlook Hotel" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<div className="flex gap-4">
				<FormField
					control={form.control}
					name="checkInDate"
					render={({ field }) => (
						<FormItem className="flex flex-col grow">
							<FormLabel>Check-in Date</FormLabel>
							<FormControl>
								<DatePicker
									value={field.value}
									onChange={field.onChange}
									placeholder="Select check-in date"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="checkOutDate"
					render={({ field }) => (
						<FormItem className="flex flex-col grow">
							<FormLabel>Check-out Date</FormLabel>
							<DatePicker
								value={field.value}
								onChange={field.onChange}
								placeholder="Select check-out date"
							/>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</>
	);
};

export default AccommodationForm;
