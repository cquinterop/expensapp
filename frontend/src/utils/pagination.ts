interface PaginationParams {
	itemNumber: number;
	totalPages: number;
	page: number;
}

export const getItemType = ({ itemNumber, totalPages, page }: PaginationParams) => {
	const isFirstPage = itemNumber === 1;
	const isLastPage = itemNumber === totalPages;
	const isNearCurrent = itemNumber >= page - 1 && itemNumber <= page + 1;
	const isNearEdges = itemNumber === 2 || itemNumber === totalPages - 1;

	if (isFirstPage || isLastPage || isNearCurrent) {
		return 'item';
	}

	if (isNearEdges) {
		return 'ellipsis';
	}

	return '';
};
