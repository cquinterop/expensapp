import { useCallback, useMemo } from "react";
import BasePagination from "@/components/shared/base-pagination";
import { usePagination } from "@/hooks/usePagination";

const ExpensePagination = () => {
	const { setPage, pageInfo } = usePagination();
	const expensesCount = pageInfo.limit * pageInfo.page;
	debugger;

	const handleChangePage = useCallback(
		(page: number) => {
			setPage(page);
		},
		[setPage]
	);

	if (!pageInfo?.total) {
		return null;
	}

	return (
		<div className="flex justify-between flex-col items-center">
			<div className="text-sm mt-8 mb-4 text-muted-foreground">
				Showing {expensesCount} of {pageInfo.total} expenses
			</div>
			<div className="flex space-x-2">
				<BasePagination
					totalPages={pageInfo.totalPages}
					page={pageInfo.page}
					changePage={handleChangePage}
				/>
			</div>
		</div>
	);
};

export default ExpensePagination;
