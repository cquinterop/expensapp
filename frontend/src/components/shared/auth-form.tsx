import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";
import { InputHTMLAttributes } from "react";
import { useAuth } from "@/hooks/useAuth";
import { CurrentUserResponse } from "@/services/api/auth.service";

type FormField<T extends string> = {
	label: string;
	name: T;
	attributes: InputHTMLAttributes<HTMLInputElement>;
};

export interface AuthFormProps<T extends string> {
	formSchema: z.ZodSchema;
	formFields: readonly FormField<T>[];
	redirect: string;
	handleOnSubmit: (data: Record<T, string>) => Promise<CurrentUserResponse>;
	cta: string;
}

const AuthForm = <T extends string>({
	formSchema,
	formFields,
	redirect,
	handleOnSubmit,
	cta,
}: Readonly<AuthFormProps<T>>) => {
	type SchemaDataType = z.input<typeof formSchema>;

	const form = useForm<SchemaDataType>({
		resolver: zodResolver(formSchema),
		defaultValues: formFields.reduce(
			(acc, cur) => ({
				...acc,
				[cur.name]: "",
			}),
			{}
		),
	});
	const navigate = useNavigate();
	const { setUser } = useAuth();

	const onSubmit = async (data: SchemaDataType) => {
		try {
			const user = await handleOnSubmit(data);

			setUser(user);
			navigate(redirect);
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
						form.setError(property, {
							type: "server",
							message: message as string,
						});
					}
				);
			}
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-4"
				noValidate
			>
				{formFields.map(({ name, label, attributes }) => (
					<FormField
						key={name}
						control={form.control}
						name={name}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{label}</FormLabel>
								<FormControl>
									<Input
										{...field}
										{...attributes}
										onInput={() => form.clearErrors()}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<p className="text-destructive text-sm font-medium">
					{form.formState.errors.root?.message}
				</p>
				<Button
					className="bg-[#ff355e] hover:bg-[#ff355e]/85 cursor-pointer py-6 rounded-full w-full"
					disabled={form.formState.isSubmitting}
					type="submit"
				>
					{form.formState.isSubmitting ? (
						<LoaderCircle className="animate-spin" />
					) : (
						cta
					)}
				</Button>
			</form>
		</Form>
	);
};

export default AuthForm;
