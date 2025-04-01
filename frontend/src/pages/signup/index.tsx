import AuthCard from "@/components/shared/auth-card";
import SignUpForm from "@/pages/signup/signup-form";
import { Link } from "react-router";

const SignUpPage = () => {
	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
			<AuthCard form={<SignUpForm />}>
				<p className="text-center w-full">
					Already have an account?
					<Link
						className="text-blue-500 mx-2 cursor-pointer hover:underline"
						to="/signin"
					>
						Sign In
					</Link>
				</p>
			</AuthCard>
		</div>
	);
};

export default SignUpPage;
