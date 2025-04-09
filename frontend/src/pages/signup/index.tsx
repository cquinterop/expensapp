import AuthCard from "@/components/shared/auth-card";
import { ROUTES } from "@/constants/routes";
import SignUpForm from "@/pages/signup/signup-form";
import { Link } from "react-router";

const SignUpPage = () => {
	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
			<AuthCard form={<SignUpForm />}>
				<p className="text-center w-full">
					Already have an account?
					<Link
						className="text-blue-500 mx-2 cursor-pointer hover:underline"
						to={ROUTES.SIGNIN}
					>
						Sign In
					</Link>
				</p>
			</AuthCard>
		</div>
	);
};

export default SignUpPage;
