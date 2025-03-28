import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

const signInSchema = z.object({
	company: z.string().min(2, { message: "Company name is required" }),
	fullName: z.string().min(2, { message: "Full name is required" }),
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" }),
});

const inputData = [
	{
		label: "Company Name",
		name: "companyName",
		attributes: { type: "text", placeholder: "Your Company" },
	},
	{
		label: "Full Name",
		name: "fullName",
		attributes: { type: "text", placeholder: "John Doe" },
	},
	{
		label: "Email",
		name: "email",
		attributes: { type: "email", placeholder: "john.doe@company.com" },
	},
	{
		label: "Password",
		name: "password",
		attributes: { type: "password", placeholder: "••••••••••" },
	},
];

const SignUpForm = () => {
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: { company: "", fullName: "", email: "", password: "" },
	});

	const onSubmit = async (data) => {
		console.log("Form Data:", data);
		// Send request to Passport.js authentication endpoint
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{inputData.map(({ name, label, attributes }) => (
					<FormField
						key={name}
						control={form.control}
						name={name as "email" | "password"}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{label}</FormLabel>
								<FormControl>
									<Input {...{ ...field, ...attributes }} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<Button
					type="submit"
					className="bg-[#ff355e] hover:bg-[#ff355e]/85 cursor-pointer py-6 rounded-full w-full"
				>
					Sign In
				</Button>
			</form>
		</Form>
	);
};

export default SignUpForm;
