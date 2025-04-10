import { useState } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import { EXPENSES_PER_PAGE } from "@/constants/expenses";

export const usePagination = () => {
	const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
	const [pageInfo, setPageInfo] = useState({
		page,
		limit: EXPENSES_PER_PAGE,
		totalPages: 1,
		total: 1,
	});

	return {
		page,
		setPage,
		pageInfo,
		setPageInfo,
	};
};
