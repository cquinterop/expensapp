import { z } from "zod";
import { ROUTES } from "@/constants/routes";
import { login } from "@/lib/api";
import AuthForm from "@/components/shared/auth-form";
import { useCallback } from "react";

const signInSchema = z.object({
	email: z.string().email({ message: "Invalid email" }),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" }),
});

const signInFields = [
	{
		label: "Email",
		name: "email",
		attributes: {
			type: "email",
			placeholder: "hank.scorpio@globex.com",
			autoFocus: true,
		},
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

const SignInForm = () => {
	const handleOnSubmit = useCallback(
		(data: z.input<typeof signInSchema>) => login(data),
		[]
	);

	return (
		<AuthForm
			formSchema={signInSchema}
			formFields={signInFields}
			redirect={ROUTES.DASHBOARD}
			handleOnSubmit={handleOnSubmit}
			cta="Sign In"
		/>
	);
};

export default SignInForm;
