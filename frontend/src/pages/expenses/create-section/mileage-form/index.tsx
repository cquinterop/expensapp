import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { mileageExpenseSchema } from "../schema";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

interface MileageFormProps {
	form: UseFormReturn<z.input<typeof mileageExpenseSchema>>;
}

const MileageForm = ({ form }: Readonly<MileageFormProps>) => {
	return (
		<>
			<FormField
				control={form.control}
				name="distanceKm"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Distance (km)</FormLabel>
						<FormControl>
							<Input type="number" placeholder="0.0" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="ratePerKm"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Rate per km (€)</FormLabel>
						<FormControl>
							<Input type="number" placeholder="0.30" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};

export default MileageForm;
