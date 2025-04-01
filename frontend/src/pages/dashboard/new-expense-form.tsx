import type React from "react";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { createExpense } from "@/lib/api";

interface NewExpenseFormProps {
	userId: string;
}

export function NewExpenseForm({ userId }: NewExpenseFormProps) {
	const navigate = useNavigate();
	const [expenseType, setExpenseType] = useState("");
	const [travelSubtype, setTravelSubtype] = useState("");
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		description: "",
		amount: "",
		receipt_url: "",

		// Travel specific
		travel_subtype: "",
		start_date: null as Date | null,
		end_date: null as Date | null,

		// Accommodation specific
		hotel_name: "",
		check_in_date: null as Date | null,
		check_out_date: null as Date | null,

		// Transportation specific
		transportation_mode: "",
		route: "",

		// Mileage specific
		distance_km: "",
		rate_per_km: "0.30",
	});

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;
			setFormData((prev) => ({ ...prev, [name]: value }));
		},
		[]
	);

	const handleDateChange = useCallback((name: string, date: Date | null) => {
		setFormData((prev) => ({ ...prev, [name]: date }));
	}, []);

	const handleExpenseTypeChange = useCallback((value: string) => {
		setExpenseType(value);
		setFormData((prev) => ({ ...prev, travel_subtype: "" }));
	}, []);

	const handleTravelSubtypeChange = useCallback((value: string) => {
		setTravelSubtype(value);
		setFormData((prev) => ({ ...prev, travel_subtype: value }));
	}, []);

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			setLoading(true);

			try {
				const payload = {
					expense_type: expenseType,
					description: formData.description,
					...getTypeSpecificData(),
				};

				await createExpense(payload);

				toast.success("Success", { description: "Expense submitted successfully" });

				// Reset form
				setExpenseType("");
				setTravelSubtype("");
				setFormData({
					description: "",
					amount: "",
					receipt_url: "",
					travel_subtype: "",
					start_date: null,
					end_date: null,
					hotel_name: "",
					check_in_date: null,
					check_out_date: null,
					transportation_mode: "",
					route: "",
					distance_km: "",
					rate_per_km: "0.30",
				});

				// Redirect to expenses list
				navigate("/dashboard");
			} catch (error) {
				console.error("Error submitting expense:", error);
				toast.error("Success", { description: "Failed to submit expense" });
			} finally {
				setLoading(false);
			}
		},
		[expenseType, formData, toast, navigate]
	);

	const getTypeSpecificData = useCallback(() => {
		switch (expenseType) {
			case "regular":
				return {
					amount: Number.parseFloat(formData.amount || "0"),
					receipt_url: formData.receipt_url,
				};
			case "travel":
				const travelData = {
					amount: Number.parseFloat(formData.amount || "0"),
					travel_subtype: formData.travel_subtype,
					start_date: formData.start_date,
					end_date: formData.end_date,
				};

				if (formData.travel_subtype === "accommodation") {
					return {
						...travelData,
						hotel_name: formData.hotel_name,
						check_in_date: formData.check_in_date,
						check_out_date: formData.check_out_date,
					};
				} else if (formData.travel_subtype === "transportation") {
					return {
						...travelData,
						transportation_mode: formData.transportation_mode,
						route: formData.route,
					};
				}

				return travelData;
			case "mileage":
				return {
					distance_km: Number.parseFloat(formData.distance_km || "0"),
					rate_per_km: Number.parseFloat(formData.rate_per_km || "0.30"),
				};
			default:
				return {};
		}
	}, [expenseType, formData]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Submit New Expense</CardTitle>
				<CardDescription>
					Fill out the form to submit a new expense
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="expense_type">Expense Type</Label>
						<Select value={expenseType} onValueChange={handleExpenseTypeChange}>
							<SelectTrigger>
								<SelectValue placeholder="Select expense type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="regular">Regular</SelectItem>
								<SelectItem value="travel">Travel</SelectItem>
								<SelectItem value="mileage">Mileage</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							placeholder="Enter expense description"
						/>
					</div>

					{expenseType === "regular" && (
						<>
							<div className="space-y-2">
								<Label htmlFor="amount">Amount ($)</Label>
								<Input
									id="amount"
									name="amount"
									type="number"
									step="0.01"
									value={formData.amount}
									onChange={handleChange}
									placeholder="0.00"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="receipt_url">Receipt URL</Label>
								<Input
									id="receipt_url"
									name="receipt_url"
									type="text"
									value={formData.receipt_url}
									onChange={handleChange}
									placeholder="https://example.com/receipt.pdf"
								/>
							</div>
						</>
					)}

					{expenseType === "travel" && (
						<>
							<div className="space-y-2">
								<Label htmlFor="travel_subtype">Travel Subtype</Label>
								<Select
									value={travelSubtype}
									onValueChange={handleTravelSubtypeChange}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select travel subtype" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="accommodation">Accommodation</SelectItem>
										<SelectItem value="transportation">
											Transportation
										</SelectItem>
										<SelectItem value="other">Other</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="amount">Amount ($)</Label>
								<Input
									id="amount"
									name="amount"
									type="number"
									step="0.01"
									value={formData.amount}
									onChange={handleChange}
									placeholder="0.00"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="start_date">Start Date</Label>
									<DatePicker
										selected={formData.start_date}
										onSelect={(date) => handleDateChange("start_date", date)}
										placeholderText="Select start date"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="end_date">End Date</Label>
									<DatePicker
										selected={formData.end_date}
										onSelect={(date) => handleDateChange("end_date", date)}
										placeholderText="Select end date"
									/>
								</div>
							</div>

							{travelSubtype === "accommodation" && (
								<>
									<div className="space-y-2">
										<Label htmlFor="hotel_name">Hotel Name</Label>
										<Input
											id="hotel_name"
											name="hotel_name"
											type="text"
											value={formData.hotel_name}
											onChange={handleChange}
											placeholder="Hotel name"
										/>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="check_in_date">Check-in Date</Label>
											<DatePicker
												selected={formData.check_in_date}
												onSelect={(date) =>
													handleDateChange("check_in_date", date)
												}
												placeholderText="Select check-in date"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="check_out_date">Check-out Date</Label>
											<DatePicker
												selected={formData.check_out_date}
												onSelect={(date) =>
													handleDateChange("check_out_date", date)
												}
												placeholderText="Select check-out date"
											/>
										</div>
									</div>
								</>
							)}

							{travelSubtype === "transportation" && (
								<>
									<div className="space-y-2">
										<Label htmlFor="transportation_mode">
											Transportation Mode
										</Label>
										<Input
											id="transportation_mode"
											name="transportation_mode"
											type="text"
											value={formData.transportation_mode}
											onChange={handleChange}
											placeholder="Flight, Train, Bus, etc."
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="route">Route</Label>
										<Input
											id="route"
											name="route"
											type="text"
											value={formData.route}
											onChange={handleChange}
											placeholder="From - To"
										/>
									</div>
								</>
							)}
						</>
					)}

					{expenseType === "mileage" && (
						<>
							<div className="space-y-2">
								<Label htmlFor="distance_km">Distance (km)</Label>
								<Input
									id="distance_km"
									name="distance_km"
									type="number"
									step="0.1"
									value={formData.distance_km}
									onChange={handleChange}
									placeholder="0.0"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="rate_per_km">Rate per km ($)</Label>
								<Input
									id="rate_per_km"
									name="rate_per_km"
									type="number"
									step="0.01"
									value={formData.rate_per_km}
									onChange={handleChange}
									placeholder="0.30"
								/>
							</div>
							<div className="p-4 bg-muted rounded-md">
								<p className="font-medium">Calculated Amount:</p>
								<p className="text-2xl font-bold">
									$
									{formData.distance_km && formData.rate_per_km
										? (
												Number.parseFloat(formData.distance_km) *
												Number.parseFloat(formData.rate_per_km)
										  ).toFixed(2)
										: "0.00"}
								</p>
							</div>
						</>
					)}

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Submitting..." : "Submit Expense"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
