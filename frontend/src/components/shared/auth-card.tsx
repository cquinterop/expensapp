import {
	Card,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";

export default function AuthCard({ form, children }) {
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
