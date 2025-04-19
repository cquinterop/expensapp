import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Building2, FileText, LayoutDashboard, Shield, ThumbsUp, Users } from "lucide-react";

const features = [
	{ icon: Building2, text: "Multi-tenant support for managing multiple teams" },
	{ icon: FileText, text: "Submit expenses by type: Regular, Travel, Mileage" },
	{ icon: ThumbsUp, text: "Approve or reject pending expenses with ease" },
	{
		icon: LayoutDashboard,
		text: "Review expenses by type and status in your dashboard",
	},
	{ icon: Users, text: "User roles with Admin and Employee permissions" },
	{ icon: Shield, text: "Authentication and secure data handling" },
];

const FeaturesSection = () => {
	return <section className="w-full my-12">
					<h2 className="text-3xl font-semibold text-gray-900 mb-6 font-fira">
						Features
					</h2>
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{features.map(({ icon: Icon, text }, index) => (
							<Card key={index} className="p-6 text-left shadow-sm">
								<CardHeader className="flex justify-center">
									<Icon className="text-[#ff355e] w-14 h-14" />
								</CardHeader>
								<CardContent>
									<p className="text-lg font-medium text-gray-800">{text}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</section>;
};

export default FeaturesSection;
