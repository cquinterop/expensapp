import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
	selected: Date | null;
	onSelect: (date: Date | null) => void;
	placeholderText?: string;
	className?: string;
}

export function DatePicker({
	selected,
	onSelect,
	placeholderText = "Pick a date",
	className,
}: DatePickerProps) {
	// Use a stable reference for the onSelect callback to prevent infinite re-renders
	const handleSelect = React.useCallback(
		(date: Date | null) => {
			onSelect(date);
		},
		[onSelect]
	);

	return (
		<div className={cn("grid gap-2", className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						id="date"
						variant={"outline"}
						className={cn(
							"w-full justify-start text-left font-normal",
							!selected && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{selected ? (
							format(selected, "PPP")
						) : (
							<span>{placeholderText}</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						selected={selected}
						onSelect={handleSelect}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
