import AuthCard from "@/components/shared/auth-card";
import SignInForm from "@/pages/signin/signin-form";
import { Link } from "react-router";

const SignInPage = () => {
	return (
		<AuthCard form={<SignInForm />}>
			<p className="text-center w-full">
				Don't have an account?
				<Link
					className="text-blue-500 mx-2 cursor-pointer hover:underline"
					to="/signup"
				>
					Sign Up
				</Link>
			</p>
		</AuthCard>
	);
};

export default SignInPage;
