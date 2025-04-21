import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { regularExpenseSchema } from "../schema";
import { z } from "zod";

interface RegularFormProps {
	form: UseFormReturn<z.input<typeof regularExpenseSchema>>;
}

const RegularForm = ({ form }: Readonly<RegularFormProps>) => {
	return (
		<>
			<FormField
				control={form.control}
				name="amount"
				render={({ field }) => (
					<FormItem className="space-y-2">
						<FormLabel>Amount ($)</FormLabel>
						<FormControl>
							<Input type="number" step="0.01" placeholder="0.00" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="receiptUrl"
				render={({ field }) => (
					<FormItem className="space-y-2">
						<FormLabel>Receipt URL</FormLabel>
						<FormControl>
							<Input
								type="text"
								placeholder="https://example.com/receipt.pdf"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};

export default RegularForm;
