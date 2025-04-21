import { z } from "zod";

export const regularExpenseSchema = z.object({
	expenseType: z.literal("regular"),
	description: z.string().min(1, "Description is required"),
	amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
	receiptUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const mileageExpenseSchema = z.object({
	expenseType: z.literal("mileage"),
	description: z.string().min(1, "Description is required"),
	distanceKm: z.coerce.number().min(0.1, "Distance must be greater than 0"),
	ratePerKm: z.coerce.number().min(0.01, "Rate must be greater than 0"),
});

export const travelExpenseSchema = z.object({
  expenseType: z.literal("travel"),
	description: z.string().min(1, "Description is required"),
  amount: z.coerce.number().min(0.01, "Amount must be greater than 0"),
  travelSubtype: z.enum(["accommodation", "transportation", "other"]),
  transportationMode: z.string().min(1).optional(),
  route: z.string().min(1).optional(),
  hotelName: z.string().min(1).optional(),
  checkInDate: z.date().optional(),
  checkOutDate: z.date().optional(),
});

export const expenseFormSchema = z.discriminatedUnion("expenseType", [
	regularExpenseSchema,
	mileageExpenseSchema,
	travelExpenseSchema,
]);

export type ExpenseFormValues = z.input<typeof expenseFormSchema>;
