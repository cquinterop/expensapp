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

interface TransportationFormProps {
	form: UseFormReturn<z.input<typeof travelExpenseSchema>>;
}

const TransportationForm = ({ form }: Readonly<TransportationFormProps>) => {
	return (
		<>
			<FormField
				control={form.control}
				name="transportationMode"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Transportation Mode</FormLabel>
						<FormControl>
							<Input placeholder="Flight, Train, Bus, etc." {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="route"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Route</FormLabel>
						<FormControl>
							<Input placeholder="From - To" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};

export default TransportationForm;
