import { useQueryState, parseAsIsoDate, parseAsStringEnum } from "nuqs";

export interface FilterTypes {
	status: string | null;
	startDate: Date | null;
	endDate: Date | null;
}

export const useFilterExpenses = () => {
	const [status, setStatus] = useQueryState(
		"status",
		parseAsStringEnum(["pending", "approved", "rejected"])
	);
	const [startDate, setStartDate] = useQueryState("startDate", parseAsIsoDate);
	const [endDate, setEndDate] = useQueryState("endDate", parseAsIsoDate);

	const setFilters = (data: FilterTypes) => {
		setStatus(data.status !== "all" ? data.status : null);
		setStartDate(data.startDate);
		setEndDate(data.endDate);
	};

	const filters = {
		...(status && { status }),
		...(startDate && { startDate }),
		...(endDate && { endDate }),
	};

	return {
		filters,
		setFilters,
	};
};
