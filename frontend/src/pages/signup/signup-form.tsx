import { z } from "zod";
import { ROUTES } from "@/constants/routes";
import { signup } from "@/lib/api";
import AuthForm from "@/components/shared/auth-form";
import { useCallback } from "react";

const signUpSchema = z.object({
	tenantName: z.string().min(2, { message: "Company name is required" }),
	fullName: z.string().min(2, { message: "Full name is required" }),
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" }),
});

const signUpFields = [
	{
		label: "Company Name",
		name: "tenantName",
		attributes: {
			type: "text",
			placeholder: "Planet Express",
			autoFocus: true,
		},
	},
	{
		label: "Full Name",
		name: "fullName",
		attributes: { type: "text", placeholder: "Philip J. Fry" },
	},
	{
		label: "Email",
		name: "email",
		attributes: { type: "email", placeholder: "phil.fry@planetexpress.com" },
	},
	{
		label: "Password",
		name: "password",
		attributes: {
			type: "password",
			placeholder: "••••••••••",
			autoComplete: "on",
		},
	},
] as const;

const SignUpForm = () => {
	const handleOnSubmit = useCallback(
		(data: z.input<typeof signUpSchema>) => signup(data),
		[]
	);

	return (
		<AuthForm
			formSchema={signUpSchema}
			formFields={signUpFields}
			redirect={ROUTES.DASHBOARD}
			handleOnSubmit={handleOnSubmit}
			cta="Sign In"
		/>
	);
};

export default SignUpForm;
