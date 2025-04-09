import AuthCard from "@/components/shared/auth-card";
import { ROUTES } from "@/constants/routes";
import SignInForm from "@/pages/signin/signin-form";
import { Link } from "react-router";

const SignInPage = () => {
	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-72px)] ">
			<AuthCard form={<SignInForm />}>
				<p className="text-center w-full">
					Don't have an account?
					<Link
						className="text-blue-500 mx-2 cursor-pointer hover:underline"
						to={ROUTES.SIGNUP}
					>
						Sign Up
					</Link>
				</p>
			</AuthCard>
		</div>
	);
};

export default SignInPage;
