"use client";
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

export interface DatePickerProps {
	value?: Date;
	onChange?: (date?: Date) => void;
	disabled?: boolean;
	disabledDates?: (date: Date) => boolean;
	placeholder?: string;
}

export function DatePicker({
	value,
	onChange,
	disabled,
	disabledDates,
	placeholder = "Pick a date",
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal w-[180px]",
						!value && "text-muted-foreground",
						disabled && "opacity-50 cursor-not-allowed"
					)}
					disabled={disabled}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{value ? format(value, "PPP") : <span>{placeholder}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={value}
					onSelect={onChange}
					disabled={disabledDates}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
}
