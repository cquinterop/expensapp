import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationEllipsis,
} from "@/components/ui/pagination";
import { getItemType } from "@/utils/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

export interface PaginationProps {
	totalPages: number;
	page: number;
	changePage: (page: number) => void;
}

const BasePagination = ({
	totalPages,
	page,
	changePage,
}: Readonly<PaginationProps>) => {
	const totalItems = useMemo(
		() => Array.from({ length: totalPages }, (_, index) => index + 1),
		[totalPages]
	);

	return (
		<Pagination aria-label="Pagination navigation" className="my-8">
			<PaginationContent>
				<PaginationItem>
					<Button
						aria-disabled={page === 1}
						aria-label="Go to previous page"
						className="cursor-pointer"
						disabled={page === 1}
						tabIndex={page === 1 ? -1 : 0}
						variant="outline"
						onClick={() => changePage(page - 1)}
					>
						<ChevronLeft aria-hidden="true" />
						<span className="hidden sm:block">Previous</span>
					</Button>
				</PaginationItem>
				{totalItems.map((itemNumber) => {
					const type = getItemType({ itemNumber, page, totalPages });
					if (!type) {
						return null;
					}

					return (
						<PaginationItem key={itemNumber}>
							{type === "ellipsis" ? (
								<PaginationEllipsis aria-hidden="true" />
							) : (
								<Button
									aria-current={page === itemNumber && "page"}
									aria-label={`Page ${itemNumber}`}
									className="cursor-pointer"
									size="icon"
									tabIndex={page === itemNumber ? -1 : 0}
									variant={page === itemNumber ? "secondary" : "outline"}
									onClick={() => changePage(itemNumber)}
								>
									{itemNumber}
								</Button>
							)}
						</PaginationItem>
					);
				})}
				<PaginationItem>
					<Button
						aria-disabled={page === totalPages}
						aria-label="Go to next page"
						className="cursor-pointer"
						disabled={page === totalPages}
						tabIndex={page === totalPages ? -1 : 0}
						variant="outline"
						onClick={() => changePage(page + 1)}
					>
						<span className="hidden sm:block">Next</span>
						<ChevronRight aria-hidden="true" />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default BasePagination;
