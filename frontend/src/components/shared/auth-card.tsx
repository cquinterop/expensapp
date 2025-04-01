import {
	Card,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { PropsWithChildren, ReactNode } from "react";

export interface AuthCardProps extends PropsWithChildren {
	form: ReactNode;
}

export default function AuthCard({ form, children }: Readonly<AuthCardProps>) {
	return (
		<Card className="w-full container mx-auto max-w-md">
			<CardHeader className="text-center">
				<CardTitle className="text-4xl text-[#ff355e] font-bold font-fira">
					expensapp
				</CardTitle>
				<CardDescription>Simplify your expense management</CardDescription>
			</CardHeader>
			<CardContent>{form}</CardContent>
			<CardFooter>{children}</CardFooter>
		</Card>
	);
}
