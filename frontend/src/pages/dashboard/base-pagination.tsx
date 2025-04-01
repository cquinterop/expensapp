import { Button } from "@/components/ui/button";
import { useCallback } from "react";

const BasePagination = ({ pagination, expenses, setFilters }) => {
	const handlePageChange = useCallback(
		(newPage: number) => {
			if (newPage > 0 && newPage <= pagination.totalPages) {
				setFilters((prev) => ({ ...prev, page: newPage }));
			}
		},
		[pagination, setFilters]
	);

	return (
		<div className="flex justify-between items-center mt-4">
			<div className="text-sm text-muted-foreground">
				Showing {expenses?.length} of {pagination.totalCount} expenses
			</div>
			<div className="flex space-x-2">
				<Button
					variant="outline"
					size="sm"
					onClick={() => handlePageChange(pagination.currentPage - 1)}
					disabled={pagination.currentPage === 1}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => handlePageChange(pagination.currentPage + 1)}
					disabled={pagination.currentPage === pagination.totalPages}
				>
					Next
				</Button>
			</div>
		</div>
	);
};

export default BasePagination;
